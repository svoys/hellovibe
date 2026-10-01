# HelloVibe — Product Journey Implementation Pack v0.1

## Purpose

Implement the third homepage section: **Section 03 — HOW WE WORK / the Product Journey**.

It follows the AI Gap (01) and Services (02) and answers the question those two sections leave open:

> You said where AI creates leverage and what you sell. So what actually happens after I get in touch?

This is a focused implementation task. Do NOT build the Hero, Vibe Machine, AI Gap, Services, Navbar, Footer, case studies, contact form, CMS, database, authentication or analytics.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`.
3. Read `HelloVibe_Foundation_Pack_v0.1.md`, `HelloVibe_Navigation_Footer_Pack_v0.1.md` and the AI Gap + Services pack if present.
4. Inspect the existing repository and git history.
5. Treat the repository and the existing implementation as the source of truth.
6. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

This pack did not come from ChatGPT; it was drafted from the repo. Five judgement calls were made where the source material was silent. Correct any of them and the copy below changes with it.

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Number of stages | **Four** — mirrors the four service pillars and keeps the rail readable | Three (merge Define into Build) |
| 2 | Section index | **`03`** — continues 01 / 02 | — |
| 3 | Section H2 | *"How an idea becomes something that works."* | *"From first signal to working product."* / *"Four stages. One working reality."* |
| 4 | Surface | **Warm background**, same as AI Gap and Services | Full-bleed near-black, which would make this the page's dark finale before the black footer |
| 5 | Mobile behaviour | **Same stepper**, stacked vertically, panel below the list | Every stage expanded on mobile with the interaction disabled |

Two smaller calls:

- **No durations.** No stage says "2 weeks" or "6 weeks". A process duration is a commitment, and this pack does not invent commitments. If you want them, add a `when` field to the data and I will render it.
- **No numbers-as-proof.** No "3× faster", no percentages, no ROI figures. The staircase diagram for *Scale* is deliberately unlabelled so it reads as a direction, not a fake chart.

---

## 1. Section position and anchor

Homepage order after this task:

```tsx
<Hero />
<AIGap />
<Services />
<ProductJourney />
```

Anchor:

```text
id="how-we-work"
```

Notes:

- The anchor matches the navbar's **"How we work"** label.
- `data/navigation.ts` currently points "How we work" at `/services`, not at this anchor. **Do not change the navbar** — it is frozen. Wiring the nav link to `#how-we-work` is a separate decision and is listed as an open question in §21.
- The section heading carries `id="journey-title"` so the section can use `aria-labelledby` without an extra wrapper.

---

## 2. Approved copy — section header

```text
03
HOW WE WORK

How an idea becomes something that works.

No black box. Four stages, each with a clear output — so you always know
what you’re getting and what happens next.
```

Rendered with the existing `SectionHeader`:

```tsx
<SectionHeader
  number="03"
  eyebrow="How we work"
  tone="strong"
  titleId="journey-title"
  title="How an idea becomes something that works."
  description="No black box. Four stages, each with a clear output — so you always know what you’re getting and what happens next."
/>
```

`tone="strong"` is required. `--color-muted` (#8a8882) measures 3.2:1 on `--color-bg` and fails WCAG AA for body text; `strong` uses the `black/70` and `black/75` alpha variants already used by the Hero and the other two sections.

Header layout: split, like Services — title left, description right — so the block does not read as a third Hero.

```text
lg: title col-span-7 · description col-span-5
```

---

## 3. Approved copy — the four stages

Each stage has five fields. The phase label and the stage title are the only text shown in the rail; the description, outputs and diagram live in the panel.

Copy is verbatim — including the typographic apostrophes (`’`, U+2019) and em dashes (`—`). The shipped copy in `AIGap.tsx` and `data/services.ts` already uses these characters; match them so the three sections read as one voice.

### 01 · Diagnose

```text
phase        Diagnose
title        Find where AI actually pays off.
description  We map how your business really works, then rank the places AI
             can move the needle — and the ones that only look good in a demo.
outputs      Opportunity map
             Ranked use cases
             A clear recommendation
```

### 02 · Define

```text
phase        Define
title        Turn the opportunity into a plan.
description  We shape the strongest bet into a scoped product or system —
             what we build, what we don’t, and how we’ll know it worked.
outputs      Scope and success criteria
             Prototype direction
             Effort and timeline
```

### 03 · Build

```text
phase        Build
title        Build the working version.
description  We design and build the real thing in short cycles, so you review
             working software instead of another slide deck.
outputs      Working software
             Visible progress
             Decisions documented
```

### 04 · Scale

```text
phase        Scale
title        Make it real — and keep it real.
description  We launch, measure and improve against real usage, then hand your
             team something they can run without us.
outputs      Launch and measurement
             Iteration on real usage
             Handover your team can run
```

### Why this arc

- The four verbs — **Find · Turn · Build · Make** — are deliberate imperatives, matching the Services pattern (`Find · Automate · Build · Amplify`).
- Stage 04 lands on the brand promise: *"AI, but make it real."* The journey ends on the line the Hero opened with.
- Stage 01 closes the loop with the AI Gap, which already says the hard part is *"knowing where AI actually creates leverage"*. Diagnose is that sentence turned into a service.
- The outputs are process artefacts, not claims about results. Nothing here asserts a client, a metric or an outcome.

---

## 4. Visual concept

Direction: **a technical rail, not an illustrated journey.** No maps, no winding paths, no icons of people, no rocket ships.

The rail is the whole idea:

```text
01 ──── 02 ──── 03 ──── 04
●────────○──────○──────○
```

- A hairline track runs between four nodes.
- The track ahead of the active node is filled in `--color-vibe` (#c7ff3d).
- The active node is a filled `--color-vibe` square with a black border; inactive nodes are hairline-bordered squares on the warm background.
- No circles, no pills. Squares only, matching the Hero's orange square marker and the ServiceVisual marks.

### Per-stage diagram

Each stage gets one abstract mark, built from CSS borders and small shapes — the same technique as `ServiceVisual.tsx`. One accent colour per mark, maximum.

| Stage | Mark | Reads as |
|---|---|---|
| Diagnose | Six 10×10 squares in a row — five hairline-bordered, the third solid `--color-vibe` with a black border — under a full-width hairline | Scan a field, spot the one that matters |
| Define | A dashed rectangle with a solid smaller rectangle nested inside it, plus two hairline ticks on the left edge | A bet scoped inside a boundary |
| Build | Two solid black blocks stacked, widest at the bottom, with a third dashed block on top | Built up, with the next piece in progress |
| Scale | Three ascending solid blocks on a hairline baseline; the tallest carries a `--color-vibe` cap | Direction of travel, unlabelled |

Rules:

- Marks are `aria-hidden="true"` — they are decoration, and the panel text already carries the meaning.
- No raster imagery, no fake screenshots, no fake analytics, no fake logos, no neural-network clichés, no glowing orbs.
- Diagram sits in a bordered box (`border-line`, white background) with the phase label in mono uppercase at the foot — the same treatment `ServiceVisual` uses for its stage captions, so the two sections read as one system.

---

## 5. Data model

Create `data/product-journey.ts` — the single source of truth, so no stage is described twice.

```ts
/** Which abstract mark a stage draws. See `components/home/JourneyVisual.tsx`. */
export type JourneyVisualKind = "diagnose" | "define" | "build" | "scale";

/** One stage of the HelloVibe product journey. */
export type JourneyStage = {
  /** Stable key. Also used to build the tab and panel ids. */
  id: string;
  /** Display index shown in the rail, e.g. `"01"`. */
  number: string;
  /** Short phase name, rendered uppercase in mono. */
  phase: string;
  /** Stage headline — the rail label and the panel's accessible name. */
  title: string;
  /** One or two sentences of detail. */
  description: string;
  /** What the client actually receives at the end of this stage. */
  outputs: readonly string[];
  /** Abstract mark for this stage. */
  visual: JourneyVisualKind;
};

/**
 * The four stages, exactly as approved in the Product Journey Pack v0.1 §3.
 *
 * The copy is fixed — do not reword, reorder or extend this list.
 */
export const journeyStages: readonly JourneyStage[] = [
  { id: "diagnose", number: "01", phase: "Diagnose", title: "Find where AI actually pays off.", … },
  { id: "define",   number: "02", phase: "Define",   title: "Turn the opportunity into a plan.", … },
  { id: "build",    number: "03", phase: "Build",    title: "Build the working version.", … },
  { id: "scale",    number: "04", phase: "Scale",    title: "Make it real — and keep it real.", … },
];
```

`readonly` throughout. The array is consumed by exactly one component and must not be duplicated in JSX.

---

## 6. Component architecture

```text
components/
└── home/
    ├── ProductJourney.tsx      Server  — section shell, header, section id
    ├── JourneyStepper.tsx      Client  — tablist, rail fill, panels
    └── JourneyVisual.tsx       shared  — the abstract mark for one stage

data/
└── product-journey.ts          data    — the four stages
```

Boundary rules:

- `ProductJourney` is a **Server Component**. It renders `<section>`, `<Container>`, `<SectionHeader>` and `<JourneyStepper />`. It holds `export const JOURNEY_SECTION_ID = "how-we-work";`.
- `JourneyStepper` is the **only** `"use client"` file. It owns the active index and the keyboard handling.
- `JourneyVisual` needs no hooks — it is a pure function of `kind`. Do not add `"use client"` to it; it is pulled into the client bundle by its importer, which is correct.
- Keep the client boundary to one file. Do not make the section a Client Component.

---

## 7. Desktop layout

Breakpoint: the stepper switches to its wide form at `lg` (1024px), matching the rest of the site.

```text
┌ Container ───────────────────────────────────────────────────────┐
│  03 ── HOW WE WORK                                               │
│                                                                  │
│  How an idea becomes                        No black box. Four   │
│  something that works.                      stages, each with…   │
│                                                                  │
│  01 ─────────●─────────○─────────○─────────○                     │
│  DIAGNOSE    DEFINE    BUILD     SCALE                           │
│  Find where… Turn the… Build the… Make it real…                  │
│                                                                  │
│  ┌──────────────────────────┬──────────────────────────────┐     │
│  │ We map how your business │  ┌────────────────────────┐  │     │
│  │ really works, then rank… │  │        ▪ ▪ ▪ ▪ ▪ ▪     │  │     │
│  │                          │  │                        │  │     │
│  │ OUTPUTS                  │  └────────────────────────┘  │     │
│  │ — Opportunity map        │  DIAGNOSE                    │     │
│  │ — Ranked use cases       │                              │     │
│  │ — A clear recommendation │                              │     │
│  └──────────────────────────┴──────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

Grid:

```text
rail        full width, 12 columns
panel       lg: text col-span-6 · diagram col-span-6
```

- Section rhythm: `py-section-lg`, `border-t border-line` — identical to AI Gap and Services.
- Panel sits inside a bordered container (`border border-line bg-white`) so the interactive area reads as a stage, not as loose text.
- The rail is `position: static` — no sticky, no scroll hijacking.

---

## 8. Tablet and mobile layout

Below `lg`:

- The rail becomes **vertical**: four full-width rows stacked, each row showing `number · phase · title`, with the node marker on the left and the connecting hairline running down the left edge.
- The panel sits directly beneath the list, inside the same bordered container, with a top hairline and no large gap.
- Rows are at least **56px** tall so they clear the 44×44px touch-target minimum.
- The panel stacks: description, then diagram, then outputs.
- No horizontal scrolling. No truncated labels — rows wrap to two lines rather than clipping.

At `md` (768px) the header splits into two columns; below that it stacks.

This keeps one DOM structure and one interaction model at every width. If you would rather have every stage expanded on mobile with the interaction disabled, say so — see §21.

---

## 9. Interaction

The pattern is a **tablist**. It is the correct pattern for "one of four things is showing" and it comes with keyboard behaviour for free.

- Selecting a node makes that stage active and swaps the panel.
- Activation is **automatic**: moving with the arrow keys activates immediately. The panels are cheap static content, which is exactly the case where ARIA recommends automatic over manual activation.
- Hover raises the node's border contrast. Hover is never the only way to reach anything.
- Focus is never removed. The global `:focus-visible` ring stays.
- The rail fill animates its width (desktop) or height (mobile) to the active node.

Keyboard:

| Key | Behaviour |
|---|---|
| `Tab` | Enters the tablist at the active tab, then continues into the panel |
| `ArrowRight` / `ArrowDown` | Next stage (wraps 04 → 01) |
| `ArrowLeft` / `ArrowUp` | Previous stage (wraps 01 → 04) |
| `Home` | First stage |
| `End` | Last stage |

Both arrow pairs work at every width. On mobile the rail is visually vertical, so up/down is the natural pair; on desktop left/right is. Supporting both means a keyboard user can never get stuck because of a layout change — this is a deliberate superset of the ARIA pattern.

Roving tabindex: exactly one tab has `tabIndex={0}` (the active one); the rest are `-1`. This is what makes `Tab` enter and leave the group as a single stop.

---

## 10. Accessibility

Required:

- `<section id="how-we-work" aria-labelledby="journey-title">`
- `<div role="tablist" aria-label="Our process, four stages">`
- Each tab is a real `<button>` with:
  - `role="tab"`
  - `id="journey-tab-{stage.id}"`
  - `aria-controls="journey-panel-{stage.id}"`
  - `aria-selected={active}`
  - `tabIndex={active ? 0 : -1}`
- Each panel has:
  - `role="tabpanel"`
  - `id="journey-panel-{stage.id}"`
  - `aria-labelledby="journey-tab-{stage.id}"`
  - `hidden` when inactive
  - `tabIndex={0}`, so a keyboard user can scroll the panel body
- `aria-orientation` matches the current layout: `"vertical"` below `lg`, `"horizontal"` at `lg` and above. Use the existing `useMediaQuery` helper from `lib/media-query.ts` — do not add a new one.
- Inactive panels use the `hidden` attribute, not `display:none` via a class, so they leave the accessibility tree and the tab order correctly.
- The numbered index inside a tab is part of the accessible name — it is meaningful order, not decoration. Do not mark it `aria-hidden`.
- Contrast: body text `black/75` (8.1:1), meta text `black/70` (6.8:1) on `--color-bg`. The `--color-vibe` fill is used only as a shape, never as a text colour on a light surface — `#c7ff3d` on white is far below AA.
- No hover-only functionality. No focus trapping. No dialog semantics.

---

## 11. Motion

Use `motion` for React (`import { motion } from "motion/react"`), which is already a dependency. Do not add an animation library.

| Element | Motion |
|---|---|
| Rail fill | `transform: scaleX()` / `scaleY()` from the left/top origin, 320ms |
| Panel swap | The panel is keyed by stage id; it enters with `opacity 0 → 1` and `transform: translateY(8px) → 0`, 260ms |
| Node state | Colour and border transitions, 150ms |
| Diagram marks | Fade and a 4px rise, 220ms, staggered 40ms per mark |

Easing: `cubic-bezier(.22, 1, .36, 1)` — the curve already used by the Hero and the mobile menu.

Constraints:

- **Transform and opacity only.** Never animate `width`, `height`, `left`, `top` or `margin`.
- **Deterministic.** No `Math.random()` anywhere. Every offset is a literal in the source, exactly as in `AIGapVisual.tsx`.
- **`prefers-reduced-motion` must be handled in JS as well as CSS.** The global CSS block in `app/globals.css` sets `transition-duration: 0.01ms !important`, but Motion animates in JavaScript and that override does not reach it. Gate every animated value on `useReducedMotion()` and render the final state directly when it returns `true`. This is the same approach `ServiceVisual` and `AIGapVisual` already use.
- No animation may hide content. With reduced motion, every stage is still readable.
- Do not animate on scroll position. The stepper is user-driven.

---

## 12. Responsive requirements

Test explicitly at:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Check:

- no horizontal overflow at any width
- the rail does not clip or truncate stage titles
- nodes remain reachable and tappable (≥44×44px)
- the panel does not jump in height in a way that scrolls the page under the user
- the header split at `md` does not orphan the description
- the diagram box keeps its aspect without squashing
- the section's top border aligns with the Container gutter, like the sections above it

Do not solve mobile by shrinking everything. The vertical rail is a different arrangement, not a scaled-down one.

---

## 13. Constraints

Do NOT:

- add dependencies
- use WebGL, Three.js, `<canvas>` or an animation library
- use gradients, background noise, decorative blobs or cursor effects
- use stock photography or any raster imagery
- draw generic AI imagery — neural networks, nodes-and-edges webs, glowing orbs, robot heads, sparkles
- invent metrics, percentages, ROI figures, clients, logos, testimonials, awards, addresses, phone numbers or social accounts
- state a duration or price for any stage
- add a chatbot, a form, a CMS, a database, analytics or page transitions
- make the section a Client Component
- touch the design tokens, the type scale, or `--color-muted`

---

## 14. Preserve

Do not change:

- `components/home/Hero.tsx`, `HeroTrack.tsx`, `VibeMachine.tsx`, `VibeMachineWord.tsx`
- `components/home/AIGap.tsx`, `AIGapVisual.tsx`
- `components/home/Services.tsx`, `ServiceCard.tsx`, `ServiceVisual.tsx`
- `components/layout/*` — Navbar, MobileMenu, NavLinks, Footer
- `components/ui/*` — Container, Button, ArrowLink, Tag, SectionHeader
- `data/services.ts`, `data/navigation.ts`
- the `@theme static` token block and every base rule in `app/globals.css`
- `app/layout.tsx`, `app/contact/page.tsx`

Reuse `Container`, `SectionHeader`, `cn()` and the existing tokens. If something is missing, add the smallest compatible thing.

---

## 15. Dependencies

Add nothing. `next`, `react`, `tailwindcss`, `motion` and `lucide-react` are sufficient. `package.json` and `package-lock.json` must be unchanged by this task.

---

## 16. Validation

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Note for the build: `next build` cleans its `distDir` before compiling, which the sandbox blocks above 50 files per turn. Point `distDir` at a folder that does not yet exist, build, then restore `tsconfig.json` — `next build` rewrites it.

Also check:

- TypeScript errors
- hydration warnings
- console errors
- keyboard: `Tab` in, arrows, `Home`/`End`, `Tab` out
- `aria-selected`, `aria-controls`, `hidden` and `aria-orientation` are correct at both layouts
- focus-visible on tabs and on the panel
- reduced motion: every animation is skipped and all four stages remain readable
- no horizontal overflow at the eight widths
- the page renders without JavaScript: all four stage titles are present in the HTML, and the section header and first panel read correctly

Do not claim success if a check failed.

---

## 17. Definition of done

Complete only when:

- the section renders at `id="how-we-work"`, after `<Services />`
- the section header uses the approved copy and `tone="strong"`
- all four stages render from `data/product-journey.ts` with the approved copy
- the rail shows four numbered nodes with a fill that tracks the active stage
- selecting a node swaps the panel
- keyboard control works, including wrapping and `Home`/`End`
- roving tabindex is correct
- `aria-selected`, `aria-controls`, `aria-labelledby` and `hidden` are correct
- `aria-orientation` matches the layout at both breakpoints
- focus-visible works on tabs and panels
- reduced motion is honoured in JS and CSS, and no content is hidden by it
- no horizontal overflow at any of the eight widths
- no invented claims, metrics, clients or durations
- lint, typecheck and build all pass
- no console or hydration errors are introduced
- Hero, Vibe Machine, AI Gap, Services, Navbar, Footer and the tokens are byte-identical to `6e38aa1`

---

## 18. Do not overbuild

Do NOT:

- add a fifth stage
- add stage durations, prices or guarantees
- add illustrations, icons or photography
- add a scroll-driven or sticky version of the rail
- add a second interaction model for mobile
- add an auto-advancing carousel or autoplay
- add sound, confetti or decorative flourishes
- add deep links per stage
- wire the navbar to `#how-we-work`
- redesign anything that already shipped

---

## 19. Commit

Exactly:

```text
feat: add interactive product journey
```

Push to `main`. Do not create extra commits for this task.

---

## 20. Final response format

Report only:

### Implemented

Short list of what shipped.

### Files changed

List files created and modified.

### Validation

- `npm run lint` — result
- `npm run typecheck` — result
- `npm run build` — result
- responsive checks — result
- accessibility checks — result
- reduced-motion check — result

### Notes

Only unresolved issues or open questions.

---

## 21. Open questions

Answer any of these and the pack changes before a line of code is written.

1. **Mobile behaviour.** Default is the same stepper, stacked, with the panel below the list. The alternative is every stage expanded on mobile with no interaction — more to scroll, but nothing hidden.
2. **Section H2.** Default is *"How an idea becomes something that works."* Alternatives: *"From first signal to working product."* / *"Four stages. One working reality."*
3. **Surface.** Default is the warm background. A full-bleed near-black version would make this the page's dark finale immediately before the black footer — striking, but two dark blocks in a row.
4. **Stage durations.** Currently omitted on purpose. If you want them, give me the wording (e.g. "1–2 weeks") and I will add a `when` field.
5. **Navbar wiring.** `#how-we-work` exists after this task but the navbar still points "How we work" at `/services`. Change the nav, or leave it?
6. **`AGENTS.md`.** It does not exist in the repository. Create it, or keep the "read if present" phrasing?

---

Next task after this:

`Implement HelloVibe Cases / Work section.`
