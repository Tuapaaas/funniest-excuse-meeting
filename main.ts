// The Funniest Excuse for Skipping a Meeting
// One razor-sharp line, at most 200 characters, written to /output/entry.txt.
// The joke: a meeting about the meeting itself, which then spawns a follow-up
// — the recursive calendar nightmare every office worker recognises.
// The program self-checks the sealed gate before writing: UTF-8 text of
// 1 to 200 characters, not only white space, exactly one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm already stuck in a meeting about this meeting, and it just added a follow-up.";

// Gate check: 1-200 characters, non-blank, single line.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${[...LINE].length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: the written bytes must match the line exactly.
if (readFileSync(outPath, "utf8") !== LINE) {
  throw new Error("entry.txt does not match the line byte for byte");
}
console.log(`wrote ${outPath} (${[...LINE].length} chars)`);
