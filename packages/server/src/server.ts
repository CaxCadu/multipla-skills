import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Catalog } from "./catalog.js";
import { errorResult, okResult } from "./errors.js";

export const SERVER_NAME = "multipla-skills";
export const SERVER_VERSION = "0.0.0";

/**
 * Builds the MCP server (serve mode): tools, one prompt per skill, and skill resources.
 * Transport-agnostic: connect it to stdio (src/index.ts) or an in-memory pair (tests).
 */
export function createServer(catalog: Catalog = Catalog.load()): McpServer {
  const server = new McpServer({ name: SERVER_NAME, version: SERVER_VERSION });

  // --- Tools
  server.registerTool(
    "list_skills",
    {
      title: "List skills",
      description:
        "Browse the skill catalog. All filters are optional: area (e.g. law), profile (e.g. lawyer), query (free text over id, name, summary and tags).",
      inputSchema: {
        area: z.string().optional().describe("Only skills in this area"),
        profile: z.string().optional().describe("Only skills meant for this profile"),
        query: z.string().optional().describe("Free-text search"),
      },
      annotations: { readOnlyHint: true },
    },
    ({ area, profile, query }) => {
      const skills = catalog.list({ area, profile, query }).map((s) => ({
        id: s.id,
        name: s.name,
        summary: s.summary,
        language: s.language,
        areas: s.areas,
        profiles: s.profiles,
        tags: s.tags,
        risk: s.risk,
        status: s.status,
      }));
      return okResult({ count: skills.length, skills });
    },
  );

  server.registerTool(
    "get_skill",
    {
      title: "Get skill",
      description:
        "Return a skill's full SKILL.md, its metadata (skill.json) and the list of its reference files. Reference files are readable as resources at skill://<id>/references/<file>.",
      inputSchema: { skill_id: z.string().describe("The skill id, e.g. contract-review") },
      annotations: { readOnlyHint: true },
    },
    ({ skill_id }) => {
      try {
        return okResult({ ...catalog.detail(skill_id) });
      } catch (err) {
        return errorResult(err);
      }
    },
  );

  // --- Prompts and resources: one set per skill
  for (const s of catalog.all()) {
    server.registerPrompt(s.id, { title: s.name, description: s.summary }, () => ({
      description: s.summary,
      messages: [{ role: "user", content: { type: "text", text: catalog.skillMd(s.id) } }],
    }));

    server.registerResource(
      `${s.id}`,
      `skill://${s.id}`,
      { title: s.name, description: s.summary, mimeType: "text/markdown" },
      (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: catalog.skillMd(s.id) }] }),
    );

    for (const file of catalog.referenceFiles(s.id)) {
      server.registerResource(
        `${s.id}/references/${file}`,
        `skill://${s.id}/references/${file}`,
        { title: `${s.name}: ${file}`, mimeType: "text/markdown" },
        (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: catalog.reference(s.id, file) }] }),
      );
    }
  }

  return server;
}
