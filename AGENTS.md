# Agent Instructions: Bodega Website (Root)

**Stack**: Astro 5 + React 19 + Tailwind CSS  
**Package Manager**: pnpm  
**Build Output**: Static (`output: 'static'`)

**Directory-Specific Instructions**:
- `src/AGENTS.md` → Implementation rules, file placement, coding conventions
- `docs/AGENTS.md` → Design system rules, visual patterns, UI guidelines

---

## Commands

```bash
pnpm dev         # Dev server (default: http://localhost:4321)
pnpm build       # Build for production → dist/
pnpm preview     # Preview production build
```

**Note**: Dependencies are managed in `package.json`. Do not run `pnpm install` manually unless explicitly needed.

---

## Architecture

- **Framework**: Astro with React integration (`@astrojs/react`)
- **Directory Structure**:
  - `src/sections/` → Page sections (organized by page: `home/`, `shared/`)
  - `src/components/ui/` → Reusable UI components
    - `ui/astro/` → Static components (buttons, badges, cards)
    - `ui/islands/` → React islands for interactivity (canvas, animations)
  - `src/components/site/` → Site-wide layout (Navigation, Footer)
  - `src/config/` → Configuration files (navigation, site metadata)
- **Pages**: `src/pages/index.astro` (single-page marketing site)
- **Styles**: `src/styles/global.css` + Tailwind (base styles disabled in `astro.config.mjs`)
- **React Hydration**: Use `client:load` or `client:visible` for islands only

### Important Config

**`astro.config.mjs`:**
```js
tailwind({ applyBaseStyles: false })
```
Base styles are custom-managed in `global.css`.

**`tsconfig.json`:**
```json
"jsx": "react-jsx",
"jsxImportSource": "react"
```
React components use JSX transform, not Astro's default.

---

## Design System: "Technical Prisma"

**Source of Truth**: `docs/DESIGN.md` (206 lines) + `docs/AGENTS.md` (design rules)

### Critical Rules (See `docs/AGENTS.md` for full details)

1. **Indigo only** (`#6366f1` / `indigo-500`) — no cyan, blue, or green
2. **No rounded corners** on structural elements
3. **Monospace for system voice** (`font-mono` for labels, badges, metadata)
4. **Uppercase headlines** (all h1, h2, h3)
5. **Hard edges, tactical aesthetic** — brutalist logistics UI

---

## User-Reported Quirks & Preferences

1. **Server-side functions in Client Components**:
   - Error: `Event handlers cannot be passed to Client Component props`
   - Solution: Move server logic to parent Astro component or convert child to Client Component
   - Common case: pagination handlers in React islands

2. **Interactive background effects**:
   - User prefers mouse-interactive visuals (e.g., hero backgrounds that respond to cursor movement)
   - Use `framer-motion` for animations (already in dependencies)

3. **Form sizing**:
   - User prefers compact forms (slightly smaller than default)
   - Remove redundant elements like logos inside forms

4. **Git workflow**:
   - Do NOT push to remote unless explicitly requested
   - User expects local changes to persist when switching tools

---

## Implementation Guidelines (See `src/AGENTS.md` for full details)

- **Astro-first**: Use Astro for sections, React only for interactive islands
- **File placement**: `sections/<page>/` for page-specific, `sections/shared/` for reusable
- **Extract after second use**: Don't create components prematurely
- **Client directives**: `client:load` (critical) or `client:visible` (default)

---

## Testing & Validation

No test framework configured. Validate changes by:
1. Running `pnpm dev`
2. Visual inspection in browser
3. Check console for React/Astro errors

---

## Quick Reference

| Task | Command / Path |
|------|----------------|
| Add new page | `src/pages/*.astro` |
| Add page section | `src/sections/<page>/SectionName.astro` |
| Add reusable section | `src/sections/shared/SectionName.astro` |
| Add UI component | `src/components/ui/astro/` (static) or `ui/islands/` (interactive) |
| Add React island | `src/components/ui/islands/*.tsx` + `client:` directive in section |
| Update global styles | `src/styles/global.css` |
| Check design tokens | `docs/DESIGN.md` sections 2-4 |
| Verify color palette | `DESIGN.md` line 19-46 (only indigo accent) |

---

---

## Agent Workflow

1. **Before starting**: Read relevant `AGENTS.md` file
   - UI work → `docs/AGENTS.md` for design rules
   - Implementation → `src/AGENTS.md` for file placement
   - Architecture → This file

2. **Common tasks**:
   - Add page → `src/AGENTS.md` "Adding New Pages"
   - Add UI component → `src/AGENTS.md` "File Placement Rules"
   - Check design pattern → `docs/AGENTS.md` "Core UI Patterns"

3. **Golden Rule**: Read `docs/DESIGN.md` before touching UI. Every visual decision is intentional.
