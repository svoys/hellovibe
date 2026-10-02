# HelloVibe — Engagement Models Implementation Pack v0.1

## Purpose

Implement **Section 12 — ENGAGEMENT MODELS** as a homepage block after Why HelloVibe.

The source states the job as a question to close: *"Как с вами вообще работать?"*. Everything above this point describes what HelloVibe does and how it does it; this is the first block that answers what a visitor would actually be buying, in two shapes.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Method, Product Studio, Creative Engine, Why HelloVibe, FAQ, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency, any CSS. Engagement Models is a homepage block and a `data/` module — it needed no `globals.css` block at all, because it has no animation. See §6.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Creative Engine, Product Studio, Method, Cases, AI Audit, Trust Strip, Product Journey, Static Pages and Why HelloVibe packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`10`** — continuing the visitor-visible sequence (AI Gap `01` … Why HelloVibe `09`) | `12`, the block's position in the full 15-item page order. The source's own internal index is `12` in the page order and `13`/`16` in two other documents. See §1 |
| 2 | Surface | **Light** — the warm background, `border-t border-line` | The source's page-rhythm map says `LIGHT` for this block, so there is nothing to decide. See §4 |
| 3 | Eyebrow | **`How we can work together`**, sentence case; `text-label uppercase` supplies the caps | Storing the source's literal `HOW WE CAN WORK TOGETHER`. Every other eyebrow on the page is stored in sentence case. See §2 |
| 4 | Card titles | **Title case** — `Project`, `Partnership` | The source's `## PROJECT` / `## PARTNERSHIP`. That is the source's markdown heading styling, not copy: the same document writes *every* heading in caps. The design system reserves caps for the mono label role. See §2 |
| 5 | Layout | **Two tall cards whose body is a hairline-separated list** | A second Services-style grid of white cards with meta bars and diagrams. See §3 |
| 6 | CTA weight | **Both `primary`** | `secondary` on the Partnership card. Rejected on evidence — see §3 |
| 7 | Motion | **None.** Pure Server Component, no client boundary | An in-view stagger like most other blocks. See §6 |
| 8 | Outcome lines | `<p>`, **not headings** | Promoting them. They are the card's payoff, not a subsection. See §11 |
| 9 | `MWP` / `MVP` | **Not expanded inline** | Repeating the Product Studio gloss inside the list. See §7 |
| 10 | Full stop on the outcome lines | **None** | The source is split two-two across its four passes. See §2 |
| 11 | Stacked row gap | **The system's `hv-grid` gutter** (12px at 320–430) | A wider custom row gap. Rejected on evidence — Services ships the identical treatment. See §10 |

---

## 1. Section position and anchor

Engagement Models is the **twelfth** item in the source's page order:

```text
9. AI Product Studio  10. AI Creative Engine  11. Why HelloVibe  12. Engagement Models  13. FAQ  14. Final CTA
```

Its anchor is **`#engagement-models`**, following the naming of the other blocks (`#the-ai-gap`, `#what-we-do`, `#product-studio`, `#creative-engine`, `#why-hellovibe`).

It is exported as `ENGAGEMENT_SECTION_ID` from `components/home/EngagementModels.tsx`, the same pattern every other block uses.

**Nothing links to it.** No navbar entry, no footer entry, no in-page link points at this anchor. It exists so the block is addressable and so the anchor chain stays complete and testable:

```text
trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases → method
      → product-studio → creative-engine → why-hellovibe → engagement-models
```

**The number is `10`, not `12`.** Two numbering schemes exist in the source — the position in the full page order, and the visitor-visible sequence of *indexed* blocks — and only the second one ships. Hero and Trust Strip carry no index, so the tenth indexed block is `10`. This is the same trap the Why HelloVibe pack §1 and the Creative Engine pack §2 record.

---

## 2. Approved copy

All verbatim. Nothing here is written, only selected.

```text
10 —— HOW WE CAN WORK TOGETHER

One project. Or your AI team.

┌─ Project ───────────────────────┐   ┌─ Partnership ───────────────────┐
│ For a defined challenge.        │   │ For teams building continuously.│
│ ─────────────────────────────── │   │ ─────────────────────────────── │
│ Discovery                       │   │ Fractional Product              │
│ AI Audit                        │   │ AI Engineering                  │
│ MWP                             │   │ AI Strategy                     │
│ MVP                             │   │ Creative                        │
│ AI System                       │   │ Optimization                    │
│ Creative Engine                 │   │                                 │
│ ─────────────────────────────── │   │ ─────────────────────────────── │
│ Fixed scope → clear outcome     │   │ One team → ongoing momentum     │
│ [ Start a project → ]           │   │ [ Build with us → ]             │
└─────────────────────────────────┘   └─────────────────────────────────┘
```

### The source gives this block four times

| Pass | Form |
|---|---|
| `# ENGAGEMENT MODELS` (narrative map) | Fragments — `Defined challenge. / Fixed scope. / Clear outcome.` |
| `# 16. Engagement` | Full phrasing, **with** full stops on the arrows |
| `# 13. ENGAGEMENT MODELS` | Full phrasing, no full stops |
| `# 12. ENGAGEMENT MODELS` (the per-block task) | Full phrasing, no full stops |

Three passes give the full phrasing and two of those are character-identical, so the full phrasing ships. The fragment pass is a compression of the same copy, not a different version of it — the same call the Why HelloVibe pack §2 makes for its own four passes.

**The full stop.** The source is split two-two. The form **without** ships, matching the two passes that give the full phrasing. Recorded because it is the kind of difference that otherwise looks like an oversight.

### The eyebrow trap, again

The source writes the kicker in caps — `HOW WE CAN WORK TOGETHER`. The value is stored in sentence case because `SectionHeader`'s `text-label uppercase` supplies the caps for every eyebrow on the page; storing the caps as well would mean the one eyebrow that is already uppercase in the source is the only one that is *double*-specified.

### Card titles are not copy

The source writes `## PROJECT` and `## PARTNERSHIP`. Those are the source's markdown headings, and the same document writes **every** heading in caps — including `## Задача`, `## Eyebrow`, `## H2`. Caps in this source are heading styling, not content, so they are not reproduced. The site renders `h3` in title case throughout (Services, Cases, Why HelloVibe), and caps are reserved for the mono `text-label` role. `Project` and `Partnership` are ordinary words, not acronyms.

Same class of decision as "the source's internal index is not copy" — the styling of the source's own document is not part of the brief.

---

## 3. The two cards, and what they are not

The source asks for **"две большие карточки"** — two large cards.

The risk is immediate: **Services is also a grid of white bordered cards.** If this block is built the same way, the page has two nearly identical card grids ten sections apart, and the second one reads as filler.

So the treatment is built around what Services does *not* have:

| | Services | Engagement Models |
|---|---|---|
| Cards | 4, in a 2×2 | **2**, side by side |
| Top of card | Mono meta bar — index + action (`01 ─ FIND`) | **Heading + audience line** |
| Middle | One-sentence description | **A hairline-separated list of 5–6 items** |
| Bottom | An abstract diagram | **An outcome line + a button** |
| Feel | Editorial spread of pillars | **A spec sheet of two ways to engage** |

No diagram, no meta bar, no imagery. The card's body is a list, which is what the source actually gives — six names and five names, not six descriptions and five descriptions.

### Both buttons are `primary`

The source bolds both CTAs and gives neither priority, so both ship at equal weight — the block presents a choice, not a recommendation.

Softening the second card with `Button`'s `secondary` variant was considered and **rejected on evidence**:

- `secondary` is **unused everywhere else in the codebase**. This block would have been its debut.
- Its `border-line` measures about **1.3:1** against a white card, well under the 3:1 WCAG requirement for a control boundary.

Shipping a control whose boundary is barely visible, in the one place nobody has looked at it before, is not a good trade for a hierarchy the source does not ask for.

---

## 4. Surface: light — and the page-rhythm map

The source's **PAGE RHYTHM** map assigns every block a treatment:

```text
LIGHT Hero · LIGHT Trust · DARK AI Gap · LIGHT Services · EXPERIMENTAL Journey
· LIGHT AI Audit · EDITORIAL Cases · LIGHT Method · DARK Product Studio
· EXPERIMENTAL Creative Engine · LIGHT Why HelloVibe · LIGHT Engagement
· LIGHT FAQ · DARK Final CTA · DARK Footer
```

**This block is `LIGHT`**, so it keeps the ordinary warm background and `border-t border-line` that every light block uses. There is nothing to decide and no new surface hook:

- no `data-surface` attribute,
- no focus-ring override,
- no `::selection` override,
- no `tone` change — `strong` is correct here, as on every other light block.

This is the third light block in a row (Why HelloVibe → Engagement → FAQ), which is what the map asks for before the Final CTA goes dark again.

### The three deviations remain open

The map **confirms** the Creative Engine decision (it labels that block `EXPERIMENTAL`, which is exactly what the `--color-vibe` field is) but **three shipped blocks disagree with it**: AI Gap (`DARK` in the map, shipped light), Journey (`EXPERIMENTAL`, shipped light) and Cases (`EDITORIAL`, shipped light).

Both readings and the full argument are in the Why HelloVibe pack §4c. **Not touched here** — this task builds block 12, and retro-fitting verified, approved blocks on the strength of a map found afterwards is not a change to make silently. Still open, and carried forward to §18.

---

## 5. Layout: two cards, list-driven

```text
<section id="engagement-models" aria-labelledby="engagement-title" class="border-t border-line">
  Container py-section-lg
    hv-grid
      col-span-4 md:col-span-8 lg:col-span-7   → SectionHeader (number 10)
    hv-grid mt-16
      col-span-4 md:col-span-4 lg:col-span-6   → <article> Project
      col-span-4 md:col-span-4 lg:col-span-6   → <article> Partnership
```

Each `<article>` is `flex h-full flex-col border border-line bg-white`:

| Part | Treatment |
|---|---|
| Header | `px-6 pt-8 lg:px-10 lg:pt-10` — `<h3>` then the audience line |
| List | `<ul class="mt-8 border-t border-line">`, each row `border-b border-line px-6 py-3 text-body text-black/75 lg:px-10` |
| Footer | `mt-auto flex flex-col items-start gap-6 px-6 py-8 lg:px-10 lg:py-10` — outcome line then button |

**`h-full` + `mt-auto` is the load-bearing part.** One card lists six items, the other five. Without the pair, the Partnership card's outcome line and button would sit ~50px higher than the Project card's, and a two-up comparison would look broken. With it, both footers are pinned to the bottom of an equal-height row and the two outcome lines and two buttons share a baseline at every side-by-side width. Measured in §10.

The cost is a deliberate void in the shorter card — about 50px of white between its last row and its outcome line at 1440. That is the price of the aligned baseline, and it is the right trade: a void is invisible, a misaligned pair of buttons is not.

**Full-width row rules, not leading dashes.** The Product Journey list marks its items with a small `h-px w-4` dash. That device breaks when an item wraps — the dash stays behind on the first line — which is why the standing convention restricts it to rows that cannot wrap. Here the rows are the card's *structure*, so they get `border-b` rules, which cannot wrap and cannot drift.

---

## 6. Motion: none, and that is the decision

The source specifies no motion for this block. The block above it — Creative Engine — is the most heavily animated on the page, and the block below it is the FAQ accordion, which is interactive.

So this is a **pure Server Component with no client boundary at all**: no `"use client"`, no `useInView`, no CSS block in `globals.css`, no `data-shown`. It adds **zero bytes** to the client bundle. This is the second block in a row built this way (Why HelloVibe was the first) and it is what gives the lower half of the page a beat to land on.

It is also the right call for the content: this block is a two-way choice, and a choice is the one thing on the page that benefits from being completely still.

---

## 7. Data model

`data/engagement-models.ts` — new file, 105 lines.

```ts
export type EngagementCta = { label: string; href: string };

export type EngagementModel = {
  id: string;
  title: string;
  audience: string;
  items: readonly string[];
  outcome: string;
  cta: EngagementCta;
};

export const engagementModels: readonly EngagementModel[];
export const engagementEyebrow = "How we can work together";
export const engagementHeadline = "One project. Or your AI team.";
```

### `MWP` and `MVP` are not expanded here

The Product Studio block expands both (`MWP = Minimum Working Product` ≠ `MVP = Minimum Viable Product`) because the source hands it the acronyms with no gloss and they are that block's subject.

Here they are two rows in a list of six. Repeating the gloss inside a hairline-separated list would break the row rhythm for two items out of eleven, and the list is a **menu of names, not a glossary**. The expansion exists three blocks up.

### One string, not two

The source sets the H2 as two lines (`# One project.` / `# Or your AI team.`). It is stored as one string: it is one sentence pair, and `text-wrap: balance` in the base layer already breaks it the way the source intends — as it does for Why HelloVibe's `Different disciplines. One team.`

---

## 8. Component architecture

`components/home/EngagementModels.tsx` — new file, 117 lines. **Server Component.**

```text
EngagementModels            (server)  ← the only file in the section
  SectionHeader             (server)  ← shared primitive, unchanged
  ButtonLink ×2             (server)  ← shared primitive, unchanged
```

The `engagementModels.map()` runs on the server. The only `<svg>` in the section is the two `ArrowRight` icons inside `ButtonLink`, each `width="24"` — asserted in §13c so an illustration cannot quietly replace one.

---

## 9. Shared-component changes

**None.** No file outside the two new ones and `app/page.tsx` was touched.

This is worth stating explicitly because the previous block's neighbours each needed something:

| Block | What it had to change |
|---|---|
| Creative Engine (10) | `types/index.ts` (new `ButtonVariant`), `Button.tsx` (new `accent` variant), `SectionHeader.tsx` (new `vibe` tone + `divider` key), `globals.css` (`::selection` hook + animation block) |
| Why HelloVibe (11) | Nothing |
| **Engagement Models (12)** | **Nothing** |

A light block that needs no cards, no diagram and no motion is exactly the case the existing primitives already cover. If this block had needed a change, the primitives would have been wrong.

---

## 10. Layout, measured in the browser

### Surface

```text
background-color   rgba(0, 0, 0, 0)        → inherits the warm body background
border-top         1px rgb(216, 213, 205)  → --color-line
data-surface       absent                  → light block, no surface hook
```

### Cards, per width

```text
width  layout        cardW  cardH      gap  rows  rowW  overflowX
1440   side-by-side   661   640/640     22  6/5   659   0
1280   side-by-side   583   640/640     21  6/5   581   0
1024   side-by-side   464   636/636     18  6/5   462   0
 768   side-by-side   345   603/603     16  6/5   343   0
 430   stacked        388   593/544     12  6/5   386   0
 375   stacked        335   593/544     12  6/5   333   0
 320   stacked        280   619/596     12  6/5   278   0
```

- **Card widths are identical at every width**, and `cardW − rowW = 2`, i.e. the row rules span the full inner width of the card.
- **Heights are identical whenever the cards share a row** (640/640, 636/636, 603/603). They differ only when stacked, where there is no row to share.
- The two cards go side by side at `md` (48rem / 768px) and stack below it — `hv-grid`'s own breakpoint, unchanged.

### The aligned baseline — the point of the block

```text
width   outcomeA y   outcomeB y   ctaA y   ctaB y
1440      11457        11457       11915    11915
1280      11542        11542       12000    12000
1024      11255        11255       11712    11712
 768      11285        11285       11727    11727
```

Identical at every side-by-side width, despite the 6-vs-5 item lists. This is `h-full` + `mt-auto` doing its job, and it is asserted rather than eyeballed (§13b).

### The stacked gap is the system's, on purpose

At 320–430 the two cards stack with a **12px** row gap — `--spacing-grid-gap` at those widths. 12px is tight enough to be worth questioning, so it was checked against the existing treatment rather than judged in isolation: **Services stacks its four cards with the identical 12px gap**, and a 375px screenshot of that block confirms the cards still read as separate boxes rather than one merged panel.

So the gap stays as the design system provides it. Overriding the system gutter in this one block would make it inconsistent with Services in *rhythm*, when the block's whole argument is that it differs from Services in *structure*.

### Section height

```text
1440 → 1225px   1024 → 1172px   768 → 1010px   375 → 1481px
```

---

## 11. Accessibility

- `<section aria-labelledby="engagement-title">` with `id="engagement-title"` on the `h2` — the shared pattern.
- Heading outline: `h2` (One project. Or your AI team.) → `h3` ×2 (Project, Partnership). **The outcome lines are `<p>`, not headings**, so the outline gains no subsection that is not one.
- Each card is an `<article>` with an `<h3>`, so the two models are navigable as regions of the document.
- Each list is a real `<ul>` / `<li>` — five and six items, in the source's order.
- Focus rings: inherited from the global rule. `--color-black` on the warm background measures about 17:1, and the 8-width audit reports no missing ring (§13a).
- No new interactive pattern: two ordinary links, each with visible text.
- `→` in the outcome lines is a real U+2192 in the copy, not decoration, so it is not `aria-hidden`. It is announced as "right arrow", which is the intended reading of *"Fixed scope → clear outcome"*.

---

## 12. Constraints

- No new dependency, no new route, no token change, no CSS.
- No fabricated client, deliverable, metric, logo, award, price, year, timeline or headcount — in copy, in `aria-label`, or in a code comment.
- No imagery of any kind: no `<img>`, no diagram, no `<figure>`. The only `<svg>` elements are the two button arrows.
- Typographic apostrophes in visible text. (This block contains none, but the rule stands.)
- `MWP` / `MVP` stay unexpanded in the list (§7).
- The two cards stay structurally distinct from Services (§3).

---

## 13. Validation

Dev server, port 3200. The production build remains blocked by the sandbox's bulk-delete guard, as for every block since Method; recorded as a limitation rather than reported as a pass.

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

### b. Geometry, measured in the browser

The dedicated probe asserts, at seven widths (1440/1280/1024/768/430/375/320):

- no horizontal overflow,
- the section carries **no** `data-surface` attribute and keeps its 1px `--color-line` top rule,
- card widths are equal, and equal to `rowW + 2`,
- each card lists exactly 6 / 5 items,
- both cards are `rgb(255, 255, 255)` with a 1px `--color-line` border,
- each card's rows have exactly one distinct width (no ragged rows),
- whenever the cards share a row: **equal heights, outcome lines on one baseline, buttons on one baseline, and no horizontal overlap**.

`All Engagement Models geometry assertions passed.`

### c. Content assertions — 49/49

Scoped to `#engagement-models` in the served HTML, tags stripped before asserting on text, and — per the audit skill's scoping rule — assertions target the specific element rather than the whole subtree.

Checks worth naming:

- **"both CTAs use the primary variant"** — extracts the two `<a href="/contact">` tags and asserts `bg-black` **and** `hover:bg-vibe` on each, plus the negative `!/hover:bg-white/` (the `accent` variant). Scoped to the anchors, because a `bg-black` check against the section would have passed on the card borders' near-black text or any other black element — the failure mode the audit skill records.
- **"Project lists exactly the six source items"** — a deep equality against the expected array, so a reordered or substituted item fails rather than passing on a loose `includes`.
- **"the block is the last section on the page"** and **"the block sits after Why HelloVibe"** — position asserted, not assumed.
- **"no fabricated numbers in the copy"** — the section's own index `10` is stripped first, then the remainder must contain no digits.
- **"exactly two graphics (the two button arrows)"** — and every one is `/\swidth="24"/`, anchored with a leading `\s` because `stroke-width="2"` also contains `width="`.

### d. Page-wide

| Check | Result |
|---|---|
| Routes and anchors (`hv-links`) | 6/6, every internal link and anchor resolves |
| Static-page copy (`hv-pages-copy`) | 151/151 |
| Console | 1 message — `[HMR] connected` |
| Heading outline | Correct; `h2` + two `h3` last |
| Anchor chain | `… → creative-engine → why-hellovibe → engagement-models` |

### e. Lint and typecheck

- `tsc --noEmit` → exit 0.
- `eslint` with the **full** config over all three changed/new files → exit 0.

---

## 14. Definition of Done

- [x] `data/engagement-models.ts` with all copy verbatim, both models fixed, the acronyms left unexpanded.
- [x] `EngagementModels.tsx` — Server Component, `#engagement-models`, `aria-labelledby`.
- [x] Light surface, `border-t border-line`, no new surface hook, no CSS.
- [x] Two cards whose body is a hairline list — no diagram, no imagery, no meta bar.
- [x] Both CTAs `primary`, pointing at `/contact`.
- [x] Outcome lines as `<p>`, not headings.
- [x] Wired into `app/page.tsx` after `WhyHelloVibe`.
- [x] 8-width audit clean; geometry probe clean; 49/49 content; 6/6 routes; 151/151 page copy; console clean.
- [x] `tsc` and `eslint` (full config) clean.
- [x] Committed `feat:` + this pack as `docs:`.

---

## 15. Deferred

- **The production build.** Blocked by the sandbox's bulk-delete guard, as for every block since Method.
- **The rhythm-map deviations in §4.** Deliberately not addressed here. Raised in §18.
- **An in-view reveal.** Not built, on purpose (§6). Additive if wanted.
- **Any per-model route.** Both CTAs point at `/contact`. `Project` and `Partnership` are not pages and there is no pricing, scope or contract detail behind them — inventing any of that is out of bounds.
- **The `Tag` default-variant contrast** (`border-line text-muted` = 3.2:1). Pre-existing, unrelated to this block, still unfixed.

---

## 16. Do not overbuild

- Do not add a diagram to either card "for balance". The list *is* the card's body, and a diagram is what would make this a second Services.
- Do not add a third engagement model. The source gives two, four times.
- Do not soften the second button. Both are `primary` for a documented reason (§3).
- Do not expand `MWP` / `MVP` inline. The gloss lives in Product Studio (§7).
- Do not add animation because every other block has it. That is the reason not to (§6).
- Do not widen the gap between the stacked cards. It is the system gutter and Services uses it too (§10).
- Do not add prices, timelines, minimum engagements or "starting at" figures. The source gives none, and the standing rule forbids inventing commitments.

---

## 17. Commit

```text
6c70f56  feat: add engagement models section
```

Three files, 224 insertions, 0 deletions. Two new (`EngagementModels.tsx`, `data/engagement-models.ts`), one modified (`app/page.tsx`).

---

## 18. Open questions

1. **The page-rhythm map (§4).** Still unresolved and now one block closer to mattering: the map assigns `LIGHT`, `LIGHT`, `DARK` to blocks 12–14, and this block followed it knowingly. Three already-shipped blocks (AI Gap, Journey, Cases) still disagree with it. Two readings are possible and they differ in how much rework follows. This is the third pack in a row to raise it — worth a decision rather than a fourth deferral.
2. **No animation (§6).** Deliberate, and now the second static block in a row. If the intent is that every block reveals on scroll, two consecutive exceptions should be confirmed on purpose rather than by drift.
3. **Both CTAs are equal weight (§3).** Faithful to the source, but it means the page has three "Start a project" buttons (Hero, here, Final CTA) plus "Build with us", with no visual hierarchy between the two models. If one engagement is the intended default, this is where to say so.
4. **The void in the shorter card (§5).** About 50px of white in the Partnership card at 1440, caused by the baseline alignment. Intentional and preferable to misaligned buttons, but a reviewer may read it as a spacing bug. Recorded so it is not "fixed" by accident.
5. **Card titles in title case (§2).** A judgement about the source's markdown styling. If the intent is that `PROJECT` and `PARTNERSHIP` are brand-style model names — like the Product Journey's `DISCOVER` / `DESIGN` — they should be uppercased in the mono label role instead, which is a different treatment from the one shipped.
