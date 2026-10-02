# HelloVibe — Creative Engine Implementation Pack v0.1

## Purpose

Implement **Section 10 — AI CREATIVE ENGINE** as a homepage block after Product Studio.

It is the block that answers the third of the three questions the page is built around. Product Studio answers *I have an idea — can you build it?*; this one answers *can you keep feeding it?* It is the only block on the page whose subject is content rather than product, and the only one aimed at the third ICP the source names — brands, media and e-commerce.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Method, Product Studio, Why HelloVibe, Engagement Models, FAQ, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency. Creative Engine is a homepage block, a `data/` module and one CSS block. Nothing else.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Product Studio, Method, Cases, AI Audit, Trust Strip, Product Journey and Static Pages packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`08`** — continuing the visitor-visible sequence (AI Gap `01` … Product Studio `07`) | `10`, the block's position in the full 15-item page order. The source's own internal index is `10` in the page order and `14`/`11`/`04` in three other documents. See §1 |
| 2 | Surface | **Full-bleed `--color-vibe`**, black text | Dark, matching Product Studio. Rejected — the source asks for a *light* section whose background differs *strongly* from the block above it, and the block above it is black. See §4 |
| 3 | Which formats | The **six-item** list | The source's third pass gives a seven-item list adding `Campaign` and `Static`. The six-item one is given twice verbatim. See §3 |
| 4 | Visual | **A seed, a trunk, six branches** — the seed block, a line drawn downward, stubs out to each format | A horizontal fan converging on six columns. Rejected: it needs breakpoint-specific line geometry that breaks at the intermediate widths. See §5 |
| 5 | Motion | **Draw** — trunk scales down, stubs extend, chips slide in | The Product Studio stagger (fade + lift). Rejected: the source names "One → Many" as this block's concept, and a fade does not say "one becomes many" |
| 6 | Header layout | **Single column, diagram beside it** | The Services split. This block has one supporting line and it belongs under its heading, above the CTA it leads to |
| 7 | `border-t` | **None** | `--color-line` measures 1.2:1 on `--color-vibe`. A hairline drawn there is an artefact, not a rule |
| 8 | CTA | **`variant="accent"`** — new variant, identical to `primary` at rest | `primary`. Its hover fills with `--color-vibe`, so on this field the button would vanish under the cursor |
| 9 | `::selection` | **Flipped to black-on-vibe** via `data-surface="vibe"` | Leaving the global rule. It paints selections in `--color-vibe`, i.e. the colour of this field — selecting text would look like nothing happened |

---

## 1. Section position and anchor

Creative Engine is the **tenth** item in the source's page order:

```text
8. Method   9. AI Product Studio   10. AI Creative Engine   11. Why HelloVibe …
```

Its `number` prop is `"08"`, not `"10"`, because the on-page numbering counts **content sections only** — Hero and Trust Strip carry no index, and Navbar and Footer are chrome:

```text
The AI gap 01 · What we do 02 · One partner. Every stage. 03
· Find your best AI opportunities. 04 · Things we're building. 05
· Think first. Build fast. Learn constantly. 06
· Let's turn it into something people can use. 07
· Your next creative team doesn't sleep. 08
```

- Anchor: **`#creative-engine`**, exported as `CREATIVE_SECTION_ID`.
- Heading: `aria-labelledby="creative-title"`.
- **No `border-t`.** See §4.

---

## 2. Approved copy

Every prose string is **verbatim from the source**, with one normalisation.

| Field | Value |
|---|---|
| `number` | `08` |
| `eyebrow` | `AI × CREATIVE` |
| `title` | `Your next creative team doesn’t sleep.` |
| `description` | `We build AI-powered content systems that turn strategy into a constant flow of ideas, campaigns, images, video and social content.` |
| `cta` | `Build a creative engine` → `/contact` |
| `seed` | `One idea` |
| `outputs` | `Film` `Reel` `Ad` `Social` `Story` `Landing` |

### The one normalisation

The source writes `doesn't` with a straight apostrophe. The site uses typographic apostrophes everywhere (`Let’s`, `We’ll`, `Things we’re building.`), and the source itself ships `doesn’t` in the Method block — so it contradicts itself and the site's convention wins. The shipped string is `doesn’t`.

### Written here, not recovered

`creativeCaption` is new prose:

> A diagram, not a showreel. It shows the shape of the system — one idea branching into the formats it can feed — not a client campaign, a published asset or a measured result.

It has the same job the Product Studio caption has: a fan of six output formats is precisely the shape a visitor would read as a showreel or a portfolio, and the house rule is that no client, no deliverable and no result may be implied. The source is explicit about this — *"Не создавать fake case studies."*

---

## 3. Which six formats

The source lists the fan three times:

| Pass | List | Items |
|---|---|---|
| A | `Campaign / Film / Reel / Static / Story / Ad / Landing page` | 7 |
| B | `FILM / REEL / AD / SOCIAL / STORY / LANDING` | 6 |
| C | `Film / Reel / Ad / Social / Story / Landing` | 6 |

B and C are identical. A is a different, longer list. **The six-item sequence ships**, because it is the one the source gives twice verbatim, and because the seventh and eighth items in A (`Campaign`, `Static`) are not lost — the block's own body copy names "ideas, **campaigns**, images, video and social content."

Order is fixed. The source never reorders the six; it only ever adds to them.

---

## 4. The accent surface — the second surface break on the page

The source gives this block three instructions and all three are about the surface:

> *"Light / experimental section."*
> *"Creative Engine получает отдельный immersive section."*
> *"Отдельный визуальный break. Фон / motion должен сильно отличаться от предыдущего блока."*

The block above it is Product Studio, which is black. So the break the source is asking for is **away from near-black, not further into it.** A full-bleed `--color-vibe` field satisfies all three readings at once:

- It is **light**, which is what the source says.
- It differs from the block above it **maximally** — black to acid green is the largest jump available in a palette with one accent.
- It uses the **brand's own accent**, whose stated job in the token block is "experiment / creative energy" — and this is the one block on the page whose subject *is* creative energy.

There is also a structural reason. With Product Studio black and this block black, three dark surfaces would have run consecutively — Product Studio, Creative Engine and the footer. That would have read as one long black region with the page's two most distinct offers inside it.

Measured on the field, `--color-vibe` `#c7ff3d`:

| Pair | Ratio | Verdict |
|---|---|---|
| `--color-black` on `--color-vibe` | **16.1:1** | passes AAA |
| `text-black/75` on `--color-vibe` | **7.8:1** | passes AAA |
| `text-black/70` on `--color-vibe` | **6.6:1** | passes AA |
| `--color-muted` on `--color-vibe` | 3.0:1 | **fails** — do not use it here |
| `--color-line` on `--color-vibe` | 1.2:1 | invisible |

### a. No `border-t`

As on Product Studio, the colour change *is* the separator. `--color-line` at 1.2:1 against the field would be a stray artefact.

### b. The header needs a `vibe` tone

`SectionHeader` had three tones. Neither `strong` nor `inverse` is right here: `strong`'s text colours are legible on the field (6.6:1 and 7.8:1 — the field is light, so the alphas do not have to change), but its **number/eyebrow divider** is `bg-line`, which is invisible on an accent field.

So the divider moved out of the JSX and into the tone map, and a fourth tone was added:

```ts
vibe: { meta: "text-black/70", description: "text-black/75", divider: "bg-black/40" },
```

`default`, `strong` and `inverse` all keep `bg-line`, so the three shipped tones render byte-identically to before.

### c. The button needs an `accent` variant

`primary` is `bg-black text-white hover:bg-vibe hover:text-black`. On a `--color-vibe` section the hover fills the button with the colour of the field, so the button **disappears under the cursor** and only its black label remains — it reads as plain text at exactly the moment the user is committing.

`accent` is `bg-black text-white hover:bg-white hover:text-black`: identical to `primary` at rest, so the CTA stays as strong as every other section's, and inverts to white on hover instead of dissolving.

### d. Selection has to flip

The global rule is `::selection { background: var(--color-vibe); color: var(--color-black) }`. On a `--color-vibe` field that marks selected text **in the colour of the field**, so selecting a paragraph would look like nothing happened.

`data-surface="vibe"` carries the fix:

```css
[data-surface="vibe"] ::selection {
  background-color: var(--color-black);
  color: var(--color-vibe);
}
```

Verified in the browser: `getComputedStyle(h2, '::selection').backgroundColor` on this section returns `rgb(17, 17, 17)`, not `rgb(199, 255, 61)`.

### e. The focus ring needs nothing — and that is worth stating

`data-surface="dark"` exists on Product Studio to flip the focus ring from black to white. This surface does **not** need the equivalent, because the global ring is `--color-black` and black on `--color-vibe` is 16.1:1. Stated explicitly so that a later reader does not add a `data-surface="vibe"` focus rule "for symmetry" and make the ring worse.

The audit confirms it: **missing focus rings 0** at all eight widths.

---

## 5. Visual concept

The source describes the diagram three times, and the shape is the same each time: one seed, and a fan of formats coming off it.

```text
              ONE IDEA

                  ↓

      ┌───────────┼───────────┐
      ↓           ↓           ↓

    FILM        REEL         AD

      ↓           ↓           ↓

    SOCIAL      STORY      LANDING
```

The source then adds: *"Но визуально это может быть гораздо свободнее."*

### The shape that ships

A seed block, a trunk drawn downward, and six stubs branching right to six chips:

```text
┌──────────┐
│ ONE IDEA │
└──────────┘
 │
 ├─── FILM
 ├─── REEL
 ├─── AD
 ├─── SOCIAL
 ├─── STORY
 └─── LANDING
```

The horizontal fan from the source's ASCII was **rejected deliberately**. A fan converging from one point to six columns needs each column to carry a different slice of the connecting line, and that geometry has to be recomputed at every breakpoint — 6 columns, then 3, then 2. The vertical trunk has **one** geometry that is correct at every width, and it is still literally the source's shape: one seed above, six outputs below.

It is also a different primitive from the Method rail three blocks up. Method is a continuous rail with a marker and a fill that grows; this is a tree that is *drawn* from a source. They do not read as the same object.

### Geometry — why the trunk is one line and not six

Each row owns its own slice of the trunk, and the slices abut into one continuous line. Nothing measures the list; the segments simply stack.

Two details make it exact:

- **The row carries no vertical padding.** The spacing lives on the chip's own `my-2` margin. If the padding were on the row, the branch column would stretch to include it and the stub — positioned at the branch column's `top-1/2` — would sit ~8px above the chip's centre. With the spacing on the chip, the row's height *is* the chip's margin box, so the branch column's centre and the chip's centre are the same line.
- **The last row's trunk is `height: 50%`.** Otherwise the trunk runs half a row past the final chip. Measured in the browser: the last trunk is `24px` against a `48px` column at 1440 and 768, and `24px` against `47px` at 390 — exactly half, at every width.

The stub is `aria-hidden` decoration. The chips carry the information.

### Colour

Everything on the field is black or the field itself. The seed is the only solid mass — `bg-black` with white type — and the six chips are outlines, so the diagram reads as *one solid source, six derived outputs* without any label saying so.

---

## 6. Data model

`data/creative-engine.ts` — the only source of truth for this block.

```ts
export type CreativeOutput = { id: string; label: string };

export const creativeOutputs: readonly CreativeOutput[] = [
  { id: "film", label: "Film" },
  { id: "reel", label: "Reel" },
  { id: "ad", label: "Ad" },
  { id: "social", label: "Social" },
  { id: "story", label: "Story" },
  { id: "landing", label: "Landing" },
];

export const creativeSeed = "One idea";
export const creativeEyebrow = "AI × CREATIVE";
export const creativeHeadline = "Your next creative team doesn’t sleep.";
export const creativeBody = "We build AI-powered content systems that …";
export const creativeCta = { label: "Build a creative engine", href: "/contact" } as const;
export const creativeCaption = "A diagram, not a showreel. …";
```

`label` is sentence case (`"Film"`); the CSS uppercases it. That is the same convention `studioStages` and `methodStages` use, so a future non-uppercase treatment is a CSS change rather than a data migration.

---

## 7. Component architecture

| File | Kind | Job |
|---|---|---|
| `data/creative-engine.ts` | module | All copy and the six formats |
| `components/home/CreativeEngine.tsx` | Server | The section: surface, header, CTA, grid |
| `components/home/CreativeEngineVisual.tsx` | **Client** | The diagram, and the in-view trigger |

**One client boundary.** `CreativeEngineVisual` is client purely for `useInView`. Everything else — the section, the header, the CTA, the copy — is server-rendered, so the block adds nothing to the client bundle beyond the diagram and one Motion hook.

The visual is a `<figure>`: `role="img"` with an `aria-label`, and a `<figcaption>` carrying the disclaimer. The `aria-label` has to carry **both** the content and the disclaimer, because `role="img"` makes the subtree presentational — the caption is not announced as part of the figure. So the label names the six formats *and* says it is not a campaign or a published asset.

---

## 8. Shared-component changes

Three, all backwards compatible.

| File | Change | Effect on shipped blocks |
|---|---|---|
| `components/ui/SectionHeader.tsx` | `SectionHeaderTone` gains `"vibe"`; the divider moves into the tone map | None — `default`, `strong` and `inverse` all still resolve to `bg-line` |
| `components/ui/Button.tsx` | `VARIANTS` gains `accent` | None — additive |
| `types/index.ts` | `ButtonVariant` gains `"accent"` | None — widening a union |
| `app/globals.css` | `[data-surface="vibe"] ::selection`; the `.ce-*` animation block | None — both are new selectors |

No token changed. No existing rule was edited. The accent colour was already in the palette; this block is the first to use it as a surface.

---

## 9. Layout

- Full-bleed `bg-vibe`, `text-black`, no `border-t`.
- `Container` + `hv-grid`, `gap-y-12`.
- Header: `col-span-4 md:col-span-8 lg:col-span-5`.
- Diagram: `col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7`.
- `py-section-lg` — this is a standalone block, not a nested one.

Measured section height: **748px** at 1440, **984px** at 768, **957px** at 390.

Below `lg` the two columns stack, header first, so the diagram always follows the CTA it belongs to.

---

## 10. Accessibility

| Requirement | How |
|---|---|
| Section is named | `aria-labelledby="creative-title"` → the `<h2>` |
| One `<h1>` on the page | Held — the audit reports `h1Count: 1` |
| Diagram has an accessible name | `role="img"` + `aria-label` naming the seed, all six formats, and the disclaimer |
| Diagram does not fake real work | The label and the caption both say so |
| Decorative connectors hidden | The trunk/stub column is `aria-hidden="true"` |
| Content survives without JS | The six chips rest at `opacity: 0.45`, not 0 |
| Focus is visible | Global black ring; 16.1:1 on this field. No override |
| Selection is visible | `data-surface="vibe"` flips it to black-on-vibe |
| Text meets AA | `text-black/75` 7.8:1, `text-black/70` 6.6:1, black 16.1:1 |
| Reduced motion | `data-shown` is true immediately; nothing animates |

**The chips keep a resting opacity floor.** The connectors are decorative and rest at `scaleY(0)` / `scaleX(0)` — but the six format labels are *content*, so they rest at `0.45` instead of `0`. If the in-view trigger never fires, the block degrades to a legible list of formats rather than an empty box. Same reasoning as `studio-stage` at `0.55` and `method-text`.

---

## 11. Motion

The source names the motion concept for this block. In the design-direction section it lists the concepts motion is allowed to express:

> **Chaos → Structure · Idea → Product · Input → Output · Manual → Automated · One → Many**

**"One → Many" is this block's diagram**, so the animation is that concept read literally, in four stages per branch:

1. The seed grows out of the corner the trunk attaches to (`transform-origin: bottom left`, so the two never drift apart).
2. The trunk's row segment scales down from the top (`scaleY`).
3. The stub extends rightward (`scaleX`), 110ms behind its trunk.
4. The chip slides in from the trunk, 190ms behind it.

Delays are derived from the row index in the component (`--d: index × 90ms`), not hand-tuned in CSS, so the drawing order and the list order cannot drift apart. Measured delays: `0 / 90 / 180 / 270 / 360 / 450ms`.

Only `opacity` and `transform` animate. No layout property, no MotionValue, no scroll listener.

Under `prefers-reduced-motion: reduce` the component sets `data-shown` immediately, so the whole thing is in its final state on the first paint and the global reduced-motion rule collapses the transitions to `0.01ms`.

---

## 12. Constraints

- No new dependency.
- No new route.
- No token change.
- No fabricated client, deliverable, metric, logo, award or price — in copy, in `aria-label`, or in a code comment.
- No `border-t`, no `border-line` anywhere in the section.
- No `<img>`; the diagram is CSS only. Every `<svg>` in the section is a 24px lucide icon (the CTA arrow).
- Typographic apostrophes in visible text.
- `--color-muted` must not be used on this surface (3.0:1).

---

## 13. Validation

Dev server, port 3200. Production build is blocked by the sandbox's bulk-delete guard; this is recorded as a limitation rather than reported as a pass.

### a. Responsive + passive a11y — 8 widths

`320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440`

```text
Horizontal overflow : none
Contrast failures   : none
Missing focus ring  : none
H1 count            : 1
Unnamed interactive : 0
```

`overflowX = 0` at every width, including 320.

### b. The diagram — a DOM probe, three passes

| Pass | Result |
|---|---|
| Normal motion, no scroll | `data-shown="false"`, chips `opacity 0.45 / translateX(-6px)`, trunk `scaleY(0)`, stub `scaleX(0)` |
| Normal motion, scrolled in | `data-shown="true"`, chips `opacity 1 / translateX(0)`, trunk `scaleY(1)`, stub `scaleX(1)` |
| Reduced motion, **no scroll** | `data-shown="true"` immediately, everything at final state |

The third pass is the one that matters: it proves the preference is read through `useMediaQuery`, not Motion's `useReducedMotion()`.

Geometry, measured in the browser:

```text
trunk height / column height, per row, at 1440:
  48/48  48/48  48/48  48/48  48/48  24/48
```

Five full-height segments and a half-height last one — the trunk ends exactly at its own stub.

### c. Content assertions — 47/47

Scoped to `#creative-engine` in the served HTML, tags stripped before asserting on text. Covers: structure and surface, the copy verbatim (including the typographic apostrophe), the six formats in order inside the `<ol>`, the seed rendered once, the decorative connectors hidden, the CTA target and variant, the accessible name, and every "nothing fabricated" rule.

Two assertions worth naming:

- **"CTA never hovers to the field colour"** — reads the anchor's own class list and fails if `hover:bg-vibe` appears. This is the specific bug `accent` exists to prevent, so it is asserted rather than assumed.
- **"no fabricated numbers in the copy"** — strips the section's own `08` index first, then asserts. Without that strip the check trips on a digit a user is supposed to read, which is the trap the audit skill records.

### d. Page-wide

| Check | Result |
|---|---|
| Routes and anchors (`hv-links`) | 6/6, every internal link and anchor resolves |
| Static-page copy (`hv-pages-copy`) | 151/151 |
| Console | 1 message — `[HMR] connected` |
| Heading outline | Correct; the new `<h2>` is last |
| Anchor chain | `trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases → method → product-studio → creative-engine` |

### e. Lint and typecheck

- `tsc --noEmit` → exit 0.
- `eslint` with the **full** config over all eight changed/new files → exit 0.

### f. One assertion that was wrong, not the page

The first draft of the CTA check was `/class="[^"]*bg-black[^"]*"/` against the whole section — which the **seed block** satisfies, since the seed is also `bg-black`. It would have passed even if the button had shipped with the wrong variant. It now targets the `<a href="/contact">` tag specifically and asserts the negative as well. Same family as the other four assertions this project has recorded: when a check is weak, it fails silently rather than loudly.

---

## 14. Definition of Done

- [x] `data/creative-engine.ts` with all copy verbatim and the six formats fixed.
- [x] `CreativeEngine.tsx` — server component, `#creative-engine`, `aria-labelledby`.
- [x] `CreativeEngineVisual.tsx` — the only client boundary.
- [x] Full-bleed `--color-vibe`, no `border-t`, no `border-line`.
- [x] `SectionHeader` tone `vibe`; `Button` variant `accent`; `data-surface="vibe"` selection flip.
- [x] `.ce-*` animation block; delays derived from the row index.
- [x] Wired into `app/page.tsx` after `ProductStudio`.
- [x] 8-width audit clean; three-pass probe correct; 47/47 content; 6/6 routes; 151/151 page copy; console clean.
- [x] `tsc` and `eslint` (full config) clean.
- [x] Committed `feat:` + this pack as `docs:`.

---

## 15. Deferred

- **The production build.** Blocked by the sandbox's bulk-delete guard, as for every block since Method. Verification is against the dev server and is reported as such.
- **A real content-system diagram.** If HelloVibe ever has a real creative system to show, this diagram is where it would go — behind the same rule as Cases: real work or nothing.
- **`Campaign` and `Static`.** Two formats the source names once and never repeats. Not rendered; they are in the body copy's orbit and can be added to `creativeOutputs` without touching layout, since the trunk geometry is index-driven.

---

## 16. Do not overbuild

- Do not add a second accent surface to prove the `vibe` tone generalises. One block uses it.
- Do not add an SVG fan. The trunk is correct at every width; the fan is not.
- Do not give the chips hover states. They are not interactive.
- Do not animate the connectors with a scroll listener. The in-view trigger is enough, and a scroll listener would put work on the main thread for a decoration.
- Do not "fix" `--color-muted`. It is a fixed brand token; this block simply does not use it.

---

## 17. Commit

```text
6ccac42  feat: add creative engine section
```

Eight files, 367 insertions, 7 deletions. Three new (`CreativeEngine.tsx`, `CreativeEngineVisual.tsx`, `data/creative-engine.ts`), five modified (`globals.css`, `page.tsx`, `Button.tsx`, `SectionHeader.tsx`, `types/index.ts`).

---

## 18. Open questions

1. **The accent as a surface.** This is the first block to use `--color-vibe` as a background rather than as an accent. If it reads as too loud in review, the fallback is the warm background with the accent kept to the seed block and the chips — the diagram works either way, and the tone map already supports it. Worth a look before blocks 11–14 settle.
2. **Six formats, seven names.** The source's own third pass adds `Campaign` and `Static`. The six-item list ships because it is the majority reading, but if the intent was the longer list, this is a one-line data change.
