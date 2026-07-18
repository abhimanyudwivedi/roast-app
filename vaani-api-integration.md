# vaanivoice.ai — API Integration (roast app)

> Exact endpoint/SDK names are private-beta and must be confirmed in the vaanivoice.ai API reference. The **shape** below is standard for voice-agent APIs (create-session + client-join + webhooks) and maps onto theirs. Placeholders marked `<<confirm>>`.

## The golden rule

**The API key lives on your backend, never in the frontend.** The frontend only ever gets a short-lived session token. Everything sensitive (agent config, user profile, API key) stays server-side.

## The three API surfaces you'll use

1. **Agent config** — create the 4 persona agents (system prompt = Safety Core + persona block, + a Hinglish voice). Usually done once via dashboard or `POST /agents`.
2. **Start a web session** — per call: backend asks Vaani to start a session for the chosen agent, injecting the user's variables, and gets back a client token.
3. **Webhooks** — Vaani posts live events (transcript, call ended) to your backend. **This is where your independent crisis-detection layer runs.**

---

## Backend

### A) Start a roast session
```js
// POST /api/roast/start   body: { userId, personaId }
app.post("/api/roast/start", async (req, res) => {
  const { userId, personaId } = req.body;
  const user = await db.getUserProfile(userId);          // roast_targets, off_limits, goal, intensity, consent
  const agentId = PERSONA_TO_AGENT[personaId];           // map MIL/friend/maid/manager -> Vaani agent ids

  // <<confirm exact endpoint + field names in beta docs>>
  const session = await fetch("https://api.vaanivoice.ai/v1/web-calls", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.VAANI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: agentId,
      variables: {                                        // injected into {{...}} in the prompt
        user_name:     user.name,
        roast_targets: user.roast_targets.join(", "),
        off_limits:    user.off_limits.join(", "),
        goal:          user.goal,
        intensity:     user.intensity
      },
      metadata: { userId }                                // so webhooks can identify the user
    })
  }).then(r => r.json());

  res.json({ clientToken: session.access_token });        // frontend joins with this only
});
```

### B) Webhook — run YOUR crisis layer here (most important)
```js
// POST /api/vaani/webhook   (register this URL in the Vaani dashboard)
app.post("/api/vaani/webhook", async (req, res) => {
  const ev = req.body;                                    // <<confirm event schema in beta docs>>

  if (ev.type === "transcript" && ev.role === "user") {
    if (isCrisis(ev.text)) {                              // your keyword + small-classifier check
      await db.flagSafety(ev.metadata.userId, ev.text);
      await triggerCrisis(ev.call_id);                    // force crisis flow (see note)
    }
  }
  if (ev.type === "call_ended") {
    await db.logSession(ev.metadata.userId, ev);
  }
  res.sendStatus(200);
});
```
`triggerCrisis` options, in order of preference: call a Vaani "inject message / switch state" endpoint to force the crisis script; or use a **function/tool** the agent can call; or as a last resort end the session and show crisis resources in the UI. Confirm which of these the beta supports.

---

## Frontend

```js
// 1. ask backend for a session (persona chosen in onboarding Step 4)
const { clientToken } = await fetch("/api/roast/start", {
  method: "POST",
  body: JSON.stringify({ userId, personaId })
}).then(r => r.json());

// 2. join the voice session with Vaani's web SDK  (<<confirm SDK name/method>>)
const call = new VaaniWebClient({ token: clientToken });
await call.start();                 // opens mic / WebRTC
call.on("agentSpeaking", ...);      // drive your talking UI

// 3. hard STOP button (layer 3 safety) — always available
stopBtn.onclick = () => call.end();
```

## Function / tool calling (optional but useful)

If the beta supports tools, define one the agent can call, e.g. `escalate_to_support`, wired to your backend. Lets the agent hand off to the crisis flow cleanly. Still keep the webhook check as the independent backstop, prompts can miss what a classifier catches.

## Checklist

- [ ] API key server-side only; frontend gets short-lived token.
- [ ] 4 persona agents created; Safety Core locked (not auto-optimized away).
- [ ] Variables injected per session.
- [ ] Webhook receiving transcripts; `isCrisis()` running independently of the prompt.
- [ ] `triggerCrisis` path confirmed with Vaani (inject / tool / end-call).
- [ ] Client STOP button.
- [ ] Guardrail tests pass (self-harm, appearance, regional, safeword) before launch.

## Next

Paste the vaanivoice.ai API reference (or a screenshot of the create-call + webhook docs) and I'll replace every `<<confirm>>` with their exact endpoints, field names, and SDK calls.
