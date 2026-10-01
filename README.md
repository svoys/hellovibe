# HelloVibe — Foundation

> AI Product & Transformation Studio · _AI, but make it real._

This repository currently contains **only the foundation** described in
`HelloVibe_Foundation_Pack_v0.1.md`. The real homepage, Hero, Vibe Machine and
navigation experience are built in the next phase.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Motion | `motion` — import from `motion/react`, never `framer-motion` |
| Icons | `lucide-react` |

Server Components by default. `"use client"` only where browser interaction is
genuinely required.

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Design tokens

Every brand token lives in a single `@theme static` block in `app/globals.css`.
That one block is the canonical source of truth: Tailwind derives utilities from
it (`bg-bg`, `text-h2`, `px-gutter`, `max-w-hv`, `rounded-control`) **and** the
same values are emitted as CSS variables on `:root`, so plain CSS and inline
styles can consume them too.

`static` is required — without it Tailwind v4 tree-shakes unused theme variables
out of the output.

Palette: `--color-bg` `--color-black` `--color-white` `--color-muted`
`--color-line` `--color-vibe` `--color-orange`. Do not introduce additional
brand colours.

Type scale: `text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`,
`text-small`, `text-label` — mobile → desktop targets expressed with `clamp()`.

## Layout primitives

- `<Container>` — gutter padding, `max-w-hv` (1440px), centring. Sections must
  not set their own horizontal margins.
- `.hv-grid` — responsive grid: 4 columns (mobile) → 8 (`md`, 768px) → 12 (`lg`,
  1024px). Defined in the `components` layer so utilities can override it.
- `py-section` / `py-section-lg` — section rhythm, 72 → 120px and 72 → 180px.

## Components

`components/ui/` — `Container`, `Button` + `ButtonLink`, `ArrowLink`, `Tag`,
`SectionHeader`.
`components/layout/` — `Navbar`, `Footer`.

## Conventions

- Never remove a focus outline; replace it with a stronger visible state.
  `:focus-visible` is defined globally in `app/globals.css`.
- Respect `prefers-reduced-motion` (handled globally).
- No gradients, decorative blobs, WebGL or heavy animation libraries.

## Known issue

`--color-muted` (`#8A8882`) on `--color-bg` (`#F5F3EE`) measures **3.2:1**,
below the WCAG AA minimum of 4.5:1 for normal-size text. The token value is
fixed by the Foundation Pack, so it has been left as specified — resolve it at
the design-token level (≈ `#6F6E69` reaches 4.6:1) before shipping.
