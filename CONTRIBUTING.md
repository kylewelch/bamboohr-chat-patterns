# Contributing

Thanks for adding to the catalog. This doc covers the everyday workflow for designers contributing patterns.

## Dev loop

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:5173>. `npm run dev` auto-runs the skill generator first, so `public/SKILL.md`, `public/bamboohr-chat-patterns.zip`, and `src/generated/SKILL.generated.md` are always fresh.

If you ever need to regenerate the skill bundle without restarting Vite:

```bash
npm run build:skill
```

## Where things live

- **`src/patterns/<topic>.jsx`** — the actual pattern components. There's one file per page topic (`choices.jsx`, `artifacts.jsx`, `viz.jsx`, etc.). Each pattern is a named function export.
- **`src/pages/<Topic>Page.jsx`** — the page that displays the patterns. Each `<PatternShowcase>` element on the page corresponds to one pattern.
- **`src/components/AskWindowShell.jsx`** — reusable Ask BambooHR window mockup. Used both by the right-side preview pane and by `TodoListInAskWindow` (and you can use it for any new pattern that wants to live inside a chat surface).

## Adding a new pattern

1. **Write the component.** Open the topic file that fits best (e.g. `src/patterns/choices.jsx`) and add your component as a named function. Add it to the `export { … }` block at the bottom of the file.

2. **Add a showcase to the page.** Open the matching page file (e.g. `src/pages/ChoicesPage.jsx`) and add:

   ```jsx
   <PatternShowcase
     title="MyNewPattern"
     description="One-sentence description of what this pattern is and when to reach for it."
     previewContext={{
       userMsg: "A realistic question that would lead to this pattern in the wild.",
       aiLead: "Sure — here you go:",
     }}
   >
     <MyNewPattern />
   </PatternShowcase>
   ```

   The `previewContext` props power the right-side preview pane and feed the SKILL.md "Use when" lines, so make `userMsg` a real example, not generic filler.

3. **Run `npm run dev`.** Confirm the pattern renders correctly on the page and that the right-side preview shows it inside the Ask window.

## When a pattern doesn't fit a chat thread

For raw primitives (icon sets, avatars, single-bubble examples), pass `preview={false}` on the `<PatternShowcase>`:

```jsx
<PatternShowcase title="Ico (icon set)" description="…" preview={false} bare>
  …
</PatternShowcase>
```

That hides it from the preview pane's tracking. The `bare` prop also strips the default AI message wrapper so the stage shows the artifact alone.

## Adding a new page

1. Create `src/pages/<Topic>Page.jsx` modeled on the existing pages.
2. Create `src/patterns/<topic>.jsx` for the components.
3. Add the route in `src/App.jsx`.
4. Add a sidebar entry in `src/components/Sidebar.jsx`.
5. Add a home tile in `src/pages/HomePage.jsx`.
6. **Wire the skill generator.** Open `scripts/build-skill.mjs` and add an entry to `PAGE_CATEGORIES`:

   ```js
   <Topic>Page: { title: 'Display Name', source: 'patterns/<topic>.jsx' },
   ```

   Without this, the new page's patterns won't appear in `SKILL.md`.

## How the skill bundle works

`scripts/build-skill.mjs` walks `src/pages/*.jsx`, regex-extracts each `<PatternShowcase>`'s `title`, `description`, and `previewContext.userMsg`, and emits:

- `public/SKILL.md` — the index Claude Code reads when its description matches a user's task.
- `public/bamboohr-chat-patterns.zip` — bundle containing `SKILL.md`, a `README.md`, the JSX source for every pattern, and `AskWindowShell.jsx`.
- `src/generated/SKILL.generated.md` — same markdown, imported into `SkillPage.jsx` via Vite's `?raw` so the preview always has the current content.

Don't hand-edit `SKILL.md` — it's regenerated on every `npm run dev` / `npm run build`. Edit the page metadata instead.

The regex is intentionally lax (it only handles literal JSX). If you find yourself wanting dynamic `title` props or spread attributes on `<PatternShowcase>`, switch the parser to `@babel/parser`.

## Style notes

- Use Fabric Encore tokens (`var(--gray-9)`, `var(--primary-500)`, etc.) over hard-coded colors.
- Pattern components should be self-contained — no global state, no external API calls. Internal `React.useState` is fine.
- Keep the patterns small. If a pattern is more than ~100 lines, it's probably two patterns.

## Submitting a PR

1. Branch off `main`.
2. Run `npm run build` locally to confirm the production build still works.
3. Open the PR with screenshots of the new pattern (specimen view + preview-pane view side by side is ideal).

For larger changes — a new category, a layout overhaul, design-token updates — open an issue first so we can talk about direction before you spend the time.
