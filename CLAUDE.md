# CLAUDE.md

See AGENTS.md for full project structure, conventions, and guidelines.

## Quick commands (just tasks)

```bash
just dev       # dev server
just build     # tsc + vite build
just lint      # eslint
just preview   # preview production build
```

## Key files

- `src/App.tsx` — dynamic color palette, CSS variable setup
- `src/App.css` — all visual styles (no Tailwind, plain CSS)
- `src/lib/html.tsx` — HTML overlay (title, links, bio)
- `src/index.css` — base/reset styles

## CSS notes

- All styles live in `src/App.css` and `src/index.css`
- No CSS framework — plain class names aligned with existing patterns
- Positioning uses CSS classes, not inline styles
