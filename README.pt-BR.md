# Multipla Skills

> 🇬🇧 English: [README.md](README.md)

Uma biblioteca open source de skills de IA para várias áreas do trabalho e da vida, entregue por um **servidor MCP**.

Você conecta o servidor ao seu cliente de IA, responde a um quiz curto sobre quem você é e o que faz (estudante, advogado, médico, desenvolvedor…), e ele recomenda e instala as skills que combinam com você. Cada skill é construída a partir de pesquisa aprofundada da área e cita suas fontes.

> **Status:** fase inicial de documentação. O servidor e as primeiras skills ainda não existem. Veja o [roadmap](docs/roadmap.md) (em inglês).

## Como funciona

```
conectar MCP ─▶ quiz ─▶ seu perfil (local) ─▶ skills compatíveis ─▶ você confirma ─▶ instaladas / servidas
```

1. **Conecte** o servidor MCP ao seu cliente (Claude primeiro; GPT, Codex e outros depois).
2. **Quiz**: poucos minutos, adaptativo, sem dados sensíveis.
3. **Match**: o servidor ordena as skills para o seu perfil e explica o porquê.
4. **Entrega**: as skills são instaladas na pasta de skills do cliente, ou servidas via MCP para clientes sem suporte nativo.

## Início rápido (planejado)

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

O pacote ainda não foi publicado; estes comandos mostram como será a configuração final.

## Áreas (iniciais)

Direito · Saúde · Educação · Software · Marketing · Finanças · Pequenos negócios · Design · Criadores · Produtividade geral. Detalhes em [docs/taxonomy.md](docs/taxonomy.md). Algumas skills serão específicas do Brasil (LGPD, CLT, SUS, ENEM, MEI…).

## Documentação

A documentação técnica está em inglês, em [`docs/`](docs/): [visão](docs/vision.md), [arquitetura](docs/architecture.md), [servidor MCP](docs/mcp-server.md), [quiz de perfil](docs/profile-quiz.md), [formato de skill](docs/skill-format.md), [matching](docs/skill-matching.md) e [processo de pesquisa](docs/research-process.md).

## Contribuir

Para adicionar ou melhorar uma skill, leia o [CONTRIBUTING.md](CONTRIBUTING.md) e copie o [`skills/_template`](skills/_template/). Skills em português são bem-vindas.

## Aviso

Skills em áreas regulamentadas (direito, saúde, finanças) apoiam profissionais e pessoas informadas. Não são aconselhamento jurídico, médico ou financeiro.

## Licença

[MIT](LICENSE)
