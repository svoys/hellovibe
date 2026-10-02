# HelloVibe — Why HelloVibe Implementation Pack v0.1

## Purpose

Implement **Section 11 — WHY HELLOVIBE** as a homepage block after Creative Engine.

The source states the job plainly: answer *"Почему вы?"*. This is the only block on the page that argues for the studio rather than describing what it does.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Method, Product Studio, Creative Engine, Engagement Models, FAQ, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency. Why HelloVibe is a homepage block and a `data/` module. It did not even need a CSS block — see §5.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Creative Engine, Product Studio, Method, Cases, AI Audit, Trust Strip, Product Journey and Static Pages packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`09`** — continuing the visitor-visible sequence (AI Gap `01` … Creative Engine `08`) | `11`, the block's position in the full 15-item page order. The source's own internal index is `11` in the page order, `15`/`12`/`06` in three other documents. See §1 |
| 2 | Surface | **Light** — the warm background, `border-t border-line` | The source's own page-rhythm map says `LIGHT` for this block, so there is nothing to decide. See §4 |
| 3 | Eyebrow | **`Why HelloVibe`** | The source's `06 — WHY HELLOVIBE`. The `06` is an internal index and must not ship — the on-page number is `09` and lives in the `number` prop. See §2 |
| 4 | Layout | **Four columns, flat** — a top rule, a name, a sentence | Bordered cards like Services. That block is also four named things in a grid, and two of them would read as one repeated idea. See §5 |
| 5 | Animation | **None.** Pure Server Component | An in-view stagger like every other block. See §6 |
| 6 | CTA | **None** | The source gives this block a closing statement and no link, and the Final CTA is a section of its own |
| 7 | Closing line | A `<p>`, **not a heading** | The source marks it with a `#`, but promoting it would put a second section-level title in the heading outline |
| 8 | Closing rule | **No `border-t` above it** | Method already closes with a full-width rule and a large paragraph two blocks up; two identical closes read as one repeated device |
| 9 | Heading level | The four disciplines are `<h3>` | `<p>` like the Method stages. `<h3>` is correct — they are genuine subsections — and it keeps the outline navigable |

---

## 1. Section position and anchor

Why HelloVibe is the **eleventh** item in the source's page order:

```text
9. AI Product Studio  10. AI Creative Engine  11. Why HelloVibe  12. Engagement Models  …
```

Its `number` prop is `"09"`, not `"11"`, because the on-page numbering counts **content sections only** — Hero and Trust Strip carry no index, and Navbar and Footer are chrome:

```text
The AI gap 01 · What we do 02 · One partner. Every stage. 03
· Find your best AI opportunities. 04 · Things we're building. 05
· Think first. Build fast. Learn constantly. 06
· Let's turn it into something people can use. 07
· Your next creative team doesn't sleep. 08
· Different disciplines. One team. 09
```

- Anchor: **`#why-hellovibe`**, exported as `WHY_SECTION_ID`.
- Heading: `aria-labelledby="why-title"`.

---

## 2. Approved copy

Every prose string is **verbatim from the source**, which gives this block three times with identical wording.

| Field | Value |
|---|---|
| `number` | `09` |
| `eyebrow` | `Why HelloVibe` |
| `title` | `Different disciplines. One team.` |
| `closing` | `The best AI work happens where these disciplines meet.` |

### The four disciplines

| # | `label` | `description` |
|---|---|---|
| 1 | Strategy | We know how to find the problem before building the solution. |
| 2 | Product | We think in users, outcomes and adoption — not just features. |
| 3 | Technology | AI-native engineering from prototype to production. |
| 4 | Creative | Products should work beautifully and communicate clearly. |

### The fourth variant is not a variant

The source gives this block a fourth time, in a compressed form:

```text
Strategy:      Find the problem before the solution.
Product:       Users, outcomes, adoption.
Technology:    AI-native engineering from prototype to production.
Creative:      Products should work beautifully and communicate clearly.
```

Two of the four lines are fragments of the same sentences, and two are byte-identical. It is a summary of the copy above, not a different version of it, so the full sentences ship.

### The eyebrow trap

The source writes the eyebrow as `06 — WHY HELLOVIBE` — twice. That `06` is the source's **own internal index**, not this block's number, and the number already lives in the `number` prop as `09`. Shipping `06` would put two different numbers on one block. The content harness asserts `\b06\b` does not appear anywhere in the visible text.

This is the third block in a row to hit the same trap (`14. AI Creative Engine` for block 10, `09` for block 09), so it is worth stating as a rule: **an index that appears in the source's own section heading is never copy.** The only number a visitor sees is the one in the meta row.

---

## 3. Nothing here is a claim about results

This is the most dangerous block on the page. Every other block describes *what HelloVibe does*; this one argues *why it is the right choice* — and that is exactly the slot where a studio normally puts clients, logos, awards, headcount and numbers.

The house rule forbids all of them, and it is not merely a preference: there is nothing to point at yet, so any such claim would be invented.

**Every line in this block is a statement about method**, not outcome:

- "We **know how** to find the problem before building the solution." — method.
- "We **think in** users, outcomes and adoption." — method.
- "AI-native engineering **from prototype to production**." — method.
- "Products **should** work beautifully and communicate clearly." — a standard, not a result.

None of them requires a client, a metric or a date to be true. That is what makes the block publishable today.

The content harness asserts the absence of: digits in the copy, `%`, client/sector nouns (`B2B`, `SaaS`, `Startup`, `Consumer`), `logo`, testimonial language, `award`, prices, any four-digit year, and any headcount claim. It also asserts there is no `<img>`, no `<svg>` and no `<figure>` in the block — there is no imagery to be mistaken for a portfolio.

---

## 4. Surface: light — and the page-rhythm map

The source carries a section-by-section **"PAGE RHYTHM"** map. Its stated purpose: *"Главная не должна ощущаться как 15 одинаковых блоков. Нужен ритм."*

```text
LIGHT         Hero
LIGHT         Trust
DARK          AI Gap
LIGHT         Services
EXPERIMENTAL  Journey
LIGHT         AI Audit
EDITORIAL     Cases
LIGHT         Method
DARK          Product Studio
EXPERIMENTAL  Creative Engine
LIGHT         Why HelloVibe      ← this block
LIGHT         Engagement
LIGHT         FAQ
DARK          Final CTA
DARK          Footer
```

Three things follow.

**a. This block is `LIGHT`.** Back to the warm background after Product Studio's black and Creative Engine's accent. So it keeps the ordinary `border-t border-line` every other light block uses, and needs no new surface hook. This is the first block since Method that required no shared-component change at all.

**b. The map independently confirms the Creative Engine decision.** The previous pack argued from the source's prose (*"Light / experimental section"*, *"фон должен сильно отличаться"*) that Creative Engine should be an accent surface rather than a second dark one. The map labels that block **`EXPERIMENTAL`** — which is the word the source uses for it, and is exactly what the `--color-vibe` field is. The reasoning and the map agree; the map is the stronger evidence, because it was found afterwards.

**c. Three shipped blocks deviate from the map, and this pack does not fix them.** Recorded here because it is a real finding, not because it is this task's job:

| Block | Map says | Shipped as | Status |
|---|---|---|---|
| AI Gap (`01`) | **DARK** | light | deviation |
| Product Journey (`03`) | **EXPERIMENTAL** | light | deviation |
| Cases (`05`) | **EDITORIAL** | light | deviation |
| Services, AI Audit, Method | LIGHT | light | match |
| Product Studio | DARK | dark | match |
| Creative Engine | EXPERIMENTAL | accent | match |

Two readings, and they are not equivalent:

- **The map is a per-section spec.** Then three shipped blocks are wrong and want rework — AI Gap as a dark section in particular is a large change, and it would collide with the Product Studio pack's claim that Product Studio is *"the first dark section"*, which came from the source's own words for that block. The source contradicts itself here.
- **The map describes rhythm, not a spec.** Then `LIGHT` / `DARK` are surface instructions, while `EXPERIMENTAL` and `EDITORIAL` name *treatments* that may well sit on the warm background — in which case Journey and Cases may already comply, and only AI Gap is a genuine question.

Under the second reading the deviations shrink from three to one, which is a reason to prefer it. **This is not resolved here.** It is raised for review in §18 and deliberately left alone: retro-fitting shipped, verified, approved blocks on the strength of a map found later is not a change to make silently inside a "build block 11" task.

---

## 5. Layout: four columns, flat

The source says *"Четыре колонки."* — four columns.

The real risk is that this reads as a **second Services block**. That one is also four named things in a grid, and it sits only seven blocks up. The two are therefore made deliberately unlike:

| | Services (`02`) | Why HelloVibe (`09`) |
|---|---|---|
| Grid | 2 × 2 at `lg` (`col-span-6`) | 4 across at `lg` (`col-span-3`) |
| Container | bordered card, `bg-white`, four sides | no box at all |
| Heading | `text-h3` | `text-h4` |
| Content | title + description + **abstract diagram** | name + sentence |
| Element | `<article>` in a `<div>` grid | `<li>` in a `<ul>` |

It is also a `<ul>`, not a grid of `<article>`s: the four disciplines are one enumeration, and marking them up as four independent articles would be wrong semantically.

Column spans: `col-span-4 md:col-span-4 lg:col-span-3` — one across on mobile, two across at `md`, four across at `lg`.

---

## 6. Motion: none, and that is the decision

The source specifies no motion for this block. It is also directly beneath Creative Engine, which is the most heavily animated block on the page — a drawn trunk, six staggered branches, a seed that scales out of its own corner.

So this block is static. That is the point: a page rhythm needs a quiet beat, and the block immediately after the loudest one is where it belongs.

The practical consequence is that **this block adds nothing to the client bundle** — there is no `"use client"` file, no `useInView`, no `data-shown`, no CSS. It is the first block on the page with no client boundary at all. If a reveal is wanted later it is a small, additive change, but it should be a deliberate one rather than a default.

---

## 7. Data model

`data/why-hellovibe.ts` — the only source of truth for this block.

```ts
export type Discipline = { id: string; label: string; description: string };

export const disciplines: readonly Discipline[] = [ /* Strategy, Product, Technology, Creative */ ];

export const whyEyebrow = "Why HelloVibe";
export const whyHeadline = "Different disciplines. One team.";
export const whyClosing = "The best AI work happens where these disciplines meet.";
```

The doc comment on `disciplines` records the constraint that matters: every line is a claim about **method**, never about results, and the list is fixed.

---

## 8. Component architecture

| File | Kind | Job |
|---|---|---|
| `data/why-hellovibe.ts` | module | All copy and the four disciplines |
| `components/home/WhyHelloVibe.tsx` | **Server** | The whole block |

One file, one Server Component, no client boundary. Nothing else changed except the import and the element in `app/page.tsx`.

---

## 9. Shared-component changes

**None.** This is the first block since Method that needed no change to `SectionHeader`, `Button`, `types/` or `globals.css`.

It uses `tone="strong"` — the tone added for blocks on the warm background — and no button, so the `inverse` and `accent` variants added for blocks 09 and 10 are untouched here.

---

## 10. Layout

- `border-t border-line` — the standard light-surface separator.
- `Container` + `py-section-lg`.
- Header: `col-span-4 md:col-span-8 lg:col-span-7`.
- Disciplines: `hv-grid mt-16`, items `col-span-4 md:col-span-4 lg:col-span-3`.
- Closing: `mt-20`, `max-w-[34ch] text-balance text-h3`.

Measured section height: **851px** at 1440, **790px** at 768, **981px** at 390.

---

## 11. Accessibility

| Requirement | How |
|---|---|
| Section is named | `aria-labelledby="why-title"` → the `<h2>` |
| One `<h1>` on the page | Held — the audit reports `h1Count: 1` |
| Heading order | `h2` then four `h3`, in the outline directly after Creative Engine's `h2` |
| The closing line is not a heading | Asserted — it is a `<p>` |
| No interactive elements | The block has no links and no buttons, so nothing to name and nothing to focus |
| Text meets AA | `text-black/75` 8.05:1 on the warm background |
| Decorative rules | Four identical widths, so they cannot read as a chart — see §13 |

---

## 12. Constraints

- No new dependency, no new route, no token change.
- No fabricated client, deliverable, metric, logo, award, price, year or headcount — in copy, in `aria-label`, or in a code comment.
- No imagery of any kind: no `<img>`, no `<svg>`, no `<figure>`.
- Typographic apostrophes in visible text. (This block happens to contain none, but the rule stands.)
- The four rules must stay the same length.

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

### b. Surface and geometry, measured in the browser

```text
background-color   rgba(0, 0, 0, 0)        → inherits the warm body background
color              rgb(17, 17, 17)
border-top         1px rgb(216, 213, 205)  → --color-line
```

Column and rule widths, per breakpoint:

```text
1440px   items 319,319,319,319   rules 319,319,319,319
 768px   items 345,345,345,345   rules 345,345,345,345
 390px   items 350,350,350,350   rules 350,350,350,350
```

Every rule is the same length as every other rule, at every width — the standing convention that unequal decorative rules read as a bar chart, i.e. as an invented measurement.

### c. Content assertions — 47/47

Scoped to `#why-hellovibe` in the served HTML, tags stripped before asserting on text, and — per the audit skill's scoping rule — assertions target the specific element rather than the whole subtree.

Two checks worth naming:

- **"the source's internal index did not leak"** — asserts `\b06\b` appears nowhere in the visible text. This is the eyebrow trap from §2, asserted rather than assumed.
- **"the closing statement is a paragraph, not a heading"** — asserts no `h1`–`h6` contains the closing sentence, which is what keeps the outline from gaining a second section title.

### d. Page-wide

| Check | Result |
|---|---|
| Routes and anchors (`hv-links`) | 6/6, every internal link and anchor resolves |
| Static-page copy (`hv-pages-copy`) | 151/151 |
| Console | 1 message — `[HMR] connected` |
| Heading outline | Correct; `h2` + four `h3` last |
| Anchor chain | `trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases → method → product-studio → creative-engine → why-hellovibe` |

### e. Lint and typecheck

- `tsc --noEmit` → exit 0.
- `eslint` with the **full** config over all three changed/new files → exit 0.

---

## 14. Definition of Done

- [x] `data/why-hellovibe.ts` with all copy verbatim and the four disciplines fixed.
- [x] `WhyHelloVibe.tsx` — Server Component, `#why-hellovibe`, `aria-labelledby`.
- [x] Light surface, `border-t border-line`, no new surface hook.
- [x] Four flat columns, no cards, no diagram, no imagery.
- [x] Closing statement as a `<p>`, with no rule above it.
- [x] No CTA.
- [x] Wired into `app/page.tsx` after `CreativeEngine`.
- [x] 8-width audit clean; 47/47 content; 6/6 routes; 151/151 page copy; console clean.
- [x] `tsc` and `eslint` (full config) clean.
- [x] Committed `feat:` + this pack as `docs:`.

---

## 15. Deferred

- **The production build.** Blocked by the sandbox's bulk-delete guard, as for every block since Method.
- **The rhythm-map deviations in §4c.** Deliberately not addressed here. Raised in §18.
- **An in-view reveal.** Not built, on purpose (§6). Additive if wanted.
- **Any proof.** The block is method-only by design. If HelloVibe ever has a client, a result or a piece of work it can name, that belongs in Cases, not here — this block should not become the place where the first unverifiable claim appears.

---

## 16. Do not overbuild

- Do not turn the four columns into cards to "add weight". The flatness is what distinguishes this block from Services.
- Do not add a fifth discipline. The source gives four, three times.
- Do not add a CTA. The source gives none, and the Final CTA is its own section.
- Do not promote the closing line to a heading.
- Do not add a `border-t` above the closing line "for consistency with Method". Two identical closes read as one repeated device.
- Do not add animation because every other block has it. That is the reason not to.

---

## 17. Commit

```text
b1d070c  feat: add why hellovibe section
```

Three files, 166 insertions, 0 deletions. Two new (`WhyHelloVibe.tsx`, `data/why-hellovibe.ts`), one modified (`app/page.tsx`).

---

## 18. Open questions

1. **The page-rhythm map (§4c).** Three shipped blocks are labelled differently in the map than they shipped. Two readings are possible and they differ in how much work follows — under one, three blocks want rework; under the other, only AI Gap does, and even that collides with the Product Studio pack's *"first dark section"* claim. Worth a decision before blocks 12–14, because the map assigns those too (`LIGHT`, `LIGHT`, `DARK`) and it would be better to follow it knowingly than accidentally.
2. **No animation (§6).** Deliberate, but it is the only static content block on the page. If the intent is that every block reveals on scroll, this one is the exception and should be revisited on purpose rather than by drift.
3. **Four columns at `md`.** They go to two across at `md` and four across at `lg`, which means the "four columns" the source asks for only exists at `lg` and above. That is the normal responsive reading, but if the four-across row is the point of the block, `md` is where it first breaks.
