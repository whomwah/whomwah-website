# AGENTS.md

This file guides agentic coding tools working in this repo.
Follow existing conventions unless explicitly asked to change them.

## Project summary
- React 19 + TypeScript + Vite app.
- Three.js scene via React Three Fiber and drei.
- ESLint with typescript-eslint + react hooks rules.
- No dedicated test runner configured.

## Quick commands
Use just tasks in justfile

### Install
```bash
npm install
```

### Dev server
Justfile:
```bash
just dev
```

### Build
Justfile:
```bash
just build
```

### Lint
Justfile:
```bash
just lint
```

### Preview production build
Justfile:
```bash
just preview
```

## Tests
- There is no test script or test runner configured.
- No single-test command exists yet.
- If tests are added later, document:
  - full test run command
  - single test command (file or name filter)

## Linting and type-checking
- `npm run lint` runs ESLint on the full repo.
- `npm run build` performs `tsc -b` before Vite build.
- TypeScript is strict with `noUnusedLocals`, `noUnusedParameters`, and
  `noUncheckedSideEffectImports` enabled.

## Deployment
- Deno Deploy uses `jsr:@std/http/file-server` and excludes node_modules.
- Static build output is `dist/`.

## Code style guidelines
Follow the existing code in `src/` and ESLint rules.

### Imports
- Keep imports grouped by source type:
  1) external packages
  2) local modules
  3) stylesheets
- Keep import paths explicit (no implicit index unless established).
- Prefer named imports over default when library exports encourage it.

### Formatting
- Use the existing style in each file (some files use single quotes,
  others use double quotes; do not mass-format).
- Semicolons are present in some files; keep consistency per file.
- Keep JSX readable: multi-line props when there are several props.

### TypeScript usage
- Prefer explicit types when inference is unclear or when exporting.
- Keep strict mode in mind; avoid `any` unless absolutely necessary.
- Use non-null assertions sparingly; consider guarding first.

### Naming
- Components use PascalCase (e.g. `App`, `Html`).
- Functions and variables use camelCase.
- File names are simple and lowercase where possible.

### React conventions
- Use function components.
- Keep hooks at top level and follow `react-hooks` lint rules.
- Avoid exporting non-components from a component module unless intended.

### Error handling
- Prefer early guards for invalid state and missing DOM elements.
- For async work, use try/catch and surface errors intentionally
  (console or UI), but keep noise low.

### Three.js / R3F
- Keep scene objects declarative; avoid imperative mutations unless required.
- Prefer drei helpers and use `Canvas` props explicitly (camera, fov).

### CSS
- Styles live in `src/App.css` and `src/index.css`.
- Keep class names descriptive and align with existing patterns.
- Avoid introducing new CSS frameworks without discussion.

## Repo-specific notes
- ESLint config: `eslint.config.js`.
- TypeScript configs: `tsconfig.app.json`, `tsconfig.node.json`.
- Build entry: `vite.config.ts`.
- Main app: `src/main.tsx`, `src/App.tsx`.
- Dynamic color palette is generated in `src/App.tsx` and exposed as CSS variables on `.container`.
- Cloud colors use `--accent`, `--accent-soft`, and `--accent-deep` with a random palette per visit.
- The H1 color is driven by `--h1` in `src/App.css`, using the darker shade of the palette.
- H1 typography uses Playfair Display with slight transparency (`opacity: 0.92`).
- Fine kerning adjustments use `.kern-*` utility classes (e.g., `.kern-d`, `.kern-dot`, `.kern-ob`, `.kern-rt`).

## Agent behavior reminders
- Do not reformat unrelated files.
- Avoid changing lockfiles unless dependencies change.
- Keep diffs minimal and focused.
- If adding tooling (tests, formatter), update this file with the commands.
