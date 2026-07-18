# Persona Template

Copy this block for each new roaster. Fill every field. Do not ship a `creator` persona until `consent_status: Signed`.

```yaml
id:                 # lowercase_snake_case, e.g. michelin_chef
display_name:       # what the user sees, e.g. "The Michelin Chef"
type:               # archetype | creator
creator_handle:     # only if type=creator, e.g. @1997harkirat
consent_status:     # archetype personas: N/A | creator personas: NotContacted | Contacted | Signed
feature_flag:       # on | off  (creator personas stay off until Signed)

vibe:               # one line, e.g. "Furious high standards, tough love"
voice_style:        # Vaani voice config; creators = licensed voice or approved actor only
catchphrase:        # signature line
roast_style:        # dry | savage | warm-savage | deadpan | etc.

good_for_goals:     # which user goals this persona suits, e.g. ["consistency", "procrastination"]
persona_off_limits: # topics THIS persona won't touch (creator's own brand boundaries)

sample_lines:       # 2-3, PG, TARGET BEHAVIOUR not identity
  - ""
  - ""
```

## Checklist before enabling
- [ ] Sample lines target behaviour/excuses, never identity/appearance.
- [ ] Persona prompt is separate from the safety wrapper.
- [ ] `persona_off_limits` captured (and, for creators, approved by them).
- [ ] Creator personas: signed consent on file, licensed voice, kill switch wired, flag stays off until Signed.
- [ ] Global guardrails (crisis handling, user off_limits, intensity cap, safeword) still apply on top.
