# BambooHR AI Chat Patterns

A working catalog of the AI/chat UI patterns used across BambooHR — choices, todos, artifacts, chain-of-thought, charts, system objects, shifts, inline chat, sources, loading states, and more. Each pattern lives on its own page with a live demo and brief notes on when and why to use it.

The site also produces a downloadable [Claude Code skill](https://docs.anthropic.com/claude/docs/claude-code-skills) bundle so designers can drop these patterns into prototypes built with Claude Code.

## Stack

- React 19 + Vite (no TypeScript)
- React Router v7
- Plain CSS with Fabric Encore design tokens
- FontAwesome + inline SVG for icons

## Quick start

```bash
npm install
npm run dev
```

The site runs at <http://localhost:5173>. The dev script auto-runs `build:skill` first, which generates `public/SKILL.md`, `public/bamboohr-chat-patterns.zip`, and `src/generated/SKILL.generated.md` from the page metadata.

## Project structure

```
src/
├── pages/                     # one file per page (e.g. ChoicesPage.jsx)
├── patterns/                  # the actual pattern components, grouped by page
├── components/
│   ├── PatternShowcase.jsx    # wraps each pattern with a header + stage
│   ├── PreviewPane.jsx        # right-side sticky chat-window preview
│   ├── PreviewPaneContext.jsx # IntersectionObserver-based active-tracking
│   ├── AskWindowShell.jsx     # the reusable Ask BambooHR window mockup
│   └── …                      # Layout, Sidebar, PageHeader, ScrollToTop
├── styles/
│   ├── docs.css
│   ├── chat-patterns.css
│   └── colors_and_type.css
└── generated/                 # written by scripts/build-skill.mjs (gitignored)

scripts/
└── build-skill.mjs            # generates SKILL.md and the .zip bundle

public/                        # static assets; SKILL.md and the .zip are gitignored
```

## Adding a pattern

The short version: write a component, export it, drop a `<PatternShowcase>` for it on the matching page. Full instructions in [CONTRIBUTING.md](./CONTRIBUTING.md).

## The /skill page

The site auto-generates a Claude Code skill bundle from the same `<PatternShowcase>` metadata that drives the gallery. Visit `/skill` to download the zip, or read [CONTRIBUTING.md](./CONTRIBUTING.md#how-the-skill-bundle-works) for how it's wired.

## Contributing

PRs welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md). For larger changes (new categories, layout overhauls), open an issue first so we can sanity-check the direction.

## License

[MIT](./LICENSE)
