# HelloVibe — Product Studio Implementation Pack v0.1

## Purpose

Implement **Section 09 — AI PRODUCT STUDIO** as a homepage block after Method.

It is the block that answers the question a founder actually arrives with: *I have an idea — can you build it, and how does that go?* Everything above it describes how HelloVibe thinks; this is the first block that describes what it **makes**.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Method, Creative Engine, Why HelloVibe, Engagement Models, FAQ, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency. Product Studio is a homepage block, a `data/` module and one CSS block. Nothing else.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Method, Cases, AI Audit, Trust Strip, Product Journey and Static Pages packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`07`** — continuing the visitor-visible sequence (AI Gap `01` … Method `06`) | `09`, the block's position in the full 15-item page order. The source's own internal index is `09`/`10` depending on which document you read. See §1 |
| 2 | Surface | **Dark**, as the source states outright | Light, to keep the page uniform — rejected, the source asks for a break and the Creative Engine block after it needs one too |
| 3 | MWP | **Expanded inline** to `Minimum Working Product` | Printing the bare acronym. See §3 — this is the block's single most load-bearing idea |
| 4 | MVP | **Also expanded**, to `Minimum Viable Product` | Expanding only MWP, which would leave the contrast between the two terms unexplained |
| 5 | Visual | **Abstract CSS shapes** — a frame that firms up from wireframe to interface | A demo interface. The source permits one only where it is *visually obvious* it is a demo, and the house rule in `ServiceVisual` is already "shapes, not pictures" |
| 6 | Journey layout | **A labelled grid**, not a rail | A vertical rail — Method directly above this block already owns that shape |
| 7 | The frame's build | **Six layers keyed to the six stages** | One generic fade-in. See §5 |
| 8 | Header layout | **Single column, diagram beside it** | Split title/description like Services — but that shape is for blocks with a supporting line, and this one's line belongs under its heading, above its CTA |
| 9 | `border-t` | **None** | Every other block has one, but here the colour change *is* the separator; a warm-grey rule across black is an artefact, not a rule |

---

## 1. Section position and anchor

Product Studio is the **ninth** item in the source's page order — confirmed twice, independently:

```text
5. Product Journey   6. AI Audit   7. Cases   8. Method
9. AI Product Studio  10. AI Creative Engine  11. Why HelloVibe  …
```

Its `number` prop is `"07"`, not `"09"`, because the on-page numbering counts **content sections only** — Hero and Trust Strip carry no index, and Navbar and Footer are chrome:

```text
The AI gap 01 · What we do 02 · One partner. Every stage. 03
· Find your best AI opportunities. 04 · Things we're building. 05
· Think first. Build fast. Learn constantly. 06
· Let's turn it into something people can use. 07
```

Three schemes exist in the source (this block is `09` in the page order, `10` in one document's own numbering, and `09` in another's). Three is one too many; the implemented one is the only one a visitor can see.

- Anchor: **`#product-studio`**, exported as `STUDIO_SECTION_ID`.
- Heading: `aria-labelledby="studio-title"`.
- **No `border-t`.** See §4.

---

## 2. Approved copy

Every prose string is **verbatim from the source**, with one normalisation.

| Field | Value |
|---|---|
| Number | `07` |
| Eyebrow | `Have an idea?` |
| H2 | `Let’s turn it into something people can use.` |
| Body | `From the first product hypothesis to a working MWP, MVP and beyond — we bring product, design, AI and engineering under one roof.` |
| CTA | `Build my product` → `/contact` |

### The six stages

| # | Label | Gloss |
|---|---|---|
| 01 | Idea | — |
| 02 | Discovery | — |
| 03 | Prototype | — |
| 04 | MWP | Minimum Working Product |
| 05 | MVP | Minimum Viable Product |
| 06 | Scale | — |

The source gives the sequence four separate times (`IDEA → DISCOVERY → PROTOTYPE → MWP → MVP → SCALE`) and never varies it, so the order is fixed.

### The one normalisation

The source's apostrophe in `Let's` is **straight** (U+0027). It ships here as **typographic** (U+2019), because every other visible string on the site uses the typographic form — `Things we’re building.`, `doesn’t`, `We’ll`, `don’t`. The source itself is inconsistent on this point: it writes `doesn't` straight in the Method block and that already ships as `doesn’t`. The site's convention wins over the source's inconsistency.

### Written here, not recovered

**The caption** is the only authored string in the block:

> A diagram, not a screenshot. The frame shows how a product firms up from wireframe to working interface — no real product, no client work, and no metrics are depicted.

It exists to do one job the source only implies — see §5.

---

## 3. The MWP decision

This is the block's single most interesting editorial call, so it is worth stating plainly.

The source copy contains **two unexplained acronyms**:

> From the first product hypothesis to a working **MWP**, **MVP** and beyond…

A visitor reads that and has no idea what either means. The source, elsewhere, is emphatic that MWP is a term HelloVibe wants to own, and spends several paragraphs distinguishing it from the industry-standard MVP:

```text
### MVP:
> Minimum Viable Product

### MWP:
> Minimum Working Product

«За 4–8 недель мы не строим идеальный продукт. Мы создаём работающую
версию, которую уже можно дать реальным пользователям.»
```

So the block prints both expansions, under the two stages that carry them. This is **recovered copy, not invented** — the definitions come from the source verbatim. Without them the journey ends in two opaque three-letter codes and the distinction the studio is built on is invisible.

**Deliberately not done:** no definition *paragraph*. The source has a whole section on MWP; importing it would turn a six-step journey into a lecture, and the block's job is to make the offer legible, not to teach the category.

---

## 4. The dark surface — the first one on the page

The source is explicit: **"Dark section."**

Every block before this one sits on `--color-bg`. So this is the first surface change on the page, and it has consequences that are easy to miss:

### a. No `border-t`

Every other block carries `border-t border-line` along its top edge. Here the colour change *is* the separator. A 1px warm-grey rule across the top of a black section would read as a stray artefact rather than a rule.

### b. The header needs an inverse tone

`SectionHeader`'s two existing tones are both built for light surfaces — `default` is `--color-muted` (3.2:1 on the warm background, already failing AA) and `strong` is `text-black/70`. Neither is legible on black.

A third tone was added:

```ts
inverse: { meta: "text-white/70", description: "text-white/75" }
```

**9.05:1** and **11:1** on `--color-black`, measured — see §13.

### c. The button needs an inverse variant

`Button`'s `secondary` variant is `border border-line text-black`. On black both the border and the label vanish. A third variant was added:

```ts
inverse: "bg-white text-black hover:bg-vibe hover:text-black"
```

`ButtonVariant` in `types/index.ts` gained `"inverse"` alongside it.

### d. The focus ring has to flip

This is the one that would have shipped as a real accessibility bug. The global rule is:

```css
:focus-visible { outline: 2px solid var(--color-black); }
```

On a `--color-black` section that ring is **invisible**. The fix is scoped to the surface, not to the tokens, so no brand colour changes:

```css
[data-surface="dark"] :focus-visible,
[data-surface="dark"] a,
[data-surface="dark"] button, … {
  outline-color: var(--color-white);
}
```

The section carries `data-surface="dark"`. The Creative Engine block will need the same hook.

### e. One temporary consequence

Right now Product Studio is the **last** block on the page, immediately followed by the dark Footer. Two adjacent black surfaces merge, so the block currently reads as part of the footer rather than as its own section.

**This resolves on its own** when block 10 (Creative Engine) lands between them. It is recorded here so nobody mistakes it for a styling bug in this block.

---

## 5. Visual concept

The source gives two instructions that have to be satisfied at once:

```text
Visual:  Product UI fragments. Wireframe → prototype → polished interface.
         Можно использовать fake/demo interface только если визуально
         очевидно, что это demo.

Technical:  HTML/CSS and lightweight Motion. No external video.
            Animate active stage on scroll.
```

### Shapes, not a screenshot

The constraint "only if it is visually obvious that it is a demo" is satisfied the same way `ServiceVisual` already satisfies it — by never drawing an interface at all. The frame is abstract: bars, blocks and rules, no text inside it, no window chrome that could be mistaken for a real app, no data.

Three things enforce that:

1. The diagram is `role="img"` with an `aria-label` that ends *"Illustrative diagram, not a screenshot of a real product."*
2. A visible `figcaption` says the same thing in the studio's own voice.
3. The harness asserts the diagram subtree contains **no `<svg>` and no `<img>`** — it is pure CSS boxes.

### The frame is keyed to the journey

The build is not a generic fade-in. Each of the frame's **six layers** is tied to one stage:

| Stage | What arrives |
|---|---|
| Idea | window chrome |
| Discovery | sidebar rows |
| Prototype | the hero block, still **dashed** — the wireframe |
| MWP | two content blocks, now **filled** |
| MVP | the one `vibe` accent |
| Scale | the row of repeated frames |

That is what makes the frame read as *firming up* rather than simply appearing, and it is why the delays are derived from the stage index in the component rather than being hand-tuned in CSS — the frame and the stage list cannot drift apart.

### The journey is a grid, not a rail

Method, directly above, already owns the vertical rail with a filling line. A second rail immediately below it would read as one very long section. So the journey here is a compact labelled grid — 2 columns on mobile, 3 from `sm` — with a `vibe` node per stage.

### Colour

| Element | Resting | Shown |
|---|---|---|
| Frame layers | `opacity: 0.28` | `1` |
| Stage items | `opacity: 0.55` | `1` |
| Stage nodes | `bg-white/30` | `bg-vibe` (`#c7ff3d`) |
| Accent bar | `bg-white/30` at 0.28 | `bg-vibe` at 1 |

The resting opacity is **a floor, not zero** — the same choice `audit-row` and `method-text` make. The faint ghost reads as the wireframe the frame starts from, and the diagram stays legible if the in-view trigger never fires.

---

## 6. Data model

`data/product-studio.ts`:

```ts
export type StudioStage = {
  id: string;
  label: string;   // "Discovery" — sentence case, uppercased by CSS
  gloss?: string;  // only MWP and MVP carry one
};

export const studioStages: readonly StudioStage[];
export const studioEyebrow = "Have an idea?";
export const studioHeadline = "Let’s turn it into something people can use.";
export const studioBody = "From the first product hypothesis to a working MWP, MVP and beyond — …";
export const studioCta = { label: "Build my product", href: "/contact" } as const;
export const studioCaption = "A diagram, not a screenshot. …";
```

`gloss` is **optional and sparse** — two of six stages. That is deliberate: it marks the two acronyms that need explaining without turning the list into a glossary.

---

## 7. Component architecture

```text
app/page.tsx
└── <ProductStudio />                Server Component   components/home/ProductStudio.tsx
    ├── <SectionHeader tone="inverse"/>  Server        components/ui/SectionHeader.tsx
    ├── <ButtonLink variant="inverse"/>  Server        components/ui/Button.tsx
    └── <ProductStudioVisual />       Client Component   components/home/ProductStudioVisual.tsx
```

- **`ProductStudio`** is a Server Component: section shell, header, CTA.
- **`ProductStudioVisual`** is the only thing in the client bundle, and only for the in-view trigger. There is no local `StudioLayer` child — the layers are markup, not components, because none of them has behaviour.

---

## 8. Shared-component changes

Three small, backward-compatible additions. All defaults are unchanged, so no existing call site moved.

| File | Change |
|---|---|
| `types/index.ts` | `ButtonVariant` gains `"inverse"` |
| `components/ui/Button.tsx` | `VARIANTS` gains `inverse` |
| `components/ui/SectionHeader.tsx` | `SectionHeaderTone` gains `"inverse"`; `TONES` gains the entry |
| `app/globals.css` | `[data-surface="dark"]` focus-ring override + the studio animation block |

This is the same pattern the `strong` tone followed when the AI Gap and Services blocks needed AA-compliant headers: extend the shared component with an opt-in value rather than forking a private copy in the section.

---

## 9. Layout

**Desktop (`lg`)** — `hv-grid`, header in `col-span-5`, diagram in `col-span-6 col-start-7`.

**Tablet** — both full width (`md:col-span-8`), header above diagram.

**Mobile** — stacked. The journey drops to 2 columns; the two glosses wrap to two lines each and the grid row height absorbs it.

**Frame internals** — a chrome row, then a two-column body (sidebar `2.75rem` → `5rem` at `sm`, content `1fr`), then the repeated-frames row. Heights step up at `sm` so the frame does not look cramped on a phone.

---

## 10. Accessibility

- Landmark: `<section aria-labelledby="studio-title">` pointing at the H2's `id`.
- The diagram is `role="img"` with a **full descriptive `aria-label`**, because that string is the *only* thing a screen reader gets. It expands both acronyms so a screen reader never hears a bare `MWP`.
- The journey is a real `<ol>` with six `<li>` — the sequence is semantic, not just visual.
- All frame decoration is `aria-hidden="true"`.
- The caption is a `<figcaption>`, outside the `role="img"` subtree, in sentence case and the body face — the diagram is an artefact, the caption is the studio speaking.
- Contrast, measured against the **composited** background: `text-white/70` **9.05:1**, `text-white/50` **5.28:1**, `text-white/75` **11:1**. All clear AA.
- Focus ring flips to white on this surface — see §4d.

---

## 11. Motion

The established `data-shown` pattern:

```tsx
const inView = useInView(ref, { once: true, amount: 0.25 });
const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
const shown = Boolean(reducedMotion) || inView;
```

`useMediaQuery` rather than Motion's `useReducedMotion()`: the latter resolves at module load, so on a reduced-motion client it is already `true` on the first render while the server rendered `false` — a hydration mismatch on the `data-shown` attribute. This is the third block to hit that trap; the hook in `lib/media-query.ts` exists because of it.

**Stagger:** `--d: index * 130ms`, so the six beats land at 0/130/260/390/520/650ms. Both the frame layers and the stage items read the same index, which is what keeps them in sync.

**Reduced motion:** `shown` is `true` immediately, and the global `transition-duration: 0.01ms` collapses every beat — the diagram is in its finished state without ever being scrolled to. Verified, not assumed (§13b).

---

## 12. Constraints

- No new dependency. `useInView` comes from the already-present `motion/react`; the arrow icon is the existing `lucide-react`.
- No new design token. `--color-vibe`, `--color-white`, `--color-black` only.
- The eight earlier anchors are unchanged.
- `data/product-studio.ts` holds copy only.
- The section adds no `<h1>`; the page still has exactly one.

---

## 13. Validation

Run against `http://localhost:3200/`.

> **Harness note.** Background tasks run in a separate network namespace from the tool that starts them, so a dev server started with `run_in_background` is unreachable from a later `curl`. Every check below was run **inside the same shell invocation** that started the server, and the server was stopped afterwards.

### a. Responsive + passive a11y — 8 widths

```text
320px  overflowX=0  h1=52px      nav=true
375px  overflowX=0  h1=52px      nav=true
390px  overflowX=0  h1=52px      nav=true
430px  overflowX=0  h1=52px      nav=true
768px  overflowX=0  h1=61.792px  nav=true
1024px overflowX=0  h1=73.056px  nav=true
1280px overflowX=0  h1=84.32px   nav=true
1440px overflowX=0  h1=88px      nav=true

Horizontal overflow : none
Contrast failures   : none
Missing focus ring  : none
H1 count            : 1
Unnamed interactive : 0
```

### b. The diagram — a DOM probe, two passes

**Pass 1 — normal motion**

```text
before scroll: shown=false  layerOpacities=[0.28 ×7]   ← genuinely gated, floor holding
after scroll:  shown=true
  layer delays   : 0/130/260/390/390/520/650ms   ← the two filled blocks share beat 3
  layer opacities: [1 ×7]
  stage delays   : 0/130/260/390/520/650ms
  stage opacities: [1 ×6]
  node colours   : rgb(199,255,61) ×6            ← --color-vibe
```

**Pass 2 — `prefers-reduced-motion: reduce`, never scrolled**

```text
shown=true  layerOpacities=[1 ×7]  node colours=[rgb(199,255,61) ×6]
```

Nothing is gated behind the animation.

### c. Content assertions — 37/37

`hv-studio-copy.mjs` asserts the exact copy, the six stages **in the source's order**, both glosses appearing exactly once, the CTA target, `role="img"` + disclaimer, the caption, and the negatives: no `<img>`, no `<svg>` inside the diagram, no fabricated numbers, no `%`, no client or sector name, no "logo", no award, no price, no duplicate anchor.

### d. Page-wide

```text
hv-links.mjs        6/6 pages; every internal link and anchor resolves
hv-pages-copy.mjs   151/151
console             1 message: [HMR] connected — no errors, no hydration warnings
anchors             trust → the-ai-gap → what-we-do → how-we-work
                    → ai-audit → cases → method → product-studio
outline             … → H2 Think first. … → H2 Let's turn it into something people can use.
```

### e. Lint and typecheck

- `tsc --noEmit` → **0**.
- ESLint with the **full config, React Compiler rules included**, on all seven changed files → **exit 0**.
- Per-directory sweep (`app`, `components`, `data`, `lib`, `types`) → **all five exit 0**.

### f. Two tooling false failures, and the real bug they hid

**The audit reported two contrast failures at exactly `1:1`** for `text-white/70` and `text-white/50` in the diagram. A ratio of 1 means the two colours are identical, which is never what a page looks like — so the measurement was the suspect, and it was wrong.

The cause was a real bug in the audit script, now fixed: `effectiveBg()` returned the **first non-transparent background layer** and stopped. The nearest layer here is `bg-white/[0.03]` on the diagram wrapper; taken at face value it resolves as near-white, and white text on near-white is 1:1. It never composited that 3% wash over the `bg-black` behind it.

The fix composites the whole layer stack outermost-first. The report now carries both the composited colour and the raw `bgLayers`, and the same run reports **zero contrast failures**.

**Three of my own assertions were also wrong** before they were right, all in the same family as the traps the audit skill already records:

1. `no border-t on the section` scanned the whole subtree and matched `border-t` on the diagram's own rows. Scoped to the section's opening tag.
2. `stages are in the source's order` used `indexOf` over the section text, so it found `MWP` and `MVP` first in the **body paragraph** ("a working MWP, MVP and beyond") and declared the order broken. Scoped to the `<ol>`.
3. `no oversized graphic` used `/<svg[^>]*width="(?!24")/`, which matched every icon — because **`stroke-width="2"` also contains `width="`**, so the lookahead saw `2"` and passed. Replaced with a check that reads each `<svg>`'s own width attribute.

In all three cases the page was right and the check was wrong. That is now four times on this project that a failing assertion turned out to be the assertion — treat it as the default hypothesis.

---

## 14. Definition of Done

- [x] `data/product-studio.ts` exists with the six stages, the glosses and the copy.
- [x] `components/home/ProductStudio.tsx` exists and is a Server Component.
- [x] `components/home/ProductStudioVisual.tsx` exists and is the only client component.
- [x] `app/page.tsx` renders `… → Method → ProductStudio`.
- [x] The section carries `id="product-studio"`, `aria-labelledby="studio-title"` and `data-surface="dark"`.
- [x] The H2 is `Let's turn it into something people can use.`
- [x] The six stages render as an `<ol>` in the source's order.
- [x] `MWP` and `MVP` are both expanded.
- [x] The CTA points at `/contact`.
- [x] The diagram is `role="img"` with a disclaimer in its accessible name, and a visible caption.
- [x] No fabricated number, metric, client, logo, award or price anywhere in the block.
- [x] The focus ring is visible on the dark surface.
- [x] The eight earlier anchors are unchanged.
- [x] `tsc --noEmit` clean; lint clean on all five directories.
- [x] Browser verification in §13 passes, including the reduced-motion path.
- [ ] Production build exit — still blocked in this sandbox (§15).

---

## 15. Deferred

- **The production build's final cleanup.** It compiles, typechecks and prerenders, then the sandbox's bulk-delete guard stops Next's exit-time cleanup of stale `distDir` folders. Unchanged from the previous blocks and documented in the environment skill.
- **The dark-surface adjacency.** Product Studio and the Footer merge until block 10 exists. See §4e.
- **A definition paragraph for MWP.** See §3.
- **Block 10 — AI Creative Engine.** The next block in page order.

---

## 16. Do not overbuild

Not in this task:

- a real or semi-real demo interface inside the frame;
- a scroll-linked scrub for the frame (the staggered reveal is enough, and the source's "animate active stage on scroll" is satisfied by it);
- per-stage icons or illustrations;
- a horizontal rail, or any second rail;
- interactivity on the stages — they are not links and not controls;
- a light variant of the dark section;
- animation on the header or the CTA;
- a CMS field for the journey.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 17. Commit

Two commits:

```text
feat: add product studio section
docs: add product studio implementation pack
```

---

## 18. Final response format

Report:

1. the files created and changed, including the three shared-component additions;
2. the copy, quoted, noting the one apostrophe normalisation;
3. the MWP decision and why both acronyms are expanded;
4. the dark surface's four consequences, **especially the focus ring**;
5. the audit results at all eight widths;
6. the diagram probe results, both passes;
7. the content assertion count and the page-wide checks;
8. lint and typecheck status;
9. **the contrast false failure and the audit-script bug it exposed** — this is the most transferable finding in the block;
10. §19.

---

## 19. Open questions

1. **The MWP glosses are an editorial addition, not a request.** The source never asks for them in this block. If the intent is that visitors should already know MWP, they should come out — but then the journey ends in two opaque codes. This is the one place to push back.
2. **The caption is authored.** It is the only string in the block not recovered from the source. Its job is to stop the frame reading as a real screenshot; if the wording is wrong, that protection weakens.
3. **Three numbering schemes, again.** See §1. If the intent was ever the source's own indices, every block's `number` prop is wrong by design and that is a page-wide decision.
4. **The dark-surface adjacency.** Until block 10 lands, this section and the Footer are one continuous black area. Worth re-checking once Creative Engine exists — if the Creative Engine block is also dark, the three will need explicit separation.
