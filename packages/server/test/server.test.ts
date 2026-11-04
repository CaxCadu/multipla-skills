import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { Catalog, findRoot } from "../src/catalog.js";
import { createServer } from "../src/server.js";

const root = findRoot();
const catalog = Catalog.load(root);
const index = JSON.parse(readFileSync(join(root, "registry", "index.json"), "utf-8")) as { count: number };

let client: Client;

beforeAll(async () => {
  const server = createServer(catalog);
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  client = new Client({ name: "test-client", version: "0.0.0" });
  await Promise.all([server.connect(serverSide), client.connect(clientSide)]);
});

afterAll(async () => {
  await client.close();
});

async function callTool(name: string, args: Record<string, unknown>) {
  const res = await client.callTool({ name, arguments: args });
  return res as { isError?: boolean; structuredContent?: Record<string, any>; content: Array<{ type: string; text: string }> };
}

describe("tools", () => {
  it("exposes list_skills and get_skill", async () => {
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(["get_skill", "list_skills"]);
  });

  it("list_skills returns every indexed skill and never the template", async () => {
    const res = await callTool("list_skills", {});
    expect(res.structuredContent?.count).toBe(index.count);
    const ids = res.structuredContent?.skills.map((s: { id: string }) => s.id);
    expect(ids).toContain("contract-review");
    expect(ids).not.toContain("_template");
  });

  it("list_skills filters by area, profile and query", async () => {
    const byArea = await callTool("list_skills", { area: "law" });
    expect(byArea.structuredContent?.skills.map((s: { id: string }) => s.id)).toContain("contract-review");
    for (const s of byArea.structuredContent?.skills) expect(s.areas).toContain("law");

    const byProfile = await callTool("list_skills", { profile: "lawyer" });
    for (const s of byProfile.structuredContent?.skills) expect(s.profiles).toContain("lawyer");

    const byQuery = await callTool("list_skills", { query: "CONTRACT" });
    expect(byQuery.structuredContent?.skills.map((s: { id: string }) => s.id)).toContain("contract-review");

    const combined = await callTool("list_skills", { area: "law", query: "enem" });
    expect(combined.structuredContent?.count).toBe(0);
  });

  it("get_skill returns SKILL.md, metadata and references", async () => {
    const res = await callTool("get_skill", { skill_id: "contract-review" });
    expect(res.isError).toBeFalsy();
    const data = res.structuredContent!;
    expect(data.skill_md).toBe(catalog.skillMd("contract-review"));
    expect(data.metadata.id).toBe("contract-review");
    expect(data.metadata.risk).toBe("high");
    expect(data.references).toContain("sources.md");
    expect(JSON.parse(res.content[0]!.text)).toEqual(data);
  });

  it("get_skill returns a structured unknown_skill error", async () => {
    const res = await callTool("get_skill", { skill_id: "does-not-exist" });
    expect(res.isError).toBe(true);
    expect(res.structuredContent?.error.code).toBe("unknown_skill");
    expect(res.structuredContent?.error.message).toContain("does-not-exist");
  });

  it("get_skill rejects path-like ids as unknown_skill", async () => {
    const res = await callTool("get_skill", { skill_id: "../../etc/passwd" });
    expect(res.isError).toBe(true);
    expect(res.structuredContent?.error.code).toBe("unknown_skill");
  });
});

describe("prompts", () => {
  it("has one prompt per skill, named after the id", async () => {
    const { prompts } = await client.listPrompts();
    expect(prompts.map((p) => p.name).sort()).toEqual(catalog.all().map((s) => s.id).sort());
  });

  it("prompt body is the SKILL.md content", async () => {
    const res = await client.getPrompt({ name: "weekly-review" });
    const msg = res.messages[0]!;
    expect(msg.role).toBe("user");
    expect(msg.content.type).toBe("text");
    expect((msg.content as { text: string }).text).toBe(catalog.skillMd("weekly-review"));
  });
});

describe("resources", () => {
  it("lists skill://<id> and reference resources", async () => {
    const { resources } = await client.listResources();
    const uris = resources.map((r) => r.uri);
    expect(uris).toContain("skill://contract-review");
    expect(uris).toContain("skill://contract-review/references/sources.md");
    expect(uris.some((u) => u.includes("_template"))).toBe(false);
  });

  it("reads SKILL.md and a reference file", async () => {
    const skill = await client.readResource({ uri: "skill://contract-review" });
    expect((skill.contents[0] as { text: string }).text).toBe(catalog.skillMd("contract-review"));

    const ref = await client.readResource({ uri: "skill://contract-review/references/sources.md" });
    expect((ref.contents[0] as { text: string }).text).toBe(catalog.reference("contract-review", "sources.md"));
  });

  it("fails to read an unknown resource", async () => {
    await expect(client.readResource({ uri: "skill://nope" })).rejects.toThrow();
  });
});

describe("catalog", () => {
  it("rejects references outside the references folder", () => {
    expect(() => catalog.reference("contract-review", "../SKILL.md")).toThrowError(/no reference file/);
  });
});
