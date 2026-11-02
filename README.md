# Multipla Skills

> 🇧🇷 Português: [README.pt-BR.md](README.pt-BR.md)

An open-source library of AI skills for many areas of work and life, delivered through an **MCP server**.

You connect the server to your AI client, answer a short quiz about who you are and what you do (student, lawyer, doctor, developer…), and it recommends and installs the skills that fit you. Each skill is built from deep research of its field and cites its sources.

> **Status:** early phase. The docs are done; the server and the first skills are not built yet. Current milestone and what's next: [build plan](docs/build-plan.md). Overview: [roadmap](docs/roadmap.md).

## How it works

```
connect MCP ─▶ quiz ─▶ your profile (local) ─▶ matching skills ─▶ you confirm ─▶ installed / served
```

1. **Connect** the MCP server to your client (Claude first; GPT, Codex and others later).
2. **Quiz**: a couple of minutes, adaptive, no sensitive data.
3. **Match**: the server ranks skills for your profile and explains why.
4. **Deliver**: skills are installed into your client's skills folder, or served over MCP for clients without native skills.

## Quick start (planned)

Claude Code:

```bash
claude mcp add multipla-skills -- npx -y multipla-skills
```

Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "multipla-skills": { "command": "npx", "args": ["-y", "multipla-skills"] }
  }
}
```

This package is not published yet; these commands are what the final setup will look like.

## Areas (initial)

Law · Health · Education · Software · Marketing · Finance · Small business · Design · Creators · General productivity. Details in [docs/taxonomy.md](docs/taxonomy.md).

## Documentation

- [Vision](docs/vision.md)
- [Architecture](docs/architecture.md)
- [MCP server interface](docs/mcp-server.md)
- [Profile quiz](docs/profile-quiz.md)
- [Skill format](docs/skill-format.md)
- [Skill matching](docs/skill-matching.md)
- [Research process](docs/research-process.md)
- [Build plan (milestones and status)](docs/build-plan.md)
- [Roadmap](docs/roadmap.md)

## Contributing

Add or improve a skill: read [CONTRIBUTING.md](CONTRIBUTING.md) and copy [`skills/_template`](skills/_template/).

## Disclaimer

Skills in regulated areas (law, health, finance) support professionals and informed users. They are not legal, medical or financial advice.

## License

[MIT](LICENSE)
