# ADR 0002: Deliver skills both by installing files and by serving over MCP

- **Status:** accepted
- **Date:** 2026-11-02

## Context

Claude supports native skills (folders with `SKILL.md`). Other clients (GPT, Codex, generic MCP clients) have different or no skill mechanisms, but all can use MCP prompts and resources.

## Decision

Support two delivery modes from the same skill source:

1. **Install mode**: copy the skill folder into the client's skills directory via a client adapter.
2. **Serve mode**: expose each skill as an MCP prompt and `skill://` resource.

## Consequences

- Claude users get native skill behaviour (auto-triggering by description).
- Any MCP client works on day one through serve mode.
- Skills stay client-agnostic plain files; only adapters know client specifics.
- Slightly more surface to maintain: adapters must be tested per client.
- Installing writes to disk, so the installer needs `dry_run` and user confirmation.

## Alternatives considered

- **Install only**: leaves non-Claude clients unsupported.
- **Serve only**: loses native auto-triggering in Claude and requires the server for every use.
