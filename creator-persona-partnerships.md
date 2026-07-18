# Roast App — Creator Persona Partnerships

Plan for featuring real creators as roaster personas, **with their consent**. Companion to `onboarding-and-persona-spec.md`.

> Hard rule for the build: a real-person persona **does not ship until that creator has signed an opt-in**. Until then it stays disabled. No scraping-to-impersonate. This protects the creators' reputation and protects us legally.

---

## Why consented creators (the short version)

- **Legal:** using a real person's name/voice/likeness in a commercial app that generates *insulting* content needs their permission (publicity rights + defamation risk). Consent removes it.
- **Growth:** these creators have exactly our audience (young Indian tech people). An opted-in creator *promotes the persona to their own followers.* That's the real acquisition engine. Non-consented = lawsuit; consented = launch channel.

---

## Target creators

Status starts at **Not contacted**. A persona is only built once status = **Signed**.

| Creator | Handle(s) | Vibe / audience (confirm with them) | Status |
|---|---|---|---|
| Dhruv Doshi | [@dhruvdoshi_](https://x.com/dhruvdoshi_) · [@dekatotritos](https://x.com/dekatotritos) *(2 accounts)* | Startup / tech; TBD with him | Not contacted |
| Harkirat | [@1997harkirat](https://x.com/1997harkirat) | Coding educator (100xDevs); no-nonsense dev mentor energy | Not contacted |
| Kiran Kumar | [@ErKiranKumar_](https://x.com/ErKiranKumar_) | Tech / dev; TBD with him | Not contacted |

*Note:* the vibe column is a placeholder. **Do not fabricate their bio or put words in their mouth.** The persona is **co-designed with the creator** in a short call, so it's their actual voice, approved by them.

---

## Persona design (per creator, co-created)

For each signed creator, capture together:
- **Roast style** (their actual comedic register: dry, savage, warm, deadpan).
- **Signature phrases / callbacks** they're happy to have used.
- **What they'll roast** (on-brand for them: e.g. "tutorial hell," "I'll do DSA next week," "vibe-coding without fundamentals").
- **Their own off-limits** (topics they don't want their persona touching — protects their brand).
- **Voice:** licensed recording of them, or an approved voice actor. Never an unlicensed clone.

All the standard app guardrails still apply on top (never roast the *user's* identity/appearance; crisis handling; intensity dial; safeword).

---

## What the creator gets (the offer)

- **Co-branding:** "Featuring [Creator]" — exposure to our users.
- **Revenue share / flat fee** (founders decide the number).
- **Full control:** they approve the persona script, set their own off-limits, and get a **kill switch** — one message and their persona goes offline.
- **Reputation protection:** persona is bounded so it never says anything outside what they approved, and never roasts users on protected/identity topics.

---

## Outreach DM (template — personalize per creator)

> Hey [Name]! Big fan of your stuff. We're building a comedy "roast coach" app, a voice AI that playfully roasts people about their bad habits (skipped gym, tutorial hell, "starting Monday" for the 6th time) to actually motivate them. Mental-health-friendly, tough love not real hate.
>
> We'd love a **[Name] persona** as one of the roasters, officially, with you in control: you approve the script, set what's off-limits, keep a kill switch, and we co-brand + share revenue. Your followers would get to be roasted by "you," which we think they'd love.
>
> Totally opt-in, nothing goes live without your sign-off. Open to a quick 15-min call to show you what we've got?

Keep it short, lead with genuine fandom, make "you're in control" obvious.

---

## How it appears in onboarding

- On the **"pick your roaster"** screen (Step 4 of the onboarding spec), signed creators appear as **Featured Creator Roasters** alongside the archetypes.
- A creator persona is **only visible/selectable once status = Signed** in config. Feature-flag each one.
- Show "Featuring [Creator]" + their handle so it's clearly official, not parody.

---

## Guardrails specific to real-person personas

1. **No ship without signed consent.** Enforced by config flag, not trust.
2. **Persona stays on-script.** It can't generate content outside the creator's approved style + boundaries.
3. **Creator off-limits are absolute**, same as user off-limits.
4. **Kill switch** disables the persona instantly on request.
5. **Licensed voice only** — no unlicensed voice cloning, ever.

---

## Open items

1. Founders set the creator comp model (rev-share % or flat).
2. Simple **written consent / likeness-release** doc before any persona goes live (worth a lawyer's 30 minutes).
3. Who owns outreach? Suggest starting with **Harkirat** (clear audience fit) as the pilot.
4. Fallback if a creator declines: offer them the **archetype** version instead (vibe-inspired, no name/voice), which needs no consent.
