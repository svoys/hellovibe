# HelloVibe — Cases Implementation Pack v0.1

## Purpose

Implement **Section 07 — CASES** as a homepage block after the AI Audit.

It exists to prove execution capability. Everything above it makes a promise — what AI can do for a business, what HelloVibe sells, how it works, where to start — and this is the block that is supposed to answer the obvious question: *and what have you actually built?*

This is a focused implementation task. Do NOT build or modify the Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Method, Product Studio, Creative Engine, Why HelloVibe, Engagement Models, FAQ, the final CTA, the Navbar, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Not in this task either:** the `/work` route, the `/work/[slug]` route, `CaseCard` and `CaseHero`. Those belong to the same prompt in the source conversation but they are separate pages with their own layout problem. This task is the homepage block only. See §12.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, the Navigation + Footer Pack, and the Product Journey, Trust Strip and AI Audit packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`05`** — AI Gap `01`, What We Do `02`, Product Journey `03`, AI Audit `04` | Unnumbered |
| 2 | State | **The empty state.** There are no verified cases, so the block renders `Things we're building.` | The three worked examples the source also contains — see §1 |
| 3 | Headline | **`Things we're building.`** — the source's own empty-state replacement for the whole block | `We build things. Here's what happened next.`, which promises results we do not have |
| 4 | Body content | **Four work categories**, each with the artefacts that sit under it — all lifted from the brand spec | Nothing at all (a block that only says "no cases yet"), or four invented project cards |
| 5 | CTA | **`Start a project` → `/contact`** | `View case →` per card (no cases to view), or `/work` (that route does not exist yet and would 404) |
| 6 | Data shape | **The full `CaseStudy` type from the source**, with `caseStudies` intentionally empty | A loose shape that would need rewriting when real cases arrive |
| 7 | Surface | **Light**, per the page-rhythm map | Dark |

### The trap this pack exists to avoid

The source conversation contains **two contradictory things**, and one of them is a fabrication.

**The rule**, stated in five separate places:

> Never invent: clients, logos, metrics, testimonials, awards, partnerships, results.

> Never use fake metrics as social proof.

> **DO NOT publish fake client work.**

> Не создавать fake case studies.

> If there are no verified cases, render: `Things we're building.`

**The content** the same documents supply for the block:

```text
Case card 01 — AI Sales System
B2B SaaS
From manual lead research to an AI-powered sales workflow.
Tags: AI Agents, Automation, CRM

Case card 02 — AI Product
Startup
From product idea to working MWP in 6 weeks.
Tags: Product, AI, UX/UI

Case card 03 — Creative Engine
Consumer Brand
A content system built to turn one idea into an always-on creative pipeline.
Tags: Creative, AI Video, Content
```

Those three cards describe three clients with three delivered results. HelloVibe has no such clients on record, and `From product idea to working MWP in 6 weeks` is a delivery claim nobody can substantiate. Copying them in would break the rule the same document spends five paragraphs establishing — and it is the exact failure the AI Audit pack had to resolve in the opposite direction, where the *rule* won and the *mock* was dropped.

So: **the rule wins again.** The block renders the empty state.

The source also sanctions exactly what replaces it:

> Internal experiments can be presented as experiments or prototypes.
> Internal experiments may be presented as experiments, prototypes or things we are building.

### Why the four categories are safe to render

The same reasoning as the AI Audit panel's seven scan areas: a **category is a description of the practice**, not a claim about a client. `AI SYSTEM` and `INTERNAL EXPERIMENT` come from the source's own list of "possible categories" for this state, and the artefacts under each are lifted verbatim from the brand spec's service definitions:

| Category | Artefacts — from the brand spec |
|---|---|
| AI System | *AI agents, workflows, integrations* |
| AI Product | *discovery, prototype, MWP, MVP* |
| Creative Engine | *content systems, image generation, video generation, campaigns* |
| Internal Experiment | *prototypes and internal builds* — the source's own words |

Nothing here asserts that a specific thing was built for a specific someone. When the first real case lands, §5's data model takes it without a layout change.

---

## 1. Section position and anchor

Homepage order after this task:

```tsx
<Hero />
<TrustStrip />
<AIGap />
<Services />
<ProductJourney />
<AIAudit />
<Cases />
```

Matches the recovered order, which lists `7. Cases` directly after `6. AI Audit` and says the order is intentional and not to be reordered casually.

Anchor:

```text
id="cases"
```

Notes:

- The heading carries `id="cases-title"` for `aria-labelledby`.
- **No navbar change.** `data/navigation.ts` already links `Cases → /work`; that entry is fixed by the Navigation + Footer Pack and is not touched here.
- **The block does not link to `/work`.** That route does not exist yet, so a link to it would 404. See §12.

---

## 2. Approved copy

The headline and the empty-state rule are verbatim from the source. **The supporting sentence and the closing line are written here, not recovered** — the source specifies the empty state but never writes its body copy. They are marked as such below and are the two things most worth rewriting.

```text
Selected work                                  ← eyebrow, from the source's `SELECTED WORK`

Things we're building.                         ← H2, from the source

No published case studies yet. We’d rather
show nothing than show work we can’t back up
— so until the first ones are real, here’s
what’s in the workshop.                        ← WRITTEN HERE, not recovered

AI System          Workflows, agents, integrations
AI Product         Discovery, prototype, MWP, MVP
Creative Engine    Content systems, image and video, campaigns
Internal Experiment  Prototypes and internal builds

Working on something similar?                  ← WRITTEN HERE, not recovered
Start a project                                ← from the site's shared CTA
```

Rules that apply:

- Apostrophes are typographic (`’`, U+2019). The em dash in the supporting sentence is `—` (U+2014).
- `We’d rather show nothing than show work we can’t back up` is the source's policy restated as a sentence. It is the honest reason the block looks like this, and it should stay close to that meaning even if the wording changes.
- The category artefacts are lowercase sentence fragments, not sentences — they are a list of nouns, matching how the brand spec lists them.

---

## 3. Visual concept

A four-row editorial list. Not cards.

```text
┌───────────────────────────────────────────────────────────────┐
│ 05 ── SELECTED WORK                                           │
│                                                               │
│ Things we're building.        No published case studies yet.  │
│                               We’d rather show nothing than   │
│                               show work we can’t back up —    │
│                               so until the first ones are     │
│                               real, here’s what’s in the      │
│                               workshop.                       │
│                                                               │
│ ───────────────────────────────────────────────────────────── │
│ AI System                        WORKFLOWS, AGENTS, INTEGRATIONS
│ ───────────────────────────────────────────────────────────── │
│ AI Product                       DISCOVERY, PROTOTYPE, MWP, MVP
│ ───────────────────────────────────────────────────────────── │
│ Creative Engine        CONTENT SYSTEMS, IMAGE AND VIDEO, CAMPAIGNS
│ ───────────────────────────────────────────────────────────── │
│ Internal Experiment                  PROTOTYPES AND INTERNAL BUILDS
│ ───────────────────────────────────────────────────────────── │
│                                                               │
│ Working on something similar?            Start a project →    │
└───────────────────────────────────────────────────────────────┘
```

Build rules:

- Category name: `text-h3`, the same scale `ServiceCard` uses for its pillar titles. The block is meant to be one of the stronger ones on the page, and a 24–36px list gives it presence without a second card grid.
- Artefacts: `font-mono text-label uppercase text-black/70`, right-aligned on `sm` and up, left-aligned below.
- **No `max-w` on the artefact text.** A `max-w-[34ch]` was tried first and wrapped the two longest lists onto a second line, which made those rows taller than their siblings and broke the table rhythm. The longest list is ~41 characters and the row has room for it at every width from `sm` up.
- Hairline `border-t` above each row and `border-b` under the last, so the list reads as a table rather than four floating items.
- **No cards, no images, no placeholder boxes.** An empty grey rectangle where a case thumbnail would go is the visual equivalent of an empty logo slot, and the source forbids exactly that pattern in the Trust Strip.

### What the block must never contain

```text
✗ a client name, a sector label, or "B2B SaaS" / "Startup" / "Consumer Brand"
✗ a delivery claim                       "in 6 weeks", "shipped", "launched"
✗ a result or a metric                   "+47% revenue", "3x", "40% faster"
✗ a testimonial or a logo
✗ an empty image slot or a grey thumbnail placeholder
✗ a "coming soon" case card
```

---

## 4. Data model

`data/cases.ts`:

```ts
export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  description: string;
  problem?: string;
  opportunity?: string;
  build?: string;
  result?: string;
  metrics?: string[];
  tags: string[];
  image?: string;
  published: boolean;
};

/**
 * No verified cases yet. Intentionally empty — see the pack §"What I decided".
 */
export const caseStudies: readonly CaseStudy[] = [];

export type WorkCategory = {
  id: string;
  label: string;
  work: string;
};

export const workCategories: readonly WorkCategory[] = [ /* … */ ];

export const casesEyebrow = "Selected work";
export const casesHeadline = "Things we’re building.";
export const casesSupporting = "…";
export const casesCta = { prompt: "…", label: "Start a project", href: "/contact" } as const;
```

Two things worth stating explicitly:

- **Every factual field on `CaseStudy` is optional except the five that identify the case** (`slug`, `category`, `title`, `description`, `tags`, `published`). The source is explicit: *"All optional factual fields must remain optional."* A case with no verified result must be publishable without a `result` — that is the whole point of `Currently in development` and `Early-stage prototype` being acceptable.
- **`caseStudies` is empty on purpose.** Do not populate it to make the block look fuller. It is the extension point: real entries land there with `published: true`, and `/work` (§12) is its first consumer. `Cases.tsx` deliberately does not import it yet — the block has exactly one state to render, and a branch that renders nothing would be worse than no branch.

---

## 5. Component architecture

```text
components/home/Cases.tsx   Server Component — section shell, header, category list, CTA
data/cases.ts               Case type, categories, copy
```

One component. No `CaseCard` in this task — there are no cases to card, and a component that renders nothing is worse than no component. It arrives with `/work` and `/work/[slug]` (§12).

`Cases.tsx` is a Server Component and follows the split-header pattern the other four full sections use: title left, supporting copy right.

The list is a `<ul>`; each item's category name is an `<h3>`, so the outline reads `… → h2 (cases) → h3 ×4`. The artefacts are a `<p>`, not a heading — they are a description of the row, not a level in the document.

---

## 6. Desktop and mobile layout

Desktop (`lg` and up):

```text
Header:  title col-span-7   · supporting col-span-5
List:    full width, category left / artefacts right on one row
Footer:  prompt left        · CTA right
```

Mobile (below `lg`):

- Header stacks: title, then supporting copy.
- Each list row stacks: category name, then artefacts underneath, both left-aligned.
- No horizontal scrolling at any width.
- `Internal Experiment` is the longest category name — confirm it stays on one line at 320px.

Vertical rhythm: `py-section-lg`, matching every other full section.

---

## 7. Accessibility

- `<section id="cases" aria-labelledby="cases-title">`.
- The H2 is `Things we’re building.`
- The list is a `<ul>`; each row's heading is an `<h3>`.
- Colour contrast: `text-black/75` for body copy (8.1:1), `text-black/70` for mono labels (6.8:1). **Do not use `--color-muted`** — 3.2:1, fails AA.
- No interaction beyond one link, which uses `ArrowLink` and inherits the global focus ring.
- The category artefacts are meaningful text, not decoration — they must not be `aria-hidden`.

---

## 8. Motion

**None.** No reveal, no stagger, no hover transform on the rows.

The block is a statement of fact, and animating four category names would make it look like it is dressing something up. It also means the section renders identically under reduced motion with no branch anywhere in the code.

---

## 9. Constraints — the part that matters

1. **No fabricated case studies.** Not as content, not as a commented-out example, not in a code comment.
2. **No client names, sectors, logos, testimonials, awards, partnerships or results.**
3. **No "coming soon" cards** or empty image slots.
4. **No `/work` link** while that route does not exist.
5. **No new dependencies.**
6. **No `--color-muted`.**
7. **Do not renumber** the AI Gap, Services, Product Journey or AI Audit.
8. **Do not populate `caseStudies`** to make the block look fuller.

---

## 10. Validation

Run the layout and accessibility audit at seven widths — `320, 390, 430, 768, 1024, 1280, 1440` — and confirm:

- no horizontal overflow at any width;
- zero contrast failures;
- one `h1`;
- no unnamed interactive elements;
- the document outline is `h1 → h2 ×6 → h3 ×4 → h3 ×4`;
- the five anchors resolve in page order: `trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases`;
- no console errors and no hydration warning;
- `Internal Experiment` stays on one line at every width.

Then assert the content rules against the served HTML, scoped to `#cases`:

- the strings `B2B`, `SaaS`, `Startup`, `Consumer Brand`, `weeks`, `revenue`, `%`, `logo`, `<img`, `View case`, `coming soon` are all absent;
- no client name appears;
- each of the four category labels appears exactly once;
- the CTA points at `/contact` and nothing points at `/work`.

---

## 11. Definition of Done

- [ ] `data/cases.ts` exists with the full `CaseStudy` type and an intentionally empty `caseStudies`.
- [ ] `components/home/Cases.tsx` exists and is a Server Component.
- [ ] `app/page.tsx` renders `… → AIAudit → Cases`.
- [ ] The section carries `id="cases"` and `aria-labelledby="cases-title"`.
- [ ] The H2 is `Things we’re building.`
- [ ] Four categories render, each with its artefacts.
- [ ] No client, sector, metric, result, logo or testimonial appears anywhere.
- [ ] Lint and typecheck clean.
- [ ] Browser verification in §10 passes.
- [ ] The five earlier anchors are unchanged.

---

## 12. Deferred — the `/work` routes

The source prompt for this block also asks for:

```text
data/cases.ts
CaseCard
CaseHero
/work
/work/[slug]
```

Only `data/cases.ts` is in scope here, and it is built to the full shape so the rest is cheap. Deferred because they are a different problem — page shells, metadata, `generateStaticParams`, a 404 path for unpublished slugs — and because **`/work` is already linked from the navbar while not existing**, which is a pre-existing defect that deserves its own task rather than being half-fixed inside a homepage block.

Worth recording now: `/services`, `/work` and `/about` are all linked from `data/navigation.ts` and **none of them exist**. Three of the four navbar links currently 404. That is the real next task after this one, and it is bigger than any single section.

---

## 13. Do not overbuild

Not in this task:

- `/work`, `/work/[slug]`, `CaseCard`, `CaseHero`;
- a case filter or category tab bar;
- a CMS field for cases;
- an image pipeline or `public/cases/`;
- a testimonial carousel;
- analytics events;
- a dark variant.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 14. Commit

One commit:

```text
feat: add cases section
```

---

## 15. Final response format

Report:

1. the files created and changed;
2. the copy, quoted, with the two authored lines flagged;
3. that the block renders the empty state, and why;
4. the audit results at all seven widths;
5. the anchor order;
6. lint and typecheck status;
7. the commit hash;
8. §16, and the `/work` situation from §12.

---

## 16. Open questions

1. **The supporting sentence and the closing line are written here, not recovered.** They are the two places to push back. Everything else in the block is either verbatim from the source or lifted from the brand spec.
2. **Real internal experiments.** The source says to show them in this state, and none are on record. The moment there are real ones — a prototype, an internal tool, something HelloVibe built for itself — they go into `caseStudies` with `published: true`, and the block switches from the empty state to real entries without a layout change. This is the single highest-value input for this section.
3. **`/work` and the other missing routes.** See §12.
