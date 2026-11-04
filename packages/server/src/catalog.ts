import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MultiplaError } from "./errors.js";

/** One entry of registry/index.json (see schemas/index.schema.json). */
export interface SkillSummary {
  id: string;
  name: string;
  version: string;
  summary: string;
  language: string;
  areas: string[];
  profiles: string[];
  tags: string[];
  region: string | null;
  level: string[];
  risk: "low" | "medium" | "high";
  requires_scripts: boolean;
  sources_count: number;
  last_researched: string;
  authors: string[];
  status: "draft" | "reviewed" | "stable";
  conflicts_with?: string[];
  path: string;
}

interface RegistryIndex {
  schema_version: number;
  count: number;
  skills: SkillSummary[];
}

export interface SkillDetail {
  metadata: Record<string, unknown>;
  skill_md: string;
  references: string[];
}

export interface SkillFilter {
  area?: string | undefined;
  profile?: string | undefined;
  query?: string | undefined;
}

/** Finds the repo root (the folder that has registry/index.json), starting at `from`. */
export function findRoot(from = dirname(fileURLToPath(import.meta.url))): string {
  const fromEnv = process.env["MULTIPLA_ROOT"];
  if (fromEnv) return resolve(fromEnv);
  let dir = resolve(from);
  for (;;) {
    if (existsSync(join(dir, "registry", "index.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error("Could not find registry/index.json. Run `npm run build:registry` or set MULTIPLA_ROOT.");
    }
    dir = parent;
  }
}

export class Catalog {
  private readonly byId = new Map<string, SkillSummary>();

  constructor(
    private readonly root: string,
    index: RegistryIndex,
  ) {
    if (index.schema_version !== 1) {
      throw new Error(`Unsupported registry index schema_version ${index.schema_version}`);
    }
    for (const s of index.skills) this.byId.set(s.id, s);
  }

  static load(root = findRoot()): Catalog {
    const index = JSON.parse(readFileSync(join(root, "registry", "index.json"), "utf-8")) as RegistryIndex;
    return new Catalog(root, index);
  }

  all(): SkillSummary[] {
    return [...this.byId.values()];
  }

  /** Lists skills; all filters are optional and combined with AND. */
  list(filter: SkillFilter = {}): SkillSummary[] {
    const q = filter.query?.trim().toLowerCase();
    return this.all().filter((s) => {
      if (filter.area && !s.areas.includes(filter.area)) return false;
      if (filter.profile && !s.profiles.includes(filter.profile)) return false;
      if (q) {
        const haystack = [s.id, s.name, s.summary, ...s.tags].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  summary(id: string): SkillSummary {
    const s = this.byId.get(id);
    if (!s) throw new MultiplaError("unknown_skill", `Unknown skill "${id}". Use list_skills to see available ids.`);
    return s;
  }

  private dir(id: string): string {
    // The id comes from the index (a closed set), so it cannot contain path separators.
    return join(this.root, this.summary(id).path);
  }

  skillMd(id: string): string {
    return readFileSync(join(this.dir(id), "SKILL.md"), "utf-8");
  }

  /** File names directly inside references/ (no subfolders, no path traversal). */
  referenceFiles(id: string): string[] {
    const refDir = join(this.dir(id), "references");
    if (!existsSync(refDir)) return [];
    return readdirSync(refDir)
      .filter((f) => statSync(join(refDir, f)).isFile())
      .sort();
  }

  reference(id: string, file: string): string {
    if (!this.referenceFiles(id).includes(file)) {
      throw new MultiplaError("unknown_reference", `Skill "${id}" has no reference file "${file}".`);
    }
    return readFileSync(join(this.dir(id), "references", file), "utf-8");
  }

  detail(id: string): SkillDetail {
    const dir = this.dir(id);
    const metadata = JSON.parse(readFileSync(join(dir, "skill.json"), "utf-8")) as Record<string, unknown>;
    return { metadata, skill_md: this.skillMd(id), references: this.referenceFiles(id) };
  }
}
