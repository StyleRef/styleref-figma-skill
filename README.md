# StyleRef skill for the Figma agent

A skill for [Figma's built-in AI agent](https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make)
that turns a [StyleRef](https://styleref.io) style into real file objects —
and reads the style already on the canvas back out.

- **Apply a style to a file.** The palette becomes local color variables, the
  type rules become text styles, and the interface rules become the things they
  describe: surface levels, elevation, borders, button shapes, icons,
  navigation, focus rings. The full specification stays in context, so frames
  generated afterwards hold the same look.
- **Capture the style on the canvas.** Point it at a selection and it reads the
  colors, type, radii, spacing and light that are actually there, and writes
  them down as a portable specification.

This is a skill, not a Figma plugin: there is nothing to install from the Figma
Community. It is also separate from the
[StyleRef plugin for Claude](https://github.com/StyleRef/styleref-skill), which
covers ChatGPT, Claude, Midjourney, FLUX, Stable Diffusion and a repo's
`STYLE.md`.

## Install

Figma takes a skill as a single Markdown file.

1. Download [`SKILL.md`](https://raw.githubusercontent.com/StyleRef/styleref-figma-skill/main/SKILL.md).
2. In the Figma agent's chat prompt box choose **Skills → Add skill → Upload a
   file**, and pick that file.
3. Invoke it with `/styleref-figma`.

Creating and using skills needs a paid Figma plan and a Full seat.

Applying and capturing styles need nothing else: the skill reads the public
gallery through the agent's own web fetch, with no account. Saving a style to
your library, extracting one from an image, and publishing need the StyleRef MCP
server added as a custom connector — **Add context → Connectors → Manage →
Created by you → Create**, server URL `https://styleref.io/api/mcp` — and a
StyleRef account.

## Documentation

- [Agent Skill docs — In Figma](https://docs.styleref.io/for-ai-agents/agent-skill#in-figma)
- [REST API](https://docs.styleref.io/for-ai-agents/rest-api/endpoints-reference) — what the skill reads
- [Gallery](https://styleref.io/gallery)

## License

MIT
