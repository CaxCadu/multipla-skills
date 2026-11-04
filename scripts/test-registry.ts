import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildIndex, serializeIndex } from "./lib/registry.js";

// Self-test: the index is deterministic, skips _template, and a stale index is detected.
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");
const script = join(here, "build-registry.ts");

let failed = 0;
function test(name: string, ok: boolean, detail = ""): void {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : ` ${detail}`}`);
  if (!ok) failed++;
}

function run(root: string, ...args: string[]) {
  return spawnSync("npx", ["tsx", script, ...args, root], { encoding: "utf-8" });
}

const a = serializeIndex(buildIndex(repo));
const b = serializeIndex(buildIndex(repo));
test("build is deterministic", a === b);

const index = buildIndex(repo);
const ids = index.skills.map((s) => s.id as string);
test("skills sorted by id", ids.join() === [...ids].sort().join());
test("_template skipped", !ids.includes("_template"));
test("count matches skills", index.count === index.skills.length);

const tmp = mkdtempSync(join(tmpdir(), "multipla-registry-"));
try {
  cpSync(join(repo, "schemas"), join(tmp, "schemas"), { recursive: true });
  cpSync(join(repo, "skills"), join(tmp, "skills"), { recursive: true });
  cpSync(join(repo, "registry"), join(tmp, "registry"), { recursive: true });

  test("build writes index", run(tmp).status === 0);
  test("check passes when fresh", run(tmp, "--check").status === 0);

  const skillPath = join(tmp, "skills", "weekly-review", "skill.json");
  const meta = JSON.parse(readFileSync(skillPath, "utf-8"));
  meta.version = "9.9.9";
  writeFileSync(skillPath, JSON.stringify(meta, null, 2));
  test("check fails when index is stale", run(tmp, "--check").status === 1);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (failed > 0) {
  console.error(`\n${failed} registry test(s) failed`);
  process.exit(1);
}
console.log("\nAll registry tests passed.");
