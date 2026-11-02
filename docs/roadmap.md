# Roadmap

> Detailed milestones and the **live status** (what's current, what's next) are in [build-plan.md](build-plan.md). This file is the high-level view.

| Phase | Milestones | Goal | Done when |
|---|---|---|---|
| **0. Docs** | M0 | Project context, architecture, contributor rules | All files in `docs/`, `CLAUDE.md`, READMEs exist |
| **1. Skill format + first skills** | M1–M3 | Validate the format with real content | Schema + CI validation; ~10 reviewed skills across 3+ areas; generated registry index |
| **2. MCP server MVP** | M4 | Connect to Claude, list and serve skills | `npx multipla-skills` works over stdio; `list_skills`, `get_skill`, prompts, resources |
| **3. Quiz + matching** | M5–M6 | Profile-driven recommendations | `start_quiz`, `answer_question`, `recommend_skills` with tests; local profile store |
| **4. Install + adapters** | M7–M9 | Install mode for Claude, release, then other clients | `install_skills` with dry-run; `claude` adapter; v0.1.0 on npm; GPT/Codex adapters |
| **5. Community** | M10 | Open contributions at scale | Registry site, contribution templates, review team, translation workflow |

## Phase 1 candidate first skills

One or two per area to prove range: `contract-review` (law), `soap-notes` (health), `study-planner` (education), `code-review` (software), `seo-brief` (marketing), `budget-planner` (finance), `weekly-review` (general).

## Open questions

- How to handle skill updates for already-installed skills (version pinning, update prompts)?
- Which clients expose a stable way to install skills programmatically?
- How to recruit domain reviewers for high-risk areas?
- Should drafts be installable behind an explicit opt-in flag?
