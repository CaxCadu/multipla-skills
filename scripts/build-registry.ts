import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildIndex, serializeIndex } from "./lib/registry.js";

// Usage: tsx scripts/build-registry.ts [--check] [repoRoot]
const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const check = args.includes("--check");
const root = resolve(args.find((a) => !a.startsWith("--")) ?? resolve(here, ".."));
const target = join(root, "registry", "index.json");

const next = serializeIndex(buildIndex(root));

if (check) {
  const current = existsSync(target) ? readFileSync(target, "utf-8") : null;
  if (current !== next) {
    console.error("registry/index.json is missing or out of date. Run: npm run build:registry");
    process.exit(1);
  }
  console.log("build-registry: registry/index.json is up to date");
} else {
  writeFileSync(target, next);
  console.log(`build-registry: wrote registry/index.json (${JSON.parse(next).count} skills)`);
}
