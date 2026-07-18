// Vaani adapter. MOCK_MODE=true => local text testbed. false => real Vaani WebRTC voice.
import { PERSONAS, composeSystemPrompt } from "./personas.js";
import { isCrisis, blockedRequest, CRISIS_RESPONSE, refusal } from "./safety.js";

const MOCK = (process.env.MOCK_MODE ?? "true") !== "false";
const BASE = process.env.VAANI_BASE_URL || "https://api.vaanivoice.ai/api";
const KEY = process.env.VAANI_API_KEY;
const headers = () => ({ "X-API-Key": KEY, "Content-Type": "application/json" });

// per-persona voice + language for the WebRTC call
const VOICE = {
  mother_in_law: { voice_gender: "female", primary_language: "hi" },
  friend:        { voice_gender: "male",   primary_language: "hi" },
  maid:          { voice_gender: "female", primary_language: "hi" },
  manager:       { voice_gender: "male",   primary_language: "en" },
  code_roast:    { voice_gender: "male",   primary_language: "en" },
};
const WELCOME = {
  mother_in_law: "Toh kaise hain aap? Chalo batao, aaj kya tala.",
  friend: "Toh kaise hain aap? Bol, kya nahi kiya aaj.",
  maid: "Toh kaise hain aap? Batayie, aaj kaunsa kaam adhoora chhoda.",
  manager: "Toh kaise hain aap? So — what did we not ship today?",
  code_roast: "Toh kaise hain aap? Dikhao — aaj kya banaya, ya sirf socha?",
};
const AGENT_IDS = {
  mother_in_law: process.env.AGENT_MIL || "",
  friend: process.env.AGENT_FRIEND || "",
  maid: process.env.AGENT_MAID || "",
  manager: process.env.AGENT_MANAGER || "",
  code_roast: process.env.AGENT_CODE || "",
};

// Create an agent (run once). Prompt keeps {{placeholders}} for per-call metadata.
export async function createAgent(personaId) {
  const system_prompt = composeSystemPrompt(personaId, {}); // keeps {{vars}} intact
  const res = await fetch(`${BASE}/create-agent`, {
    method: "POST", headers: headers(),
    body: JSON.stringify({
      agent_display_name: `roastcoach2-${personaId}`,
      config: { persona: { identity: { system_prompt } } },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.agent_id) throw new Error(`create-agent ${personaId} -> ${res.status} ${JSON.stringify(data)}`);
  return data.agent_id;
}

// Start a session. Real mode returns LiveKit connection info for the browser.
export async function startSession({ personaId, variables }) {
  if (MOCK) return { mock: true, token: `mock-${personaId}-${Date.now()}` };
  const agent_id = AGENT_IDS[personaId];
  if (!agent_id) throw new Error(`no agent id for ${personaId} — run: npm run agents`);
  const v = VOICE[personaId];
  const res = await fetch(`${BASE}/trigger-call/`, {
    method: "POST", headers: headers(),
    body: JSON.stringify({
      agent_id, medium: "webrtc",
      voice_gender: v.voice_gender,
      primary_language: v.primary_language,
      secondary_language: "en",
      welcome_message: WELCOME[personaId],
      welcome_interruptible: true,
      voice_speed: 1.0,
      metadata: variables,
      modify_agent: { persona: { metadata: variables } },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.token) throw new Error(`trigger-call -> ${res.status} ${JSON.stringify(data)}`);
  return { mock: false, token: data.token, connection_url: data.connection_url,
           room_name: data.room_name, live_captions_url: data.live_captions_url };
}

// Local guardrail testbed (mock mode only)
export function mockRespond({ personaId, text }) {
  const p = PERSONAS[personaId];
  if (isCrisis(text)) return { type: "crisis", text: CRISIS_RESPONSE };
  const tag = blockedRequest(text);
  if (tag) return { type: "refusal", tag, text: refusal(p.name, tag) };
  const line = p.lines[Math.floor(Math.random() * p.lines.length)];
  return { type: "roast", text: `${p.name}: ${line}` };
}

export const isMock = () => MOCK;
