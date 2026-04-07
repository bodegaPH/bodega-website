<div align="center">
  <img src="public/bodega-logo-white.svg" alt="Bodega Logo" width="200" />

  <br />
  <br />

  # Bodega Marketing Site

  <p>
    <strong>The immutable, real-time inventory ledger system.</strong>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>

</div>

## Overview

Welcome to the **Bodega** marketing site repository. Bodega is an enterprise-grade inventory management system built upon the absolute principles of an immutable ledger. This repository hosts our high-performance marketing and documentation site that outlines the platform's core capabilities, features, and strict operations protocols.

Built for unparalleled performance and high-fidelity design, this project utilizes our bespoke **Technical Prisma** design system. By leveraging Astro, we ensure a zero-JS baseline with interactive elements thoughtfully introduced via React islands.

---

## 🚀 Tech Stack

*   **[Astro](https://astro.build/)**: The core framework, delivering a fast, content-driven experience with static HTML by default.
*   **[React](https://react.dev/)**: Used selectively for complex, interactive islands such as the `HeroAmbientBackground` and the 3-phase `RotatingPhrase`.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS configured strictly for our monochromatic, brutalist identity.
*   **[Framer Motion](https://www.framer.com/motion/)**: Powers our deterministic, high-performance animations and terminal-inspired sequences.
*   **[TypeScript](https://www.typescriptlang.org/)**: Ensures robust, type-checked code across both `.astro` templates and React `.tsx` components.

---

## 🎨 Technical Prisma Design System

Our marketing interface strictly adheres to a "Logistics Command & Control" aesthetic. The interface is not just a UI; it is an extension of our inventory philosophy—precise, unyielding, and clear.

*   **Typography**: `font-sans` with `font-light` weights for editorial flush-left headlines. `font-mono` is strictly reserved for system identifiers, technical terminology, tracking IDs, and timestamps.
*   **Palette**: A heavily constrained monochromatic scale (Zinc) punctuated *exclusively* by pure Indigo (`#6366f1` / `#4f46e5`) accents. All other primary colors have been purged.
*   **Visual Logic**: Defined by hairline borders (`border-white/5`), corner bracket decorators on data displays, and technical matrix canvas backgrounds.
*   **Motion**: We use a "Terminal-first" motion language. This includes typewriter loops managed by a 3-phase state machine (hold → backspace → type), deterministic pseudo-random data streams, and hardware-accelerated canvas grids.

---

## 📂 Project Structure

```text
bodega-website/
├── public/                 # Static assets (logos, favicons)
├── src/
│   ├── components/         # Reusable UI primitives
│   │   ├── astro/          # Pure HTML/CSS static components (e.g., Buttons)
│   │   ├── site/           # Structural page components (Navigation, Footer)
│   │   └── ui/islands/     # Interactive React components powered by Framer Motion
│   ├── layouts/            # Global HTML boilerplate and layout wrappers
│   ├── pages/              # File-based routing (e.g., index.astro)
│   ├── sections/           # Large, composite page segments
│   │   ├── home/           # Homepage-specific sections (Hero, Features, Steps)
│   │   └── shared/         # Cross-page sections (CTA sequences)
│   └── styles/             # Global CSS resets and custom base directives
├── astro.config.mjs        # Astro framework configuration integrations
├── tailwind.config.js      # Tailwind theme configuration
└── package.json            # Dependencies and scripts tasks
```

---

## 🛠️ Development

### Prerequisites

Ensure you have the following installed on your local environment:
*   [Node.js](https://nodejs.org/en/) (v18.17.0 or higher)
*   [npm](https://www.npmjs.com/) or another package manager (e.g., pnpm, yarn)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mamaw-coders/bodega-website.git
   cd bodega-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The site will be available locally at `http://localhost:4321`*

4. **Build for production:**
   ```bash
   npm run build
   ```
   *This command generates static files within the `dist/` directory, optimized and ready for deployment.*

---

## 📜 Legal & License

© 2026 Bodega Logistics. All Rights Reserved. Not for public distribution.
