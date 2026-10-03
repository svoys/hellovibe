# HelloVibe

> AI Product & Transformation Studio · _AI, but make it real._

The marketing site: a single-page homepage assembled from fourteen sections, four
service pillar pages, and the static pages around them. Built from
`HelloVibe_Foundation_Pack_v0.1.md`; all copy comes from that pack.

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
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Routes

| Route | Contents |
|---|---|
| `/` | Homepage — see below |
| `/services` | The four service pillars, with their capability lists |
| `/services/strategy` `/systems` `/products` `/creative` | One pillar per page, statically generated |
| `/work` | Case index (empty state — no invented clients) |
| `/about` | Studio page |
| `/contact` | Contact form |
| `/sitemap.xml` `/robots.txt` | Generated from `app/sitemap.ts` / `app/robots.ts` |

Unknown paths render `app/not-found.tsx`; an unknown pillar slug calls `notFound()`.

## Homepage

Section order lives in `app/page.tsx` and is intentional — the page reads as a
light/dark rhythm, so the sequence is not to be reshuffled casually:

`Hero` · `TrustStrip` · `AIGap` · `Services` · `ProductJourney` · `AIAudit` ·
`Cases` · `Method` · `ProductStudio` · `CreativeEngine` · `WhyHelloVibe` ·
`EngagementModels` · `FAQ` · `FinalCta`

## Layout

```
app/          routes, layout, metadata, sitemap/robots, globals.css
components/
  home/       the homepage sections and their visuals
  layout/     Navbar, MobileMenu, Footer, PageIntro
  services/   PillarCrossNav
  contact/    ContactForm
  ui/         Container, Button + ButtonLink, ArrowLink, Tag, SectionHeader
data/         all copy and structured content, one module per section
lib/          validation, media-query, motion helpers, shared utilities
docs/         per-section notes: what is fragile there and why it is the way it is
```

Copy is never inlined in a component: it lives in `data/`, so a wording change is
a data change.

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

## Surfaces

Three surfaces, and four global rules that change with them. When adding a
section on a new surface, check all four — the tokens stay the same, the hooks do
not:

1. **Focus ring** — black globally; `data-surface="dark"` flips it to white,
   because black on black is invisible.
2. **`::selection`** — vibe-on-black globally; `data-surface="vibe"` inverts it,
   because on the accent surface that pairing would be the field's own colour.
3. **`border-t`** — a coloured section draws none. The colour change *is* the
   separator.
4. **The seam with the neighbour below** — rule 3 breaks when a dark section
   meets a dark one. Check the neighbour, not just your own background.

## Layout primitives

- `<Container>` — gutter padding, `max-w-hv` (1440px), centring. Sections must
  not set their own horizontal margins.
- `.hv-grid` — responsive grid: 4 columns (mobile) → 8 (`md`, 768px) → 12 (`lg`,
  1024px). Defined in the `components` layer so utilities can override it.
- `py-section` / `py-section-lg` — section rhythm, 72 → 120px and 72 → 180px.

## Contact form

`/contact` is a real form: native submission, server-side validation in
`lib/contact.ts`, a Server Action in `app/contact/actions.ts`, and a honeypot for
spam. Because it posts natively it validates and submits with JavaScript
disabled; the client component only exists to render the action's result.

Fields, in order: `intent`, `goal`, `stage`, `budget`, `timing`, `name`, `email`,
`company`. `intent`, `goal`, `stage`, `name` and `email` are required; the rest
are optional. The choice fields are validated against the approved option lists
rather than merely for emptiness, so a crafted POST cannot put arbitrary text
into a field the UI renders as a fixed set.

### Delivery is not connected

`lib/contact-delivery.ts` is the single seam between the form and the outside
world. It currently returns `not-configured`, so a **valid** submission shows an
honest "nothing was sent" notice with `hello@hellovibe.ru` instead of a success
screen. The `success` state is fully wired and renders the moment a transport is
added; it is deliberately unreachable before then, because a success screen for a
message nobody received would both lie to the reader and lose the lead.

**So the form is complete but not yet a lead-capture channel.** Connecting it
means replacing the body of `deliverContactMessage` and nothing else — the action
already treats a non-`ok` outcome as "not delivered".

## Environment

Copy `.env.example` to `.env.local`. Nothing here is required for `next dev` or
`next build`; the variables below are what a deployment must set.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **yes, in production** | Canonical origin. Used for `metadataBase`, every `sitemap.xml` URL and the `Sitemap:` line in `robots.txt`. Falls back to `http://localhost:3000`, which is not a production value. |
| `CONTACT_EMAIL` | only once delivery is connected | Recipient address for contact submissions. Read by `lib/contact-delivery.ts`. |
| `EMAIL_API_KEY` | only once delivery is connected | Provider credential for the same function. |

Both contact variables are **server-side only**. Never prefix a secret with
`NEXT_PUBLIC_` — that prefix inlines the value into the client bundle. The source
requires this explicitly.

Deploying without `NEXT_PUBLIC_SITE_URL` is the one configuration mistake that
fails silently: the site renders correctly but advertises `localhost:3000` to
crawlers.

## Conventions

- Never remove a focus outline; replace it with a stronger visible state.
  `:focus-visible` is defined globally in `app/globals.css`.
- Respect `prefers-reduced-motion` (handled globally). Never branch markup on
  `useReducedMotion()` — the server has no media query and hydration will break.
  Use `useMediaQuery(REDUCED_MOTION_QUERY)` from `lib/media-query.ts` instead.
- No gradients, decorative blobs, WebGL or heavy animation libraries.
- No invented content: no fake metrics, clients, logos, testimonials, awards or
  results — including in `aria-label`s and code comments.

## Known issue

`--color-muted` (`#8A8882`) on `--color-bg` (`#F5F3EE`) measures **3.2:1**,
below the WCAG AA minimum of 4.5:1 for normal-size text. The token value is
fixed by the Foundation Pack, so it has been left as specified and body copy uses
`text-black/75` (8.05:1) instead. Resolve it at the design-token level
(≈ `#6F6E69` reaches 4.6:1) before shipping.
