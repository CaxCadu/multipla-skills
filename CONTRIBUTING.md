# Contributing

Thanks for helping! The most valuable contribution is a well-researched skill. Portuguese (BR) and English skills are both welcome.

## Propose a skill

1. Open an issue with: area, target profile, the task it supports, and 2–3 candidate sources.
2. Wait for a quick "go" so we avoid duplicates (see [docs/taxonomy.md](docs/taxonomy.md)).

## Add a skill

1. Copy [`skills/_template`](skills/_template/) to `skills/<your-skill-id>/` (lowercase kebab-case).
2. Research it following [docs/research-process.md](docs/research-process.md).
3. Fill in `SKILL.md` and `skill.json` per [docs/skill-format.md](docs/skill-format.md).
4. Add `references/sources.md` and `references/examples.md` (3+ realistic test prompts).
5. Open a PR with `status: "draft"`. A reviewer moves it to `reviewed`.

## Check your work locally

```bash
npm install
npm run check
```

This runs the typecheck, validates every skill and the registry against the schemas in `schemas/`, checks Markdown links, and runs the validator's self-test. CI runs the same checks on every PR.

## PR checklist

- [ ] Folder name = `name` in frontmatter = `id` in `skill.json`
- [ ] `description` states what it does and when to use it
- [ ] Areas and profiles exist in the taxonomy and `registry/profiles.json`
- [ ] All claims are sourced; every source URL was opened and checked
- [ ] `last_researched` is set
- [ ] `risk: "high"` skills include a **Limits and disclaimer** section
- [ ] Jurisdiction stated where law, tax or regulation applies
- [ ] No copyrighted text copied; no personal data in examples
- [ ] Any `scripts/` are minimal, documented, and `requires_scripts` is `true`

## Review

At least one reviewer checks accuracy and format. High-risk skills should also get a domain practitioner's review when possible.

## Other contributions

Taxonomy changes, docs fixes, translations and (from phase 2) server code are welcome. For larger changes, open an issue first.

## Conduct

Be respectful and constructive. Assume good faith.
