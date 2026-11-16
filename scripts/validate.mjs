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
    const name = fields.match(/^name:\s*(\S+)/m)?.[1];
    if (name !== 'styleref-figma') errors.push(`SKILL.md: frontmatter name is "${name}", expected "styleref-figma"`);
    if (!/^description:\s*\S/m.test(fields)) errors.push('SKILL.md: frontmatter has no "description"');
  }
}

if (errors.length) {
  for (const error of errors) console.error(`::error::${error}`);
  process.exit(1);
}
console.log('ok: SKILL.md (styleref-figma)');
