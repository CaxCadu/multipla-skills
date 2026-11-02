# ADR 0001: Build the MCP server in TypeScript

- **Status:** accepted
- **Date:** 2026-11-02

## Context

The server must run on users' machines with minimal setup, work with Claude first, and later with other MCP clients. Contributors will mostly be editing Markdown and JSON, but a few will work on the server.

## Decision

Use **TypeScript** with the official `@modelcontextprotocol/sdk`, distributed on npm and run with `npx multipla-skills`.

## Consequences

- Easy install for users (`npx`, no Python environment needed). Claude Desktop and Claude Code both launch `npx` servers.
- The official SDK is well maintained and tracks the protocol closely.
- Types let us share the skill and profile schemas between the validator, matcher and server.
- Requires Node.js on the user's machine; acceptable for the target audience of MCP users.

## Alternatives considered

- **Python (official SDK, `uvx`)**: also viable; rejected for the easier `npx` story and shared types.
