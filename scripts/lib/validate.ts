import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import { Ajv, type ErrorObject } from "ajv";

export interface Issue {
  level: "error" | "warn";
  where: string;
  message: string;
}

interface ProfilesRegistry {
  areas: string[];
  profiles: Record<string, { label: string; areas: string[]; starter_bundle: string[] }>;
}

interface SkillMeta {
  id: string;
  areas: string[];
  profiles: string[];
  risk: "low" | "medium" | "high";
  requires_scripts: boolean;
  sources: unknown[];
  last_researched: string;
  conflicts_with?: string[];
}

const TEMPLATE_DIR = "_template";

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf-8"));
}

/** Minimal frontmatter reader: only flat `key: value` pairs between `---` fences. */
export function parseFrontmatter(text: string): Record<string, string> | null {
  const normalized = text.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---(\n|$)/.exec(normalized);
  if (!match || match[1] === undefined) return null;
  const out: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (kv && kv[1] !== undefined) out[kv[1]] = (kv[2] ?? "").trim();
  }
  return out;
}

function hasFiles(dir: string): boolean {
  if (!existsSync(dir)) return false;
  return readdirSync(dir).some((entry) => {
    const p = join(dir, entry);
    return statSync(p).isFile() || (statSync(p).isDirectory() && hasFiles(p));
  });
}

function ajvErrors(errors: ErrorObject[] | null | undefined, where: string): Issue[] {
  return (errors ?? []).map((e) => ({
    level: "error" as const,
    where,
    message: `${e.instancePath || "(root)"} ${e.message ?? "invalid"}`,
  }));
}

export function validateRepo(root: string, skillsDirName = "skills"): Issue[] {
  const issues: Issue[] = [];
  const ajv = new Ajv({ allErrors: true });
  const skillSchema = ajv.compile(readJson(join(root, "schemas", "skill.schema.json")) as object);
  const profilesSchema = ajv.compile(readJson(join(root, "schemas", "profiles.schema.json")) as object);

  // --- registry/profiles.json
  const profilesPath = join(root, "registry", "profiles.json");
  const profilesData = readJson(profilesPath);
  if (!profilesSchema(profilesData)) {
    issues.push(...ajvErrors(profilesSchema.errors, "registry/profiles.json"));
    return issues; // cannot cross-check without a valid registry
  }
  const registry = profilesData as ProfilesRegistry;
  const knownAreas = new Set(registry.areas);
  const knownProfiles = new Set(Object.keys(registry.profiles));

  for (const [pid, p] of Object.entries(registry.profiles)) {
    for (const a of p.areas) {
      if (!knownAreas.has(a)) {
        issues.push({ level: "error", where: "registry/profiles.json", message: `profile "${pid}" uses unknown area "${a}"` });
      }
    }
  }

  // --- skills
  const skillsRoot = join(root, skillsDirName);
  const folders = existsSync(skillsRoot)
    ? readdirSync(skillsRoot).filter((d) => statSync(join(skillsRoot, d)).isDirectory())
    : [];
  const ids = new Set<string>();

  for (const folder of folders) {
    const dir = join(skillsRoot, folder);
    const where = `${skillsDirName}/${folder}`;
    const isTemplate = folder === TEMPLATE_DIR;

    const metaPath = join(dir, "skill.json");
    const mdPath = join(dir, "SKILL.md");
    if (!existsSync(metaPath)) {
      issues.push({ level: "error", where, message: "missing skill.json" });
      continue;
    }
    if (!existsSync(mdPath)) {
      issues.push({ level: "error", where, message: "missing SKILL.md" });
      continue;
    }

    let meta: unknown;
    try {
      meta = readJson(metaPath);
    } catch (e) {
      issues.push({ level: "error", where: `${where}/skill.json`, message: `invalid JSON: ${(e as Error).message}` });
      continue;
    }
    if (!skillSchema(meta)) {
      issues.push(...ajvErrors(skillSchema.errors, `${where}/skill.json`));
      continue;
    }
    const m = meta as SkillMeta;

    // folder name = frontmatter name = id (template keeps placeholder id)
    const md = readFileSync(mdPath, "utf-8");
    const fm = parseFrontmatter(md);
    if (!fm) {
      issues.push({ level: "error", where: `${where}/SKILL.md`, message: "missing frontmatter (--- fences)" });
    } else {
      if (!fm.name) issues.push({ level: "error", where: `${where}/SKILL.md`, message: "frontmatter missing `name`" });
      if (!fm.description) issues.push({ level: "error", where: `${where}/SKILL.md`, message: "frontmatter missing `description`" });
      if (fm.name && fm.name !== m.id) {
        issues.push({ level: "error", where, message: `frontmatter name "${fm.name}" != skill.json id "${m.id}"` });
      }
    }
    if (!isTemplate && basename(dir) !== m.id) {
      issues.push({ level: "error", where, message: `folder "${folder}" != skill.json id "${m.id}"` });
    }
    if (!isTemplate) {
      if (ids.has(m.id)) issues.push({ level: "error", where, message: `duplicate id "${m.id}"` });
      ids.add(m.id);
    }

    // areas / profiles exist in the registry
    for (const a of m.areas) {
      if (!knownAreas.has(a)) issues.push({ level: "error", where: `${where}/skill.json`, message: `unknown area "${a}"` });
    }
    for (const p of m.profiles) {
      if (!knownProfiles.has(p)) issues.push({ level: "error", where: `${where}/skill.json`, message: `unknown profile "${p}"` });
    }

    // high-risk skills need a disclaimer section
    if (m.risk === "high" && !/^#{2,3}\s+(Limits and disclaimer|Limites e aviso)\b/im.test(md)) {
      issues.push({ level: "error", where: `${where}/SKILL.md`, message: 'risk "high" requires a "Limits and disclaimer" section (pt-BR: "Limites e aviso")' });
    }

    // scripts consistency
    const scriptsPresent = hasFiles(join(dir, "scripts"));
    if (scriptsPresent && !m.requires_scripts) {
      issues.push({ level: "error", where: `${where}/skill.json`, message: "scripts/ has files but requires_scripts is false" });
    }
    if (!scriptsPresent && m.requires_scripts) {
      issues.push({ level: "warn", where: `${where}/skill.json`, message: "requires_scripts is true but scripts/ is empty" });
    }

    // non-template skills must have real research notes
    if (!isTemplate && !existsSync(join(dir, "references", "sources.md"))) {
      issues.push({ level: "warn", where, message: "missing references/sources.md" });
    }
  }

  // starter bundles and conflicts must point to existing skills (checked once skills exist)
  if (ids.size > 0) {
    for (const [pid, p] of Object.entries(registry.profiles)) {
      for (const sid of p.starter_bundle) {
        if (!ids.has(sid)) {
          issues.push({ level: "error", where: "registry/profiles.json", message: `profile "${pid}" starter_bundle references unknown skill "${sid}"` });
        }
      }
    }
  }

  return issues;
}
