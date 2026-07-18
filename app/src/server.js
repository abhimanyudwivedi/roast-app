import "dotenv/config";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PERSONAS } from "./personas.js";
import { startSession, mockRespond, isMock } from "./vaani.js";
import { isCrisis } from "./safety.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "..", "public")));

// list personas for the UI
app.get("/api/personas", (_req, res) => {
  res.json(Object.entries(PERSONAS).map(([id, p]) => ({ id, name: p.name, filter: p.filter })));
});

// start a roast session for the chosen persona
app.post("/api/roast/start", async (req, res) => {
  try {
    const { personaId, profile = {} } = req.body;
    const variables = {
      user_name: profile.user_name || "friend",
      roast_targets: profile.roast_targets || "procrastinating",
      off_limits: profile.off_limits || "",
      goal: profile.goal || "get one thing done",
      intensity: profile.intensity || "medium",
    };
    const session = await startSession({ personaId, variables });
    res.json({
      ok: true, mock: session.mock, token: session.token,
      connection_url: session.connection_url, room_name: session.room_name,
      live_captions_url: session.live_captions_url,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
});

// MOCK turn endpoint = your local guardrail testbed (real mode uses Vaani voice)
app.post("/api/roast/turn", (req, res) => {
  if (!isMock()) return res.status(409).json({ error: "turns are handled by Vaani in real mode" });
  const { personaId, text, profile = {} } = req.body;
  const reply = mockRespond({ personaId, text, variables: profile });
  res.json(reply);
});

// webhook = layer-2 safety in real mode (Vaani posts transcripts here)
app.post("/api/vaani/webhook", (req, res) => {
  const ev = req.body || {};
  if (ev.type === "transcript" && ev.role === "user" && isCrisis(ev.text || "")) {
    console.warn("[SAFETY] crisis signal in transcript:", ev.text);
    // TODO: db.flagSafety(...) + triggerCrisis(ev.call_id) once wired to Vaani
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`roast-app on http://localhost:${PORT}  (mock mode: ${isMock()})`);
});
