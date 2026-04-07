# Agent Instructions: docs/ (Documentation)

**Context**: This directory contains project documentation. See root `AGENTS.md` for architecture and `src/AGENTS.md` for implementation rules.

---

## Files in this Directory

- **`DESIGN.md`** → Complete design system specification (206 lines)
  - Color tokens, typography, UI patterns, animation principles
  - **Source of truth** for all visual decisions
  - Read this BEFORE making any UI changes

---

## When to Update Documentation

### Update `DESIGN.md` when:
- New reusable UI pattern emerges (used in 3+ sections)
- Color token gets added or changed
- Typography scale gets new tier
- Animation pattern becomes standard
- Component API changes significantly

### Do NOT update `DESIGN.md` for:
- One-off section-specific styles
- Experimental patterns not yet proven
- Minor tweaks to existing patterns
- Implementation details (those go in component files)

---

## Documentation Writing Guidelines

### 1. Be Specific, Not Generic

**Bad**:
```md
Use appropriate colors for your components.
```

**Good**:
```md
### Accent (Indigo Only)

| Token    | Value           | Usage                     |
|----------|-----------------|---------------------------|
| `accent` | `#6366f1`       | Primary CTA, active nodes |
```

**Why**: Vague guidance gets ignored. Exact values get used.

---

### 2. Include Copy-Paste Code Examples

**Bad**:
```md
Section eyebrows should be small, uppercase, monospace text with the indigo accent color.
```

**Good**:
```md
### Section Eyebrow Label

```tsx
<span className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 font-mono block mb-3">
  // Section Label
</span>
```
```

**Why**: Developers will copy-paste patterns. Make it easy.

---

### 3. Explain the "Why" for Non-Obvious Rules

**Bad**:
```md
- Headlines are always uppercase
```

**Good**:
```md
- Headlines are **always uppercase** — reinforces the command center aesthetic and system-driven hierarchy
```

**Why**: When someone understands the reason, they're more likely to follow the rule.

---

### 4. Use Tables for Token/Scale Documentation

**Good pattern** (already in `DESIGN.md`):
```md
### Surfaces & Backgrounds

| Token              | Value                | Usage                    |
| ------------------ | -------------------- | ------------------------ |
| `bg-base`          | `bg-zinc-950`        | Page background          |
| `bg-surface`       | `bg-zinc-900/40`     | Cards, containers        |
```

**Why**: Scannable, searchable, clear mapping between semantic names and values.

---

### 5. Document Constraints, Not Just Patterns

Include "Do NOT use" lists:

```md
**NEVER use**:
- Cyan (`cyan-*`)
- Blue (`blue-*`)
- Rounded corners on structural elements
```

**Why**: Prevents common mistakes before they happen.

---

### 6. Keep Examples Current

When updating component implementations, check if docs need updating:

**Checklist**:
- [ ] Does `DESIGN.md` reference the old pattern?
- [ ] Are code examples still valid?
- [ ] Do component paths still match?
- [ ] Are Tailwind classes up to date?

---

## Documentation Structure (Best Practices)

### Good Documentation Hierarchy

1. **Philosophy/Principles** → Why does this system exist?
2. **Tokens/Primitives** → Colors, typography, spacing
3. **Patterns/Components** → How to combine primitives
4. **Layout/Composition** → How to build pages
5. **Animation/Interaction** → How things move
6. **Accessibility** → How to stay inclusive

**Current `DESIGN.md` follows this structure** — maintain it when updating.

---

## Updating `DESIGN.md`

### Process

1. **Discuss first**: If it's a breaking change, confirm with user/team
2. **Update pattern**: Add/change the pattern in `DESIGN.md`
3. **Update components**: Sync `src/components/ui/` implementations
4. **Audit usage**: Search codebase for old pattern, update if needed
5. **Test visually**: Run `pnpm dev` and verify changes

### Format Conventions

**Section headers**: Use `## N.` for top-level sections (e.g., `## 2. Color Tokens`)

**Subsections**: Use `###` for categories (e.g., `### Surfaces & Backgrounds`)

**Code blocks**: Always specify language:
```md
```tsx
<Component />
```
```

**Inline code**: Use backticks for class names: `` `text-indigo-500` ``

---

## Common Documentation Patterns

### Pattern: Token Table

```md
### Category Name

| Token         | Value              | Usage                    |
| ------------- | ------------------ | ------------------------ |
| `token-name`  | `actual-value`     | When to use this         |
```

### Pattern: Component Example

```md
### Component Name

**Use for**: Brief description of when to use

```tsx
<Component className="exact classes here">
  Content
</Component>
```

**Component**: `src/components/ui/path/Component.astro`
```

### Pattern: Rule with Rationale

```md
**Rule**: What to do

**Why**: Explanation of the reasoning behind the rule
```

---

## Documentation Checklist

Before committing changes to `DESIGN.md`:

- [ ] Is the new pattern used in 3+ places? (Or is it a core primitive?)
- [ ] Are code examples copy-paste ready?
- [ ] Are all Tailwind classes current?
- [ ] Are component paths correct?
- [ ] Is the "why" explained for non-obvious rules?
- [ ] Are tables formatted correctly?
- [ ] Is the change consistent with existing patterns?

---

## Writing Style

**Be direct**:
- ✅ "Use `indigo-500` for all accent colors"
- ❌ "It would be advisable to consider using indigo-500 for accent colors"

**Be specific**:
- ✅ "`text-[10px] uppercase tracking-[0.2em]`"
- ❌ "Small, uppercase text with extra spacing"

**Be consistent**:
- Use same terminology throughout (e.g., "sections" not "sections/blocks/modules")
- Use same code formatting (e.g., always `className` not `class` in TSX examples)

---

## Cross-References

When documenting patterns that involve implementation:

**In `DESIGN.md`** → Define the pattern, show the code
**In `src/AGENTS.md`** → Reference the pattern, explain when to use it
**In component files** → Implement the pattern, comment if non-obvious

**Example flow**:
1. `DESIGN.md`: "Section eyebrows use `// Label` prefix pattern"
2. `src/AGENTS.md`: "Import `SectionEyebrow.astro` for section intros"
3. `src/components/ui/astro/SectionEyebrow.astro`: Implements the pattern

---

## Reference

**Current documentation**:
- `DESIGN.md` (206 lines) → Complete design system spec

**Related**:
- `src/AGENTS.md` → Implementation guidance
- Root `AGENTS.md` → Architecture overview

**Golden Rule**: Documentation should be authoritative, not aspirational. Document what exists, not what might exist someday.
