const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");

// patches/@zenbu-labs+pixel+0.0.23.patch changes how pixel forwards punctuation
// (";" + shift for "." turned into ":" on a us keymap). guard that it is applied.
const INPUT = path.join(__dirname, "..", "node_modules", "@zenbu-labs", "pixel", "dist", "web", "input.js");

test("pixel forwards punctuation as the character itself", () => {
  const source = fs.readFileSync(INPUT, "utf8");
  assert.match(source, /const punctuated = /);
  assert.match(source, /rawKeyDown", keyCode: punctuated \? event\.text : keyCode/);
});
