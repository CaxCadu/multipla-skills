# Vision

## The problem

AI assistants are powerful, but most people use them generically. A lawyer, a nurse, a high-school student and a freelance designer all open the same blank chat box. Agent "skills" (packaged instructions, references and scripts) fix this, but finding, trusting and installing the right ones is hard:

- Skills are scattered across repos and blogs.
- Quality varies, and most are not grounded in real research of the field.
- Users don't know what they don't know: they can't ask for a skill they've never heard of.
- Each AI client (Claude, GPT, Codex, …) has its own way of loading skills.

## The idea

**Multipla Skills** is an open-source library of skills across many areas of work and life, delivered by an **MCP server**.

1. The user connects the MCP server to their AI client (Claude first; GPT, Codex and others later).
2. The server runs a short **profile quiz** ("who are you and what do you do?").
3. Based on the profile, it **recommends and installs** the skills that make sense for that person.
4. Every skill is built from **deep research** of its area and cites its sources.

## Target users

Anyone. The first profiles we plan for: students, lawyers, doctors and health professionals, software developers, marketers, finance people, small-business owners, designers and content creators. See [taxonomy.md](taxonomy.md).

## Principles

- **Profile-first.** The user describes themselves; they never have to browse a catalog.
- **Research-backed.** No skill ships without a documented research pass and sources. See [research-process.md](research-process.md).
- **Client-agnostic.** One skill source, many clients. See [architecture.md](architecture.md).
- **Open.** MIT license, contributions welcome, everything auditable.
- **Private by default.** The profile stays on the user's machine.
- **Honest about limits.** Skills in regulated areas (law, medicine, finance) carry clear disclaimers and never pose as a professional opinion.

## Non-goals

- Not a general-purpose AI agent framework.
- Not a replacement for professional advice.
- Not a hosted SaaS; the default is local and self-contained.
- Not an app store with ratings and payments (at least initially).

## Language

Docs are in English for open-source reach. Skills can be authored in any language and declare it in metadata; Portuguese (Brazil) skills are a first-class goal.
