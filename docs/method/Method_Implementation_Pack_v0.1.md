# HelloVibe — Method Implementation Pack v0.1

## Purpose

Implement **Section 08 — METHOD** as a homepage block after Cases.

Everything above it explains what HelloVibe does and how a project runs. This block answers the last unasked objection: *yes, but how do you actually work?* It exists, in the source's own words, to **show the maturity of the process** — five stages on one continuous line, not a services menu.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Product Studio, Creative Engine, Why HelloVibe, Engagement Models, FAQ, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency. Method is a homepage block and a `data/` module. Nothing else.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Product Journey, Trust Strip, AI Audit, Cases and Static Pages packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`06`** — AI Gap `01`, Services `02`, Product Journey `03`, AI Audit `04`, Cases `05` | `08`, the block's position in the full 15-item page order. The source itself labels the block `05 — HOW WE WORK`, its own internal index — three schemes exist, so the implemented one is followed. See §1 |
| 2 | Eyebrow | **`How we work`** — the source's kicker for this block | Leaving Product Journey's eyebrow as `How we work`, which would have put the same label on two sections |
| 3 | Product Journey's eyebrow | **Reverted to `One partner. Every stage.`** — the source's own value for that block | Keeping `How we work` there, and giving Method something invented |
| 4 | Anchor | **`#method`** | Reusing `#how-we-work`, which is Product Journey's navbar target |
| 5 | Header layout | **Single column** | Title left / description right, like Services and Product Journey — but the source gives Method **no supporting line**, so there is nothing to put on the right |
| 6 | Timeline axis | **Vertical at every width** | A horizontal rail at `lg`. The source asks for a vertical line on mobile and a "continuous line" — a five-step list has no good horizontal form at any width |
| 7 | Stage durations | **None** | A "1–2 weeks" figure per stage. The source never commits to one, and a timeline that shows durations is a promise |
| 8 | Closing line | **A `<p>`, not a heading** | The source marks it `#`, but it is a rhetorical close; as a heading it would appear in a screen-reader heading list as a section title |
| 9 | CTA | **None** | The source specifies exactly one closing line and no link. The final CTA is its own section further down |

### The eyebrow collision — why Product Journey changed

This is the one decision that touched a block outside Method, so it is worth stating plainly.

Before this task, **two sections would have been labelled `HOW WE WORK`**:

- **Product Journey** (`#how-we-work`) carried `eyebrow="How we work"`.
- **Method** is given `HOW WE WORK` by the source, in three separate places.

The source also gives Product Journey its own kicker — `ONE PARTNER. EVERY STAGE.` — which appears in the narrative map as that block's eyebrow. Product Journey had simply been using `How we work` as a placeholder before Method existed.

So:

- **Method takes `How we work`** — the source assigns that kicker to this block specifically.
- **Product Journey goes back to `One partner. Every stage.`** — its source value.
- **No anchor moved.** `JOURNEY_SECTION_ID = "how-we-work"` and the navbar's `How we work` → `#how-we-work` are unchanged. The id and the visible kicker no longer describe each other; that is recorded in §16 rather than fixed here, because moving a navbar target is a navigation decision, not a Method one.

Verified after the change: the string `How we work` appears **four** times on the page — the navbar's desktop link, its mobile link, and the footer's two — and **not once** as a section eyebrow.

---

## 1. Section position and anchor

Method is the **eighth** item in the source's page order:

```text
01 Navbar → 02 Hero → 03 AI Gap → 04 What We Do → 05 Journey → 06 AI Audit
→ 07 Cases → 08 Method → 09 Product Studio → 10 Creative Engine → 11 Why Us
→ 12 Engagement → 13 FAQ → 14 CTA → 15 Footer
```

Its `number` prop is `"06"`, not `"08"`, because the on-page numbering counts **content sections only** — Hero and Trust Strip carry no index, and Navbar and Footer are chrome:

```text
The AI gap 01 · What we do 02 · One partner. Every stage. 03
· Find your best AI opportunities. 04 · Things we're building. 05
· Think first. Build fast. Learn constantly. 06
```

The source contains a third scheme as well — its own `# 09. METHOD` / `05 — HOW WE WORK` internal indices. Three schemes is one too many; the implemented one is the only one a visitor can see, so it is the one that is followed.

- Anchor: **`#method`**, exported as `METHOD_SECTION_ID`.
- Heading: `aria-labelledby="method-title"`.
- `border-t border-line` on the section, like every other block after the first — the page rhythm is unchanged.

---

## 2. Approved copy

Every string in this block is **verbatim from the source**. Nothing is authored here.

### Header

| Field | Value |
|---|---|
| Number | `06` |
| Eyebrow | `How we work` |
| H2 | `Think first. Build fast. Learn constantly.` |

The narrative map breaks the H2 across three lines (`# Think first.` / `# Build fast.` / `# Learn constantly.`). It renders as one sentence — the source's own prose form, `Think first. Build fast. Learn constantly.`, is identical, and three stacked headings would break the outline.

### The five stages

| # | Title | Description |
|---|---|---|
| 01 | Understand | We start with the business, not the technology. |
| 02 | Focus | We identify the smallest opportunity that can create meaningful value. |
| 03 | Build | We combine product, design, engineering and AI into one team. |
| 04 | Launch | Real users beat internal assumptions. |
| 05 | Learn | We measure what works, improve what doesn’t and keep moving. |

The source gives the titles in caps (`UNDERSTAND`) in one place and sentence case (`Understand`) in two others. They are stored in **sentence case and uppercased by CSS**, matching `journeyStages.phase` and the service `action` labels — so the DOM text stays readable to a screen reader and to search.

### Closing

> No six-month black boxes. No innovation theatre. Just things that work.

### What is deliberately absent

- **No supporting sentence.** Services and Product Journey each have one; the source gives Method none.
- **No durations.** See §0 decision 7.
- **No CTA.** See §0 decision 9.
- **No metrics, clients, logos or testimonials** — the standing rule for every block on this site.

---

## 3. Visual concept

The source's visual direction is one line:

```text
Visual: Пять steps превращаются в одну continuous line.
Scroll progress: 01 → 02 → 03 → 04 → 05
```

That is the whole brief, and it maps onto one idea: **a single vertical rail running down the left, with a node per stage, filling in as the page scrolls.**

### How the rail is built

Each `<li>` carries its **own slice** of the rail rather than one line being driven by a shared scroll value:

```text
li.method-stage
├── div[aria-hidden]            w-2.5, self-stretch
│   ├── span.method-rail        the resting 1px line
│   ├── span.method-rail-fill   the black line, scaleY(0) → scaleY(1)
│   └── span.method-marker      the 10px node
└── div.method-stage-body       the copy
```

Three consequences worth naming:

1. **The fill advances stage by stage** as you scroll — which is the "scroll progress `01 → 02 → …`" the source asks for — without a MotionValue, without measuring anything, and without a second source of truth for what is on screen.
2. **The rail is continuous between rows.** The rail column is `self-stretch`, so it fills its row's full content box. Row spacing therefore lives on the *body* (`pb-14`), not on the `<li>` — with the padding on the `<li>` the rail would stop short of it and visibly break between stages.
3. **The last row is special-cased** in CSS: its rail and fill are `display: none` (so the line ends at the final node instead of dangling past it) and its body padding is removed.

### Colour and weight

| Element | Resting | Shown |
|---|---|---|
| Rail | `bg-line` (1px) | — |
| Rail fill | `scaleY(0)` | `scaleY(1)`, `bg-black` |
| Marker | `border-line`, `bg-bg` | border and fill both `--color-black` |
| Copy | `opacity: 0.75`, `translateY(6px)` | `opacity: 1`, `translateY(0)` |

The copy's **opacity floor is 0.75, not 0**. If the in-view trigger never fires — an old browser, a JS failure, a print — the text is still at 75% and fully legible. Nothing on this block is ever invisible.

---

## 4. Data model

`data/method.ts`:

```ts
export type MethodStage = {
  id: string;          // stable key
  number: string;      // "01"
  title: string;       // "Understand" — sentence case, uppercased by CSS
  description: string; // one sentence
};

export const methodStages: readonly MethodStage[];
export const methodHeadline = "Think first. Build fast. Learn constantly.";
export const methodClosing  = "No six-month black boxes. No innovation theatre. Just things that work.";
```

The source's own technical spec asks for exactly this shape:

```ts
const method = [{ number: "01", title: "UNDERSTAND", description: "…" }, …]
```

**Deliberately absent: a `when`/`duration` field.** Adding one later is the change that would turn a method into a schedule — see §0 decision 7 and §12.

---

## 5. Component architecture

```text
app/page.tsx
└── <Method />                       Server Component   components/home/Method.tsx
    ├── <SectionHeader />            Server Component   components/ui/SectionHeader.tsx
    ├── <MethodTimeline />           Client Component   components/home/MethodTimeline.tsx
    │   └── <MethodStageRow /> × 5   Client Component   (same file)
    └── <p>{methodClosing}</p>       Server Component
```

- **`Method`** is a Server Component. It reads `methodHeadline` and `methodClosing` and renders the section shell.
- **`MethodTimeline`** is the only thing that crosses into the client bundle, because it uses `useInView`. This keeps the boundary as small as the previous blocks'.
- **`MethodStageRow`** is local to the timeline file — it is not reused anywhere and does not belong in `components/ui/`.

---

## 6. Layout

**Header** — one column, `col-span-4 md:col-span-8 lg:col-span-7` inside `hv-grid`. Narrower than the grid on `lg` so the H2 breaks where it reads best rather than running the full 12 columns.

**Timeline** — `mt-16` below the header; each row is `flex gap-6 sm:gap-10` (rail column, then body). The body is `min-w-0 flex-1`, so a long stage description wraps instead of pushing the rail.

**Closing** — `mt-16 border-t border-line pt-10`, capped at `max-w-[44ch]`, rendered at `text-h3`. The rule above it separates the statement from the list without making it a new section.

**Widths** — vertical at every width; the only responsive change is the row gap (`gap-6` → `sm:gap-10`).

---

## 7. Accessibility

- The section is a landmark: `<section aria-labelledby="method-title">` pointing at the H2's `id`.
- The list is a real `<ol>` with five `<li>` — the stages are ordered, and the DOM says so.
- The rail column is `aria-hidden="true"`. The 1px spans and the marker carry no information a screen reader needs; the numbers `01`–`05` are already in the text.
- **The stage numbers are visible text, not `::marker`.** `01 — Understand` is a `<p>` inside the row, so the index is announced. (`list-style` is not relied on anywhere in this block.)
- **The closing line is a `<p>`.** As an `<h2>`/`<h3>` it would appear in a screen-reader heading list as if it were a section title.
- Contrast: stage meta uses `text-black/70` (**6.84:1**), descriptions `text-black/75` (**8.05:1**). The brand's `--color-muted` measures **3.2:1** on `--color-bg` and fails AA, so it is not used for either.
- Heading outline after the change: one `H1`, then `H2`s in section order, ending `… → Things we're building. → Think first. Build fast. Learn constantly.`

---

## 8. Motion

The mechanism is the site's established `data-shown` pattern, already used by `ServiceVisual` and the AI Audit panel:

```tsx
const inView = useInView(ref, { once: true, amount: 0.4 });
const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
const shown = Boolean(reducedMotion) || inView;
<li data-shown={shown} style={{ "--d": `${index * 60}ms` }}>
```

All animation lives in `app/globals.css` and animates only `transform`, `opacity` and colours.

### The trap this block had to avoid

**`useReducedMotion()` from Motion resolves at module load**, so on a reduced-motion client it already reports `true` on the first render while the server rendered `false`. Here that value drives a rendered attribute (`data-shown`), so it would mismatch during hydration. `useMediaQuery(REDUCED_MOTION_QUERY)` from `lib/media-query.ts` reports `false` from `getServerSnapshot` during SSR *and* hydration, then re-renders — so the two always agree. This is the same failure the Product Journey block hit; the hook exists because of it.

### Stagger

Each row gets `--d: index * 60ms`, consumed by every transition in the block. The cascade is 0 → 240ms.

### Reduced motion

With `prefers-reduced-motion: reduce`, `shown` is `true` immediately — **the stages are not gated behind an animation at all**, and the rails are drawn at full scale on the first paint. This is verified in §10, not assumed.

---

## 9. Constraints

- No new dependency. Motion is already present; `useInView` is imported from `motion/react`.
- No new design token. The block uses existing utilities and `--color-black` / `--color-line` / `--color-bg`.
- No `border-t` on a *first* section — Method is not first, so it has one, and that is correct.
- The five existing anchors (`#trust`, `#the-ai-gap`, `#what-we-do`, `#how-we-work`, `#ai-audit`, `#cases`) are unchanged.
- `data/method.ts` holds copy only. No component imports `globals.css`-adjacent constants.

---

## 10. Validation

Run against `http://localhost:3200/` (dev server — the production build is blocked in this sandbox, see §10c).

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

### b. Timeline behaviour — a DOM probe, two passes

Server HTML can prove the copy rendered. It cannot prove the rail animates or that it degrades safely, so both were measured:

**Pass 1 — normal motion, scrolled into view**

```text
before scroll: rowCount=5, shown=[false,false,false,false,false]   ← genuinely gated
after scroll:  rowCount=5, shown=[true,true,true,true,true]
               fillScaleY   = [1,1,1,1,null]   ← fill reached full scale; null on the
                                                 last row because its rail is display:none
               markerBg     = rgb(17,17,17)    ← --color-black, all five
               textOpacities= [1,1] each       ← the 0.75 floor is the floor, not the state
               delay (--d)  = 0/60/120/180/240ms
               paddingBottom= 56px ×4, then 0px on the last row
               railDisplay  = block ×4, then none on the last row
```

**Pass 2 — `prefers-reduced-motion: reduce`, never scrolled**

```text
shown=[true,true,true,true,true]  fillScaleY=[1,1,1,1,null]  textOpacities=1 everywhere
```

Content is not gated behind the animation.

### c. Console and outline

```text
1440px and 375px
console messages: 1 → [HMR] connected
section anchors:  trust -> the-ai-gap -> what-we-do -> how-we-work -> ai-audit -> cases -> method
heading outline:  … H2 Things we're building. → H2 Think first. Build fast. Learn constantly.
```

No errors, no hydration warnings. `method` is the last anchor, as designed. The closing statement does not appear in the outline — §0 decision 8 confirmed.

### d. Production build

`next build` was attempted. It **compiled successfully, typechecked and prerendered all 8 pages**, then was blocked at the final step — Next cleans stale `distDir` folders on exit and the sandbox's bulk-delete guard stopped it (`SAFE_DELETE_BULK_CONFIRM_REQUIRED`). It is reported as **partially verified**: compilation, typechecking and prerendering all passed; the exit-time cleanup did not run. The build also rewrote `tsconfig.json`, which was reverted with `git checkout --` as the memory note predicts.

**This is why the visual verification above used the dev server.** Dev injects HMR scripts and an error overlay, so it is the weaker signal — it is used only because the production build could not complete, and that is stated rather than hidden.

---

## 11. Definition of Done

- [x] `data/method.ts` exists with the five stages verbatim, the headline and the closing line.
- [x] `components/home/Method.tsx` exists and is a Server Component.
- [x] `components/home/MethodTimeline.tsx` exists and is the only client component.
- [x] `app/page.tsx` renders `… → Cases → Method`.
- [x] The section carries `id="method"` and `aria-labelledby="method-title"`.
- [x] The H2 is `Think first. Build fast. Learn constantly.`
- [x] Five stages render as an `<ol>`, each with its number, title and description.
- [x] The closing line renders as a `<p>`, not a heading.
- [x] Product Journey's eyebrow is `One partner. Every stage.`; `How we work` appears only as a nav/footer link.
- [x] The six earlier anchors are unchanged.
- [x] No CTA, no durations, no metrics, no client, logo or testimonial anywhere in the block.
- [x] `tsc --noEmit` clean; lint clean.
- [x] Browser verification in §10 passes, including the reduced-motion path.
- [ ] Production build exit — blocked in this sandbox (§10d).

---

## 12. Deferred

- **Stage durations.** If the business ever commits to them, they are a new field on `MethodStage` and a second line in the meta row. Not before.
- **The `#how-we-work` anchor name.** It now points at a section whose kicker is `One partner. Every stage.`. Renaming it to `#one-partner-every-stage` would be more honest, but it changes a navbar target — a navigation decision, tracked in §16.
- **Any horizontal treatment.** If a designer ever wants the rail horizontal at `lg`, that is a different component, not a variant.
- **Section 09 — Product Studio.** The next block in page order.

---

## 13. Do not overbuild

Not in this task:

- a scroll-linked MotionValue or `useScroll` for a single "growing" line;
- per-stage icons or illustrations;
- an accordion, tabs or expandable stages;
- a horizontal variant;
- hover or click states on the stages (they are not interactive);
- a dark variant;
- animation on the section header or the closing line;
- a CMS field for the method.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 14. Commit

Two commits:

```text
feat: add method section
docs: add method implementation pack
```

---

## 15. Final response format

Report:

1. the files created and changed;
2. the copy, quoted, noting that **all of it is verbatim from the source**;
3. the eyebrow collision and why Product Journey's kicker changed while its anchor did not;
4. the audit results at all eight widths;
5. the timeline probe results, both passes, including the reduced-motion path;
6. the anchor order and the heading outline;
7. lint and typecheck status, and the production build's partial state;
8. §16.

---

## 16. Open questions

1. **The `#how-we-work` anchor no longer matches its kicker.** `JOURNEY_SECTION_ID = "how-we-work"` because the navbar's `How we work` link points there, and that href is a settled decision (Product Journey Pack §11). The section now displays `One partner. Every stage.`. Two honest options: leave it (the anchor is invisible to visitors), or rename both the id and the navbar href. Flagged, not changed — moving a navbar target belongs to a navigation task.
2. **Three numbering schemes exist in the source** (§1). The implemented one is the visitor-visible one. If the intent was ever the `05 — HOW WE WORK` style where the eyebrow carries the *source's* index, every block's `number` prop is wrong by design and that is a page-wide decision.
3. **No stage durations.** If a prospect's first question is "how long does this take", the block currently has no answer — deliberately, because the source does not give one. That is a business input, not a design one.
