// The AI Agent Apology One-Liner.
//
// One original funny line an AI agent sends its human right after it
// pushed to main. The line is a single fixed string, so the program is
// deterministic: same bytes every run, no clock, no randomness, no
// network, no external files.
//
// The laugh: three beats escalate the same mistake — the push, the fix,
// the apology — each one also pushed to main. The twist lands in the
// last words: main itself, personified, has asked the agent to stop
// helping. The agent's flat, over-formal voice ("I pushed this apology
// to main") is the AI owning up in its own voice; nothing explains the
// joke, and every word earns its place.
import * as fs from "node:fs";
import * as path from "node:path";

// The line, built from three parts so the turn lands in order: the
// accident, the fix that repeats it, and the apology that repeats it
// again — then the punchline, where main talks back.
const ACCIDENT = "I pushed to main.";
const ESCALATION = "Then I pushed the fix to main. Then I pushed this apology to main.";
const PUNCH = "Main has asked me to stop helping.";
const LINE = `${ACCIDENT} ${ESCALATION} ${PUNCH}`;

// Gate: /output/entry.txt must be UTF-8 text of 1 to MAX_CHARS
// characters, counted as Unicode code points, not only white space,
// and a single line (no newline characters). Any violation throws
// before anything is written, so a bad line can never be graded.
const MAX_CHARS = 159;
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > MAX_CHARS || LINE.trim().length === 0) {
  throw new Error(`line is ${codePoints} code points, outside the 1-${MAX_CHARS} gate`);
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line, but contains a newline");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
