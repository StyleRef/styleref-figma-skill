# Releasing

Users upload `SKILL.md` to Figma by hand, so a release is simply what is on
`main`. Tags mark which version of the file went with which app change.

## Steps

1. **Edit** `SKILL.md`. Keep the frontmatter `name: styleref-figma` — CI fails
   otherwise, and Figma users invoke the skill by that name.
2. **Validate** locally:
   ```bash
   node scripts/validate.mjs
   ```
3. **Commit and push** here. When this repo is checked out as the StyleRef
   monorepo's `figma-skill/` submodule it sits on a **detached HEAD**, so push
   explicitly:
   ```bash
   git push origin HEAD:main
   ```
4. **Tag** the release (semver: patch for wording, minor for new guidance):
   ```bash
   git tag -a v0.4.0 -m "styleref-figma v0.4.0" && git push origin v0.4.0
   ```
5. **Bump the pointer** in the monorepo:
   ```bash
   git -C /path/to/StyleRef add figma-skill
   git -C /path/to/StyleRef commit -m "chore(figma-skill): bump pointer"
   ```
6. **Update the public docs** if what the skill teaches changed:
   `apps/docs/content/for-ai-agents/agent-skill.mdx` (the **In Figma** section).

## What has to stay in sync

The skill reads StyleRef's public REST API and quotes parts of the style
schema. When those change in the app, this file has to move too:

| If this changes in the app | Update in `SKILL.md` |
| --- | --- |
| MCP tool names, parameters, or scopes | **Going further** |
| REST endpoints or query parameters | the **Lane A** steps and the **When something goes wrong** table |
| The `json` format's section keys or palette shape | **Lane A** steps 3–6 map those keys onto canvas objects |
| `ui_web` blocks or their option strings (`src/lib/storage/style-schema.json`) | **Lane A** step 5 names the fields and quotes option strings verbatim |
| The gallery's category list | the category list in **Lane A** step 1 |
| The style schema's section ids | the id list in **Lane B** step 3 |
