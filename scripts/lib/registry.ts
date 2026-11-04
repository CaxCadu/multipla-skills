import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { Ajv } from "ajv";

const TEMPLATE_DIR = "_template";
export const INDEX_SCHEMA_VERSION = 1;

interface SkillJson {
  id: string;
  sources: unknown[];
  [key: string]: unknown;
}

export interface RegistryIndex {
  schema_version: number;
  count: number;
  skills: Array<Record<string, unknown>>;
}

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf-8"));
}

/**
 * Builds the registry index from `skills/*\/skill.json`.
 * Deterministic: no timestamps, skills sorted by id, stable key order.
 * `sources` is replaced by `sources_count` to keep the index small; full sources stay in skill.json.
 */
export function buildIndex(root: string, skillsDirName = "skills"): RegistryIndex {
  const ajv = new Ajv({ allErrors: true });
  const skillSchema = ajv.compile(readJson(join(root, "schemas", "skill.schema.json")) as object);
  const skillsDir = join(root, skillsDirName);

  const dirs = readdirSync(skillsDir)
    .filter((d) => d !== TEMPLATE_DIR && statSync(join(skillsDir, d)).isDirectory())
    .sort();

  const skills = dirs.map((dir) => {
    const metaPath = join(skillsDir, dir, "skill.json");
    if (!existsSync(metaPath)) throw new Error(`${skillsDirName}/${dir}: missing skill.json`);
    const meta = readJson(metaPath) as SkillJson;
    if (!skillSchema(meta)) {
      const msg = (skillSchema.errors ?? []).map((e) => `${e.instancePath || "(root)"} ${e.message}`).join("; ");
      throw new Error(`${skillsDirName}/${dir}/skill.json invalid: ${msg}`);
    }
    if (meta.id !== dir) throw new Error(`${skillsDirName}/${dir}: id "${meta.id}" differs from folder name`);
    const { sources, ...rest } = meta;
    return { ...rest, sources_count: sources.length, path: `${skillsDirName}/${dir}` };
  });

  const index: RegistryIndex = { schema_version: INDEX_SCHEMA_VERSION, count: skills.length, skills };

  const indexSchema = ajv.compile(readJson(join(root, "schemas", "index.schema.json")) as object);
  if (!indexSchema(index)) {
    const msg = (indexSchema.errors ?? []).map((e) => `${e.instancePath || "(root)"} ${e.message}`).join("; ");
    throw new Error(`generated index violates schemas/index.schema.json: ${msg}`);
  }
  return index;
}

export function serializeIndex(index: RegistryIndex): string {
  return JSON.stringify(index, null, 2) + "\n";
}
