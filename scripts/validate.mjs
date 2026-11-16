#!/usr/bin/env node
// Checks what Figma needs to load the skill: one SKILL.md with YAML frontmatter,
// a "description" (how the agent knows when to use it) and the name users
// invoke it by.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const path = join(root, 'SKILL.md');
const errors = [];

if (!existsSync(path)) {
  errors.push('SKILL.md: missing');
} else {
  const body = readFileSync(path, 'utf8');
  const frontmatter = body.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) {
    errors.push('SKILL.md: no YAML frontmatter');
  } else {
    const fields = frontmatter[1];
    // Exactly one of each key, and the name on its own line: a second `name:`
    // would let a YAML reader see a different value than this check did.
    if ((fields.match(/^name:/gm) ?? []).length !== 1) errors.push('SKILL.md: frontmatter needs exactly one "name"');
    else if (!/^name:[ \t]+styleref-figma[ \t]*$/m.test(fields)) errors.push('SKILL.md: frontmatter name must be "styleref-figma"');
    if ((fields.match(/^description:[ \t]+\S/gm) ?? []).length !== 1) {
      errors.push('SKILL.md: frontmatter needs exactly one "description"');
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(`::error::${error.replace(/[%\r\n]/g, ' ')}`);
  process.exit(1);
}
console.log('ok: SKILL.md (styleref-figma)');
