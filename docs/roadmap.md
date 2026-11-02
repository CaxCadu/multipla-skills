# Roadmap

| Phase | Goal | Done when |
|---|---|---|
| **0. Docs** | Project context, architecture, contributor rules | All files in `docs/`, `CLAUDE.md`, READMEs exist *(this phase)* |
| **1. Skill format + first skills** | Validate the format with real content | Schema + CI validation; ~10 reviewed skills across 3+ areas |
| **2. MCP server MVP** | Connect to Claude, list and serve skills | `npx multipla-skills` works over stdio; `list_skills`, `get_skill`, prompts, resources |
| **3. Quiz + matching** | Profile-driven recommendations | `start_quiz`, `answer_question`, `recommend_skills` with tests; local profile store |
| **4. Install + adapters** | Install mode for Claude, then other clients | `install_skills` with dry-run; `claude` adapter; GPT/Codex adapters investigated |
| **5. Community** | Open contributions at scale | Registry site, contribution templates, review team, translation workflow |

## Phase 1 candidate first skills

One or two per area to prove range: `contract-review` (law), `soap-notes` (health), `study-planner` (education), `code-review` (software), `seo-brief` (marketing), `budget-planner` (finance), `weekly-review` (general).

## Open questions

- How to handle skill updates for already-installed skills (version pinning, update prompts)?
- Which clients expose a stable way to install skills programmatically?
- How to recruit domain reviewers for high-risk areas?
- Should drafts be installable behind an explicit opt-in flag?
