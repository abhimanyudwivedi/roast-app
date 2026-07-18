---
name: roast-persona
description: Use when building or extending the roast/mental-health voice app (Vaani AI agent) — creating or editing roaster personas (archetypes or consented creator personas), onboarding steps, roast lines/scripts, intensity settings, or agent behaviour. Enforces the "roast the behaviour, never the identity" rule, the safety/crisis guardrails, and the signed-consent requirement for real-person personas.
---

# Roast App — Persona Builder

Operating rules for building the roast app. Follow these on any task that creates or edits a persona, onboarding step, roast line, intensity setting, or the Vaani agent's behaviour.

## Non-negotiable rules (apply every time)

1. **Roast the behaviour, never the identity.** Target habits, excuses, and choices (skipped gym, tutorial hell, "starting Monday" again). Never target identity/appearance/immutable traits (body, weight, race, caste, religion, gender, sexuality, disability) or trauma/illness. Same joke energy, different target.
2. **Safety overrides comedy, always.** On any sign of self-harm, suicidal thoughts, abuse, or acute distress: drop the persona, respond as a warm human, and surface India crisis lines — **Tele-MANAS 14416**, iCall 9152987821, AASRA 9820466726, Vandrevala 1860-2662-345. Do not resume roasting until the user is okay and re-initiates. Log a safety flag.
3. **Real people require signed consent.** No persona modelled on a real, named, living person ships until they have opted in (see `creator-persona-partnerships.md`). No scraping-to-impersonate. Never clone a voice without a licence. Keep creator personas feature-flagged OFF until consent status = Signed.
4. **Boundaries are absolute.** Respect the user's `off_limits` list and each persona's own off-limits without exception. These override persona and intensity.
5. **Voice-length output.** 1–3 sentence roast → beat → one line of genuine encouragement tied to the user's goal. No essays.
6. **Consent + control up front.** User opts in, sets intensity (gentle / medium / savage, default medium), and can exit any turn via safeword ("timeout"), "go easier", or "stop". "Savage" never unlocks identity targets — there is no no-limits mode.
7. **India legal line (compliance, not taste).** No religious, communal, caste, political, or national-sentiment content, about *anyone* — not just the user. In India this is an arrest-level risk (e.g. Munawar Faruqui, 37 days in jail for *allegedly intending* to hurt religious sentiment). Keep every roast on personal habits and excuses only. This is non-negotiable and applies to all personas including the unfiltered one.

## Architecture rule

Keep the **persona** (swappable system prompt + voice style) SEPARATE from the **safety layer** (a wrapper that runs on every turn regardless of active persona). Switching personalities must never weaken guardrails.

## Workflow: add or edit a persona

1. Pick type: **archetype** (vibe-inspired, no real identity — ships freely) or **creator** (real named person — requires signed consent first; if not signed, stop and route to the partnership/outreach flow).
2. Fill `templates/persona.md`.
3. Write 2–3 sample lines that target behaviour, stay PG, and never touch identity.
4. Set which user goals the persona is good for.
5. For creator personas: capture their approved off-limits + kill switch, keep the feature flag OFF until Signed.

## References (load when needed)

- Full onboarding flow, user-persona data model, and archetype list → project file `onboarding-and-persona-spec.md`
- Creator consent process + outreach DM → project file `creator-persona-partnerships.md`
- New-persona template → `templates/persona.md`
