# Profile quiz

The quiz turns a few answers into a **profile** that the matcher uses. It should take **under two minutes** and feel like a conversation, not a form.

## Design rules

- 5–8 questions, adaptive: later questions depend on earlier answers.
- Every question has an "other / skip" option.
- Plain language; no jargon.
- Available in English and Portuguese (BR) from the start; the user's language is detected or asked first.
- No sensitive data is asked (no names, IDs, employers). Only what's needed to choose skills.

## Question outline

1. **Language**: "Which language do you prefer?"
2. **Main role**: student / lawyer / health professional / developer / marketer / finance / business owner / designer / creator / something else (free text → mapped to the closest profile, else `curious`).
3. **Experience level**: starting out / experienced / expert.
4. **Goals** (multi-select, tailored to the role): e.g. save time on paperwork, learn faster, improve quality, grow audience.
5. **Tools already used** (optional): e.g. Excel, Notion, GitHub, Word.
6. **Country / jurisdiction** (only for regulated areas): used to offer region-specific skills such as 🇧🇷 ones.
7. **Secondary interests** (optional): extra areas.

## Profile schema

```json
{
  "version": 1,
  "created_at": "2026-11-02T18:00:00Z",
  "language": "pt-BR",
  "country": "BR",
  "profiles": ["student", "developer"],
  "level": "starting",
  "goals": ["learn-faster", "save-time"],
  "tools": ["github", "notion"],
  "interests": ["finance"]
}
```

- `profiles`: ids from [taxonomy.md](taxonomy.md) / `registry/profiles.json`.
- `level`: `starting` | `experienced` | `expert`.
- `goals`, `tools`, `interests`: free-form tags drawn from a controlled list so they can match skill tags.

## From profile to tags

The matcher expands the profile to a weighted tag set: each profile id contributes its areas (from `registry/profiles.json`), `goals` and `interests` add tags, and `country` adds a region tag. See [skill-matching.md](skill-matching.md).

## Privacy

- The profile is saved **locally** (e.g. `~/.config/multipla-skills/profile.json`).
- The server does not send it anywhere.
- The user can view it (`get_profile`), redo the quiz (`start_quiz`), or delete the file.

## Re-running

The quiz can be re-run any time. New results replace the old profile; already-installed skills stay unless the user asks to remove them.
