# Skill format

A skill is a folder under `skills/`. It follows the Anthropic Agent Skills layout (so it works natively in Claude) and adds a `skill.json` with metadata used by the matcher and registry.

```
skills/<skill-id>/
├── SKILL.md          # required: instructions, with frontmatter
├── skill.json        # required: Multipla metadata
├── references/       # optional: research notes, checklists, sources
├── scripts/          # optional: helper scripts (reviewed carefully)
└── assets/           # optional: templates, images
```

`<skill-id>` is lowercase kebab-case, unique, and equals `name` in the frontmatter and `id` in `skill.json`.

## SKILL.md

```markdown
---
name: contract-review
description: Reviews a contract clause by clause, flags risks and missing terms. Use when the user shares a contract or asks to review, summarize or negotiate one.
---

# Contract review

## When to use
…

## Workflow
1. …

## Output format
…

## Limits and disclaimer
This skill supports, and does not replace, a licensed lawyer.
```

Rules:
- `description` says **what it does and when to trigger it**, in one or two sentences. This is what makes the model pick the skill.
- Keep `SKILL.md` focused (aim for under ~500 lines); move long material into `references/` and link to it.
- Regulated areas (`risk: "high"`) must include a **Limits and disclaimer** section (in Portuguese skills: **Limites e aviso**).
- Claims drawn from research must be traceable to `references/sources.md` and `skill.json#sources`.

## skill.json

```json
{
  "id": "contract-review",
  "name": "Contract review",
  "version": "0.1.0",
  "summary": "Clause-by-clause contract review with risk flags.",
  "language": "en",
  "areas": ["law", "business"],
  "profiles": ["lawyer", "business-owner"],
  "tags": ["contracts", "risk", "negotiation"],
  "region": null,
  "level": ["experienced", "expert"],
  "risk": "high",
  "requires_scripts": false,
  "sources": [
    { "title": "Source title", "url": "https://example.org", "accessed": "2026-11-02" }
  ],
  "last_researched": "2026-11-02",
  "authors": ["github-handle"],
  "status": "draft"
}
```

| Field | Type | Meaning |
|---|---|---|
| `id` | string | Same as folder name. |
| `name` | string | Human title. |
| `version` | semver | Bump on any content change. |
| `summary` | string | One line shown in recommendations. |
| `language` | string | BCP-47 code (`en`, `pt-BR`). |
| `areas` | string[] | Ids from [taxonomy.md](taxonomy.md). |
| `profiles` | string[] | Profiles this skill suits. |
| `tags` | string[] | Matching keywords. |
| `region` | string \| null | ISO country code if jurisdiction-specific (e.g. `BR`). |
| `level` | string[] | `starting`, `experienced`, `expert`. |
| `risk` | `low` \| `medium` \| `high` | `high` = law, medicine, finance and similar. |
| `requires_scripts` | boolean | True if `scripts/` has executable code. |
| `sources` | object[] | Research sources (title, url, accessed date). |
| `last_researched` | date | Last research refresh. |
| `authors` | string[] | GitHub handles. |
| `status` | `draft` \| `reviewed` \| `stable` | Only `reviewed` and `stable` are recommended by default. |

## Validation (planned)

A schema check in CI will verify: ids match, required fields exist, areas/profiles exist in the taxonomy, `high`-risk skills have a disclaimer section, and `sources` is non-empty.

A copy-ready template is in [`skills/_template/`](../skills/_template/).
