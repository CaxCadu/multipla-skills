import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validateRepo } from "./lib/validate.js";

// Usage: tsx scripts/validate-skills.ts [repoRoot] [skillsDirName]
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] ?? resolve(here, ".."));
const skillsDir = process.argv[3] ?? "skills";

const issues = validateRepo(root, skillsDir);
const errors = issues.filter((i) => i.level === "error");
const warns = issues.filter((i) => i.level === "warn");

for (const i of issues) {
  console.log(`${i.level === "error" ? "ERROR" : "warn "} ${i.where}: ${i.message}`);
}
console.log(`\nvalidate: ${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length > 0 ? 1 : 0);
