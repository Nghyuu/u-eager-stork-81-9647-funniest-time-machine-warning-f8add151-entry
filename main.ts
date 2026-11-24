import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(dir, "entry.txt"));
const decoded = text.toString("utf8");
const codePoints = [...decoded].length;
if (codePoints < 1 || codePoints > 120 || decoded.split("\n").length !== 1) {
  throw new Error(`entry.txt must be a single line of 1-120 characters, got ${codePoints}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
