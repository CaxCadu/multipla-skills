import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Checks that relative links in Markdown files point to existing files/folders.
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(process.argv[2] ?? resolve(here, ".."));
const SKIP = new Set(["node_modules", ".git", "dist", "build"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith(".md")) out.push(p);
  }
  return out;
}

let broken = 0;
const files = walk(root);
for (const file of files) {
  const text = readFileSync(file, "utf-8");
  // strip fenced code blocks so examples inside them are not checked
  const stripped = text.replace(/```[\s\S]*?```/g, "");
  for (const m of stripped.matchAll(/\]\(([^)\s#]+)(#[^)]*)?\)/g)) {
    const target = m[1];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    const resolved = normalize(join(dirname(file), target));
    if (!existsSync(resolved)) {
      console.log(`BROKEN ${relative(root, file)} -> ${target}`);
      broken++;
    }
  }
}
console.log(`check-links: ${files.length} file(s) checked, ${broken} broken link(s)`);
process.exit(broken > 0 ? 1 : 0);
