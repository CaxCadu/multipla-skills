# CLAUDE.md

Guide for Claude (and other AI agents) working in this repository.

## What this project is

**Multipla Skills** is an open-source library of skills for many areas of work and life, delivered through an **MCP server**. The user connects the server to their AI client (Claude first; GPT, Codex and others later). The server runs a short **profile quiz** (student, lawyer, doctor, developer…), then recommends and installs the skills that fit that profile. Every skill is built from **deep research** of its area and cites its sources.

**Where we are:** the live status board is at the top of [docs/build-plan.md](docs/build-plan.md). Currently on **M1: Repo tooling + skill validation**. No server code exists yet. The high-level phases are in [docs/roadmap.md](docs/roadmap.md).

**Start of every session:** read the status board in `docs/build-plan.md`. When you finish a task, tick its checkbox; when a milestone's "Done when" holds, mark it ✅, move 🔄 to the next one, and update the date.

## Core flow

connect MCP → quiz → local profile → match skills → user confirms → deliver (install files or serve via MCP)

## Where things are

| Path | What |
|---|---|
| `docs/vision.md` | Why, who, principles, non-goals |
| `docs/architecture.md` | Components, data flow, planned layout, client adapters |
| `docs/mcp-server.md` | Tools, prompts, resources, transports, client config |
| `docs/profile-quiz.md` | Quiz design and profile schema |
| `docs/skill-format.md` | Skill folder spec (`SKILL.md` + `skill.json`) |
| `docs/skill-matching.md` | Scoring and bundles |
| `docs/research-process.md` | Research and review standard |
| `docs/taxonomy.md` | Areas, profiles, candidate skills |
| `docs/build-plan.md` | **Milestones and live status** (current / next) |
| `docs/roadmap.md` | Phases and open questions |
| `docs/adr/` | Decision records |
| `skills/` | One folder per skill; `_template/` to copy |
| `registry/profiles.json` | Profile → areas map |
| `packages/server/` | TypeScript MCP server (planned, not created) |

## Decisions already made

- Docs and this file are in **English**; there is a Portuguese `README.pt-BR.md`.
- Server stack: **TypeScript** + official MCP SDK, run via `npx` ([ADR 0001](docs/adr/0001-typescript-mcp.md)).
- Delivery: **both** install mode and serve mode ([ADR 0002](docs/adr/0002-dual-delivery.md)).
- License: MIT.

## Conventions

- Skill ids: lowercase kebab-case; folder name = `name` in frontmatter = `id` in `skill.json`.
- Areas and profiles must exist in `docs/taxonomy.md` and `registry/profiles.json`.
- Keep names consistent across docs: tool names (`start_quiz`, `answer_question`, `get_profile`, `recommend_skills`, `install_skills`, `list_skills`, `get_skill`), and the metadata fields in `docs/skill-format.md`.
- When you change a tool, field or folder name, update every doc that mentions it.
- Skill `SKILL.md` should be focused (~500 lines max); long material goes in `references/`.

## Rules for writing skills

- Follow [docs/research-process.md](docs/research-process.md): scope, sources, cite, review, test.
- No unsourced factual claims. Never cite a source you haven't verified exists.
- `risk: "high"` areas (law, health, finance) require a **Limits and disclaimer** section. Skills support professionals and informed users; they never present output as a diagnosis, legal opinion or personalised investment advice.
- State jurisdiction whenever law, tax or regulation is involved.
- Don't copy copyrighted text; summarise and link.
- Scripts in skills need extra scrutiny and must be flagged with `requires_scripts: true`.

## Don't

- Don't add server code before the relevant roadmap phase unless asked.
- Don't push, publish to npm or open PRs without the maintainer asking.
- Don't store or transmit user profiles anywhere but the user's machine.
- Don't invent skills' sources, statistics or legal citations.
