import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validateRepo } from "./lib/validate.js";

// Self-test: the validator must accept a good skill and reject each kind of broken one.
const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "..");

interface Opts {
  folder?: string;
  meta?: Record<string, unknown>;
  body?: string;
  scriptFile?: boolean;
}

const baseMeta = {
  id: "good-skill",
  name: "Good skill",
  version: "0.1.0",
  summary: "A good skill.",
  language: "en",
  areas: ["general"],
  profiles: ["curious"],
  tags: ["x"],
  region: null,
  level: ["starting"],
  risk: "low",
  requires_scripts: false,
  sources: [{ title: "S", url: "https://example.org", accessed: "2026-11-02" }],
  last_researched: "2026-11-02",
  authors: ["me"],
  status: "draft",
};

function makeRepo(opts: Opts): string {
  const root = mkdtempSync(join(tmpdir(), "multipla-test-"));
  cpSync(join(repo, "schemas"), join(root, "schemas"), { recursive: true });
  mkdirSync(join(root, "registry"));
  cpSync(join(repo, "registry", "profiles.json"), join(root, "registry", "profiles.json"));
  const meta = { ...baseMeta, ...(opts.meta ?? {}) };
  const dir = join(root, "skills", opts.folder ?? "good-skill");
  mkdirSync(join(dir, "references"), { recursive: true });
  writeFileSync(join(dir, "skill.json"), JSON.stringify(meta, null, 2));
  writeFileSync(join(dir, "references", "sources.md"), "# Sources\n");
  const name = String(meta.id);
  writeFileSync(
    join(dir, "SKILL.md"),
    opts.body ?? `---\nname: ${name}\ndescription: Does a thing when asked.\n---\n\n# Title\n`,
  );
  if (opts.scriptFile) {
    mkdirSync(join(dir, "scripts"));
    writeFileSync(join(dir, "scripts", "run.sh"), "echo hi\n");
  }
  return root;
}

let failed = 0;
function check(label: string, opts: Opts, expectError: string | null): void {
  const root = makeRepo(opts);
  try {
    const errors = validateRepo(root).filter((i) => i.level === "error");
    const ok =
      expectError === null
        ? errors.length === 0
        : errors.some((e) => e.message.includes(expectError));
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
    if (!ok) {
      failed++;
      console.log("      errors:", errors.map((e) => e.message));
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

check("valid skill passes", {}, null);
check("folder name differs from id", { folder: "other-name" }, "folder");
check("unknown area", { meta: { areas: ["nope"] } }, 'unknown area "nope"');
check("unknown profile", { meta: { profiles: ["ghost"] } }, 'unknown profile "ghost"');
check("empty sources", { meta: { sources: [] } }, "sources");
check(
  "high risk without disclaimer",
  { meta: { risk: "high" } },
  "Limits and disclaimer",
);
check(
  "high risk with disclaimer passes",
  {
    meta: { risk: "high" },
    body: "---\nname: good-skill\ndescription: x.\n---\n\n## Limits and disclaimer\nNot advice.\n",
  },
  null,
);
check("scripts present but flag false", { scriptFile: true }, "requires_scripts");
check(
  "frontmatter name differs from id",
  { body: "---\nname: wrong\ndescription: x.\n---\n" },
  "frontmatter name",
);
check("missing frontmatter", { body: "# no frontmatter\n" }, "frontmatter");

console.log(failed === 0 ? "\nAll validator tests passed." : `\n${failed} validator test(s) failed.`);
process.exit(failed === 0 ? 0 : 1);
