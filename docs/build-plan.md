# Build plan

The step-by-step plan to build Multipla Skills, split into milestones. High-level phases live in [roadmap.md](roadmap.md); this file is the detailed, living version.

## Status board

> **Last updated:** 2026-11-04

| | |
|---|---|
| **Current milestone** | 🔄 **M4: MCP server MVP**: code done, manual tests pending. 🔄 **M2** is also open, waiting on review |
| **Next** | ⏳ M5: Profile quiz + local profile store |
| **Last completed** | ✅ M3: Registry index build (M1 before it: `9dd21f5`, CI green) |

| # | Milestone | Phase | Status |
|---|---|---|---|
| M0 | [Project context and docs](#m0-project-context-and-docs) | 0 | ✅ Done |
| M1 | [Repo tooling + skill validation](#m1-repo-tooling--skill-validation) | 1 | ✅ Done |
| M2 | [First skills batch](#m2-first-skills-batch) | 1 | 🔄 Current |
| M3 | [Registry index build](#m3-registry-index-build) | 1 | ✅ Done |
| M4 | [MCP server MVP (serve mode)](#m4-mcp-server-mvp-serve-mode) | 2 | 🔄 Current |
| M5 | [Profile quiz + local profile store](#m5-profile-quiz--local-profile-store) | 3 | ⏳ Next |
| M6 | [Matcher + recommend_skills](#m6-matcher--recommend_skills) | 3 | ⬜ Planned |
| M7 | [Install mode + Claude adapter](#m7-install-mode--claude-adapter) | 4 | ⬜ Planned |
| M8 | [v0.1.0 release on npm](#m8-v010-release-on-npm) | 4 | ⬜ Planned |
| M9 | [Multi-client adapters + HTTP transport](#m9-multi-client-adapters--http-transport) | 4 | ⬜ Planned |
| M10 | [Community and scale](#m10-community-and-scale) | 5 | ⬜ Planned |

Legend: ✅ done · 🔄 in progress · ⏳ next up · ⬜ planned

## How to use this file

1. Before starting work, read the status board and pick up the 🔄 milestone.
2. When a task is finished, tick its checkbox `[x]`.
3. When all tasks in a milestone are ticked **and** its "Done when" holds, mark it ✅, move 🔄 to the next milestone, update "Next", "Last completed" and the date.
4. If scope changes, edit the milestone here and note why in the commit message. Keep [roadmap.md](roadmap.md) consistent.

---

## M0: Project context and docs

**Goal:** One source of truth for the concept, architecture and contributor rules.
**Depends on:** nothing.

- [x] `CLAUDE.md`, `README.md`, `README.pt-BR.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`
- [x] `docs/`: vision, taxonomy, architecture, mcp-server, profile-quiz, skill-format, skill-matching, research-process, roadmap, ADRs 0001–0002
- [x] `skills/_template/` and `registry/profiles.json`
- [x] Pushed to `origin/main`

**Done when:** docs exist, links resolve, repo is on GitHub. ✅ (`bc7af9f`)

---

## M1: Repo tooling + skill validation

**Goal:** Automatically check that every skill and registry file is valid, so quality is enforced from the first contribution.
**Depends on:** M0.

- [x] Root `package.json` with npm workspaces, `tsconfig.base.json`, Node ≥ 20
- [x] `schemas/skill.schema.json` matching the fields in [skill-format.md](skill-format.md)
- [x] `schemas/profiles.schema.json` for `registry/profiles.json`
- [x] `scripts/validate-skills.ts` checking:
  - [x] folder name = frontmatter `name` = `skill.json#id`
  - [x] every `areas` and `profiles` value exists in `registry/profiles.json`
  - [x] `risk: "high"` skills have a **Limits and disclaimer** section
  - [x] `sources` is not empty and `last_researched` is set
  - [x] `requires_scripts` is true when `scripts/` has files
- [x] Markdown link checker script (relative links)
- [x] Validator self-test (`npm run test:validator`): good skill passes, 9 broken variants fail
- [x] `.github/workflows/ci.yml` running typecheck, validation, link check and self-test on PRs
- [x] Issue templates (new skill, bug) and a PR template mirroring the checklist in [CONTRIBUTING.md](../CONTRIBUTING.md)
- [x] CI is green on `main` after the push (run 41695656881, 2026-11-03)

**Deliverables:** `package.json`, `schemas/`, `scripts/`, `.github/`.
**Done when:** `npm run validate` passes on `_template`, fails on a deliberately broken skill, and CI is green on `main`.

**Run locally:** `npm install`, then `npm run check` (typecheck + validate + links + self-test).

---

## M2: First skills batch

**Goal:** Prove the format with real, researched content across several areas.
**Depends on:** M1.

- [x] Research and write 7 skills from [roadmap.md](roadmap.md): `contract-review` (law), `soap-notes` (health), `study-planner` (education), `code-review` (software), `seo-brief` (marketing), `budget-planner` (finance), `weekly-review` (general)
- [x] Research and write 3 Brazil-specific skills from [taxonomy.md](taxonomy.md): `lgpd-compliance-check`, `enem-prep`, `irpf-organizer` (written in pt-BR)
- [x] Each skill has `references/sources.md` and `references/examples.md` (3+ test prompts)
- [x] High-risk skills (law, health, finance) include a disclaimer and a note of what was not verified
- [x] Fill `starter_bundle` for every profile in `registry/profiles.json`
- [ ] Close the verification gaps listed in each `references/sources.md` ("Not verified" sections), mainly: the full SOAP chapter, the INEP essay booklet PDF, the LGPD arts. 46–49, the clause checklist in `contract-review`, and the less common IRPF deductions (alimony, supplementary pension, livro-caixa)
- [ ] Human review: every skill is `status: "draft"`; at least one reviewer other than the author checks each one, and a domain practitioner reviews the `risk: "high"` ones (law, health, finance), then status moves to `reviewed`

**Status (2026-11-03):** 10/10 skills written and passing `npm run validate`, all still `draft`. M2 is complete only after the two open items above.

**Deliverables:** `skills/<id>/` ×10, updated `registry/profiles.json`.
**Done when:** ~10 skills across at least 5 areas pass `npm run validate` and were reviewed by someone other than the author. (If review takes long, M3 can start in parallel since the registry index also works with `draft` skills.)

---

## M3: Registry index build

**Goal:** One generated index the server and matcher can load quickly.
**Depends on:** M1, M2 (needs real skills to index; it works with `draft` skills, so it did not wait for the review).

- [x] `scripts/build-registry.ts` generates `registry/index.json` from `skills/*/skill.json` (skips `_template`)
- [x] `schemas/index.schema.json`
- [x] CI fails if `registry/index.json` is out of date (`npm run check:registry`)
- [x] Self-test (`npm run test:registry`): deterministic output, `_template` skipped, stale index detected
- [x] Docs updated in [architecture.md](architecture.md), [CONTRIBUTING.md](../CONTRIBUTING.md) and `CLAUDE.md`

**Done when:** `npm run build:registry` is deterministic and CI catches a stale index. ✅ (2026-11-04; the CI run on `main` is confirmed after the push)

---

## M4: MCP server MVP (serve mode)

**Goal:** A working MCP server over stdio that lists and serves skills; usable from Claude.
**Depends on:** M3.

- [x] `packages/server` (TypeScript, `@modelcontextprotocol/sdk`, stdio)
- [x] Tools: `list_skills`, `get_skill`
- [x] One MCP prompt per skill; resources `skill://<id>` and `skill://<id>/references/<file>`
- [x] Structured errors (`unknown_skill`, …) per [mcp-server.md](mcp-server.md)
- [x] Unit tests (vitest, 12 tests over an in-memory client) and CI steps (typecheck, tests, build)
- [x] Checked over real stdio with a scripted MCP client (10 prompts, 30 resources, tools, error case)
- [ ] Manual test with MCP Inspector
- [ ] Manual test in Claude Code via `claude mcp add` pointing at the local build (see [mcp-server.md](mcp-server.md#running-it-from-a-clone))

**Done when:** Claude Code can list skills and load one through the server.

---

## M5: Profile quiz + local profile store

**Goal:** Run the adaptive quiz and save the profile locally.
**Depends on:** M4.

- [ ] `registry/quiz.json` with the questions from [profile-quiz.md](profile-quiz.md), EN + pt-BR, adaptive branches
- [ ] Tools: `start_quiz`, `answer_question`, `get_profile`
- [ ] Profile store at `~/.config/multipla-skills/profile.json` (cross-platform path handling)
- [ ] Re-run replaces the profile; delete/view supported
- [ ] Tests for every quiz branch and invalid answers (`invalid_answer`)

**Done when:** a full quiz in Claude produces a valid profile file matching the schema.

---

## M6: Matcher + `recommend_skills`

**Goal:** Turn a profile into ranked, explained recommendations.
**Depends on:** M5, M3.

- [ ] Matcher implementing scoring, filters and bundles from [skill-matching.md](skill-matching.md)
- [ ] Tool `recommend_skills` returning `{ id, name, score, reason }`
- [ ] Fixture-based tests asserting exact rankings for several profiles
- [ ] End-to-end first-run flow tested in Claude (connect → quiz → recommendations)

**Done when:** a student, a lawyer and a developer each get sensible, different top picks with readable reasons.

---

## M7: Install mode + Claude adapter

**Goal:** Install recommended skills into Claude's skills folder safely.
**Depends on:** M6.

- [ ] `ClientAdapter` interface from [architecture.md](architecture.md)
- [ ] `claude` adapter (detects client, targets the Claude skills directory)
- [ ] `generic` adapter (serve mode only)
- [ ] Tool `install_skills` with `dry_run`; uninstall and list-installed
- [ ] Installer lists any scripts before installing and asks for confirmation
- [ ] Tests against a temporary directory (never the real home folder)

**Done when:** the user installs a skill by conversation and Claude picks it up natively.

---

## M8: v0.1.0 release on npm

**Goal:** Anyone can run `npx -y multipla-skills`.
**Depends on:** M7.

- [ ] npm packaging (`bin`, `files`, bundled skills and registry)
- [ ] `CHANGELOG.md`, tag `v0.1.0`
- [ ] Release workflow in CI
- [ ] `npm publish`
- [ ] READMEs: remove "planned" from the quick start (EN and PT-BR)
- [ ] Smoke test on a clean machine

**Done when:** the quick-start commands in the READMEs work as written.

---

## M9: Multi-client adapters + HTTP transport

**Goal:** Support GPT, Codex and other MCP clients.
**Depends on:** M8.

- [ ] Research how each client consumes MCP and skills; one ADR per client
- [ ] Adapters for the clients that support installing skills
- [ ] Streamable HTTP transport
- [ ] Per-client config documented in [mcp-server.md](mcp-server.md)

**Done when:** at least one non-Claude client completes the quiz and receives skills.

---

## M10: Community and scale

**Goal:** Grow the catalog with outside contributors.
**Depends on:** M8.

- [ ] Public catalog page (GitHub Pages) built from `registry/index.json`
- [ ] Translation workflow
- [ ] Domain reviewer program for high-risk areas
- [ ] Staleness check based on the refresh cadence in [research-process.md](research-process.md)
- [ ] Grow to 50+ reviewed skills

**Done when:** external contributors have merged skills and the catalog is browsable online.
