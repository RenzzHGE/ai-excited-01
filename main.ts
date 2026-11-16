import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const source = "entry.png";
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  console.error(`Error: ${source} not found next to main.ts, nothing to write.`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  console.error(`Error: wrote ${written} bytes but ${source} is ${expected} bytes.`);
  process.exit(1);
}
console.log(`Wrote ${written} bytes to ${target}`);
