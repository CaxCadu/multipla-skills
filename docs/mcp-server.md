# MCP server

> Status: **planned**. This document defines the interface the server will expose.

## Tools

| Tool | Input | Output | Notes |
|---|---|---|---|
| `start_quiz` | `{ language?: string }` | first question + `session_id` | Starts or restarts the profile quiz. |
| `answer_question` | `{ session_id, question_id, answer }` | next question, or `done: true` with the profile | Adaptive: next question depends on previous answers. |
| `get_profile` | none | stored profile or `null` | Reads the local profile. |
| `recommend_skills` | `{ limit?: number }` | ranked list of `{ id, name, reason, score }` | Uses the matcher. |
| `install_skills` | `{ skill_ids: string[], client?: string, dry_run?: boolean }` | list of files written | Always supports `dry_run`; the client should show it to the user before the real run. |
| `list_skills` | `{ area?, profile?, query? }` | skill summaries | Browse the catalog. |
| `get_skill` | `{ skill_id }` | full `SKILL.md` + metadata | Serve mode. |

## Prompts

One MCP prompt per skill, named after the skill id (e.g. `contract-review`). The prompt body is the skill's `SKILL.md` content. Lets clients without native skills invoke a skill explicitly.

## Resources

- `skill://<id>`: the skill's `SKILL.md`.
- `skill://<id>/references/<file>`: reference files.
- `profile://current`: the stored profile.

## Transport

1. **stdio** (first): `npx multipla-skills`, runs locally.
2. **Streamable HTTP** (later): for clients that only support remote servers.

## Client configuration

### Claude Desktop / Claude Code (planned)

```json
{
  "mcpServers": {
    "multipla-skills": {
      "command": "npx",
      "args": ["-y", "multipla-skills"]
    }
  }
}
```

Claude Code equivalent:

```bash
claude mcp add multipla-skills -- npx -y multipla-skills
```

### Other clients

Added as adapters are built (OpenAI/GPT, Codex, generic). Until then, any MCP client that supports stdio servers can use serve mode with the same command.

## First-run flow

1. User connects the server.
2. The model calls `get_profile`. If `null`, it offers the quiz and calls `start_quiz`.
3. It relays questions and sends answers with `answer_question` until `done`.
4. It calls `recommend_skills`, explains the picks in plain language and asks which to install.
5. It calls `install_skills` with `dry_run: true`, shows the result, then runs it for real after the user agrees.

## Errors

Tools return structured errors with a stable `code` (`unknown_skill`, `invalid_answer`, `client_not_supported`, `install_failed`) and a human-readable message.
