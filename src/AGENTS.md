# Agent Instructions: src/ (Implementation)

**Context**: This is the implementation layer for the Bodega marketing site. See root `AGENTS.md` for overall architecture and `docs/AGENTS.md` for design rules.

---

## Directory Structure

```
src/
├── sections/          # Page sections (organized by page)
│   ├── home/         # Landing page sections
│   └── shared/       # Reusable sections (CTA, LogoStrip, etc.)
├── components/
│   ├── ui/
│   │   ├── astro/   # Static UI primitives (buttons, badges, cards)
│   │   └── islands/  # React islands (canvas, animations)
│   └── site/         # Site-wide chrome (Navigation, Footer)
├── pages/            # Astro pages (routes)
├── layouts/          # Page layouts
├── config/           # Site config, navigation data
├── data/             # Structured content (pricing, features)
└── styles/           # Global CSS
```

---

## File Placement Rules

### When to create a new file

**Page Section** (`sections/<page>/SectionName.astro`):
- Content specific to one page
- Example: `sections/home/HeroSection.astro`, `sections/pricing/PricingTable.astro`

**Shared Section** (`sections/shared/SectionName.astro`):
- Used on 2+ pages with same structure
- Example: `sections/shared/CTASection.astro`

**UI Component** (`components/ui/astro/*.astro`):
- Reusable primitive used across multiple sections
- Example: `PrimaryButton.astro`, `OpBadge.astro`, `TacticalCard.astro`

**React Island** (`components/ui/islands/*.tsx`):
- Interactive component requiring state, effects, or browser APIs
- Example: `HeroAmbientBackground.tsx`, `RotatingPhrase.tsx`

**Site Component** (`components/site/*.astro`):
- Site-wide layout elements
- Example: `Navigation.astro`, `Footer.astro`

### When NOT to extract a component

- Used in only one place and no clear reuse pattern
- Tightly coupled to parent section logic
- Extracting would make code harder to read

**Rule of thumb**: Extract after second use, not before.

---

## Astro vs React Decision Tree

```
Does it need state/effects/browser APIs?
├─ NO → Use Astro (.astro)
└─ YES → Can it be done with CSS/SVG animation?
    ├─ YES → Use Astro with CSS/SVG
    └─ NO → Use React island (.tsx)
```

**Current Islands** (all in `components/ui/islands/`):
- `HeroAmbientBackground.tsx` → Canvas matrix with dynamic rendering
- `RotatingPhrase.tsx` → Typewriter carousel with state machine

**Don't over-hydrate**: Most sections (Hero, Features, Steps, CTA) are Astro with tiny islands embedded.

---

## Client Directive Rules

```astro
<!-- Critical interactive content above fold -->
<ComponentName client:load />

<!-- Below-fold interactive content -->
<ComponentName client:visible />

<!-- Never needed but waiting for user action -->
<ComponentName client:idle />
```

**Default**: Use `client:visible` unless component is critical above-fold.

---

## Import Conventions

**Prefer relative paths:**
```astro
import Button from '../../components/ui/astro/Button.astro';
import Island from '../../components/ui/islands/Island.tsx';
```

**Import order:**
1. Layout/site components
2. Sections
3. UI components
4. Islands (with client directive inline)
5. Utilities/config

---

## Common Patterns

### Page Section Template

```astro
---
import SectionEyebrow from '../../components/ui/astro/SectionEyebrow.astro';
---

<section class="px-6 py-32 max-w-[1600px] w-full mx-auto relative z-10 bg-zinc-950">
  <SectionEyebrow class="mb-4">
    Section Label
  </SectionEyebrow>
  
  <h2 class="text-3xl md:text-4xl font-light text-white leading-[1.1]">
    Section Title
  </h2>
  
  <!-- Section content -->
</section>
```

### UI Component Template (Static)

```astro
---
interface Props {
  class?: string;
}

const { class: className = "" } = Astro.props;
---

<div class={`base-classes ${className}`}>
  <slot />
</div>
```

### UI Component Template (Interactive)

```tsx
interface Props {
  className?: string;
}

export default function ComponentName({ className = "" }: Props) {
  return (
    <div className={`base-classes ${className}`}>
      {/* interactive content */}
    </div>
  );
}
```

---

## Styling Rules

**Always use Tailwind utilities.** No inline styles except:
- Dynamic values (e.g., `style={{ fontSize: clamp(...) }}`)
- CSS masks/gradients not in Tailwind

**Class order:**
1. Layout (`flex`, `grid`, `relative`)
2. Sizing (`w-full`, `h-screen`)
3. Spacing (`p-6`, `mt-4`)
4. Typography (`text-sm`, `font-mono`)
5. Colors (`bg-zinc-950`, `text-white`)
6. Effects (`opacity-50`, `transition-colors`)

**Never use `rounded-*` on structural elements.** See `docs/DESIGN.md` for details.

---

## Animation Guidelines

**Prefer native over React:**
- SVG `<animate>` for line animations
- Tailwind animations for simple loops
- CSS `@keyframes` for custom animations (add to `global.css`)

**Use Framer Motion only for:**
- Complex state-driven animations
- Scroll-triggered reveals with `whileInView`
- Gesture-based interactions

**Current animations:**
- Infinite scroll → `animate-infinite-scroll-y` (custom keyframe in `global.css`)
- SVG flows → Native `<animate attributeName="stroke-dashoffset">`
- Scroll reveals → `framer-motion` in sections (remove if possible in future refactor)

---

## Config & Data Files

**`src/config/`** → Static configuration:
- `site.ts` → Site metadata, base URL, social links
- `navigation.ts` → Nav/footer link structure

**`src/data/`** → Structured content:
- `pricing.ts` → Pricing tiers, features
- `features.ts` → Feature list with icons/descriptions

**Rule**: If Navigation/Footer hardcodes links, extract to `config/navigation.ts` first.

---

## Known Issues & Workarounds

### Event handlers in Astro → React

**Problem**: Can't pass server-side functions to React islands.

**Error**:
```
Event handlers cannot be passed to Client Component props
```

**Solution**: Move handler logic to parent Astro component or make entire component a React island.

**Example**:
```astro
<!-- BAD: Astro component trying to pass handler -->
<ReactComponent onPageChange={(n) => console.log(n)} client:load />

<!-- GOOD: Handler inside React island -->
<ReactComponent client:load /> 
```

---

## Adding New Pages

1. **Create page file**: `src/pages/pagename.astro`
2. **Create sections folder**: `src/sections/pagename/`
3. **Build sections**: Use Astro, extract islands only if needed
4. **Reuse UI components**: Import from `components/ui/astro/`
5. **Reuse shared sections**: Import from `sections/shared/`
6. **Update navigation**: Add to `components/site/Navigation.astro` (or `config/navigation.ts` once extracted)

**Example page structure**:
```astro
---
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/site/Navigation.astro';
import Footer from '../components/site/Footer.astro';

import HeroSection from '../sections/pagename/HeroSection.astro';
import ContentSection from '../sections/pagename/ContentSection.astro';
import CTASection from '../sections/shared/CTASection.astro';
---

<Layout title="Page Title">
  <Navigation />
  <main>
    <HeroSection />
    <ContentSection />
    <CTASection />
  </main>
  <Footer />
</Layout>
```

---

## Performance Checklist

Before committing a new section:

- [ ] Is it Astro-first? (React only where necessary)
- [ ] Are islands using `client:visible` below fold?
- [ ] Are images optimized? (use Astro's `<Image>` component)
- [ ] Are animations performant? (CSS/SVG over JS)
- [ ] Is bundle size reasonable? (check `pnpm build` output)

---

## Validation

**Before pushing**:
```bash
pnpm dev       # Visual check
pnpm build     # Production build check
```

**Look for**:
- Console errors (React, Astro)
- Hydration mismatches
- Missing imports
- Incorrect Tailwind classes

**No automated tests**: Visual inspection is current validation method.
