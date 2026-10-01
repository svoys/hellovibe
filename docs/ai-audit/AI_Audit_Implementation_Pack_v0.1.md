# HelloVibe — AI Audit Implementation Pack v0.1

## Purpose

Implement **Section 06 — AI AUDIT** as a full homepage block after the Product Journey.

It exists because the five blocks above it describe what HelloVibe does and how it works, but never give a visitor who has no brief yet a way *in*. AI Audit is the commercial entry product — the smallest, lowest-commitment first step — so this section is the first block on the page whose job is conversion rather than explanation.

This is a focused implementation task. Do NOT build or modify the Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, Navbar, Footer, Cases, Method, Product Studio, Creative Engine, Why HelloVibe, Engagement Models, FAQ, the final CTA, case studies, the contact form, a CMS, a database, authentication or analytics.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, the Navigation + Footer Pack, the Product Journey pack and the Trust Strip pack.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

Unlike the Trust Strip, there is **no dedicated AI Audit pack** in the source conversation. The section is specified in fragments across four different documents, and two of them contradict each other. These judgement calls resolve that.

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`04`** — AI Gap is `01`, What We Do `02`, Product Journey `03` | Unnumbered like the Hero and Trust Strip |
| 2 | Eyebrow | **`Not sure where to start?`** — the source's own kicker for this block | `AI Audit`, matching the section-name style the shipped site uses elsewhere |
| 3 | The diagnostic panel | **A process diagram, not a results dashboard.** It shows what the audit *looks at*, never what it *found* | The source's literal mock, which prints `12 processes analyzed / 7 AI opportunities found / 3 high-impact opportunities` |
| 4 | The progress bar | **Dropped.** The source's `Estimated automation potential ████████░░` is a fabricated metric with a fabricated bar | Keep the bar, add a `DEMO` tag |
| 5 | CTA target | **`/services`** — the approved route where the AI Strategy pillar lives | `/contact`, which is the *act* step, not the *explore* step; or a new `/ai-audit` route, which would be inventing a page |
| 6 | Deliverables | **Real content in the DOM**, as a numbered list — not decoration inside the panel | Render them inside the panel as part of the visual |
| 7 | Surface | **Light**, per the page-rhythm map | Dark |

### The contradiction, and why decision 3 and 4 matter

The source is unusually strict about fabricated proof, and it states the rule four separate times:

> Any dashboard or metric visualization on the marketing site must be clearly conceptual/demo unless backed by real data.
> Never use fake metrics as social proof.

> Visual diagnostic interface is a **conceptual UI**.
> It must not imply a real automated analysis unless an actual tool exists.
> Avoid fake: `"7 opportunities found"` — unless explicitly labeled `DEMO` or replaced with static illustrative information.

> AI Audit visualizations are conceptual. Do not invent metrics. Do not make fake dashboards look like real customer data.

…and then, in the same document, the section mock is:

```text
BUSINESS SCAN
12 processes analyzed
7 AI opportunities found
3 high-impact opportunities
Estimated automation potential
████████░░
NEXT: Prioritize → Build → Measure
```

**That mock is precisely the thing the other three passages forbid.** There is no real audit tool, so `12 processes analyzed` is invented, and a bar captioned `Estimated automation potential` is a fake measurement however it is styled. A `DEMO` tag does not make a number true — it only makes it honest, and the source offers a second, better option: *replaced with static illustrative information*.

This pack takes that second option. The panel keeps the diagnostic-interface **look** — mono type, hairline rows, a status mark, a `NEXT` flow — and fills it with the one thing we can state without inventing anything: the areas the audit actually examines. No counts, no percentages, no bars.

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
```

This matches the recovered order, which lists `6. AI Audit` directly after `5. Product Journey` and says the order is intentional and not to be reordered casually.

Anchor:

```text
id="ai-audit"
```

Notes:

- The section heading carries `id="ai-audit-title"` so the section can use `aria-labelledby` without an extra wrapper.
- **No navbar entry.** `data/navigation.ts` is not touched. The Navigation + Footer Pack fixes the four nav labels, and none of them is "AI Audit".
- This is the **last** section in this task. Cases, Method and everything after it stay unbuilt.

---

## 2. Approved copy

Verbatim from the source conversation, §07 AI AUDIT and §10 AI Audit.

```text
Not sure where to start?

Find your best AI opportunities.

We’ll look at your business, processes and existing technology to identify where AI can create the most meaningful impact.

AI opportunity map
Automation opportunities
Priority use cases
ROI hypotheses
Implementation roadmap

Explore AI Audit

Typically 1–2 weeks
```

Rules that apply to this copy:

- The apostrophe in `We’ll` is typographic (`’`, U+2019), matching every other section.
- The dash in `1–2 weeks` is an en dash (`–`, U+2013), not a hyphen.
- `AI opportunity map` is singular, `Automation opportunities` and `Priority use cases` and `ROI hypotheses` are plural — this is the source's own inconsistency and it is preserved, because these are the published names of the deliverables.
- `Explore AI Audit` is the link text. The `→` in the source is rendered by `ArrowLink`'s icon, not typed into the string.

---

## 3. Visual concept — the diagnostic panel

One panel, `components/home/AIAuditVisual.tsx`, to the right of the deliverables.

```text
┌─────────────────────────────────────────────┐
│ ▪ BUSINESS SCAN                   [ DEMO ]  │
├─────────────────────────────────────────────┤
│ WHAT WE LOOK AT                             │
│                                             │
│ Business model           ─────────────────  │
│ Processes                ─────────────────  │
│ Customer journey         ─────────────────  │
│ Operations               ─────────────────  │
│ Sales                    ─────────────────  │
│ Marketing                ─────────────────  │
│ Existing technology      ─────────────────  │
├─────────────────────────────────────────────┤
│ NEXT   Prioritize → Build → Measure         │
└─────────────────────────────────────────────┘
   Illustrative interface — conceptual, not a live analysis.
```

Build rules:

- Panel chrome: `border border-black bg-white`, matching `AIGapVisual`.
- Header row: a `size-2` square in `--color-black` beside `BUSINESS SCAN`, then a `DEMO` tag pushed right.
- The `DEMO` tag uses the `vibe` variant of `Tag` — the token is documented as *system / progress / structure*, which is exactly what this panel is.
- Rows: mono uppercase area name, then a `1px` rule in `--color-line` filling the remaining width. **Every rule is the same length.** A set of rules that varied in length would read as a bar chart of invented measurements, which is the failure mode §"What I decided" exists to avoid.
  - The label column is `minmax(0,10rem)`, and the constraint is that `Existing technology` must fit on **one line at every width** — it needs ~153px at the smallest step of `text-label`. `8.5rem` was tried and wrapped that label to two lines at 320px, which makes one row taller than its siblings and breaks the panel's rhythm. A short rule at 320px (62px) is the better trade.
- Footer: `NEXT` label, then `Prioritize → Build → Measure` with the arrows `aria-hidden`.
- Caption under the panel, `text-small`, `text-black/70`: `Illustrative interface — conceptual, not a live analysis.` It is deliberately **not** the uppercase mono the rest of the panel uses — the instrument labels are styling, this sentence is the studio speaking, and it has to be read rather than skimmed.

**Green/orange discipline.** The source asks for the brand's green/orange system to be used intentionally. `--color-vibe` appears **exactly once** — on the `DEMO` tag, where it marks the panel as a system artefact rather than a result. The status square stays black so the green has nothing to compete with. `--color-orange` is **not used at all** here: orange means *experiment / creative energy* and belongs to the Creative Engine block, not to a diagnostic. Using both would make the panel louder than the section it serves.

### What the panel must never contain

```text
✗ any number that looks like a finding    "7 opportunities", "12 processes", "3 high-impact"
✗ any percentage or score                 "68%", "8/10"
✗ any bar whose length implies a value
✗ a date, a duration or a status like "complete"
✗ a client name, a logo or a chart axis
```

The seven scan areas are safe because they are a **fixed description of the method**, not an observation about any business. They come from the product architecture section of the source conversation, which lists what the audit researches.

---

## 4. Data model

`data/ai-audit.ts`:

```ts
export type AuditDeliverable = {
  id: string;
  number: string;
  label: string;
};

export const auditDeliverables: readonly AuditDeliverable[] = [
  { id: "opportunity-map", number: "01", label: "AI opportunity map" },
  { id: "automation", number: "02", label: "Automation opportunities" },
  { id: "use-cases", number: "03", label: "Priority use cases" },
  { id: "roi", number: "04", label: "ROI hypotheses" },
  { id: "roadmap", number: "05", label: "Implementation roadmap" },
];

/** Areas the audit examines. Method, not findings — see §3. */
export const auditScanAreas: readonly string[] = [
  "Business model",
  "Processes",
  "Customer journey",
  "Operations",
  "Sales",
  "Marketing",
  "Existing technology",
];

export const auditEyebrow = "Not sure where to start?";
export const auditHeadline = "Find your best AI opportunities.";
export const auditDescription =
  "We’ll look at your business, processes and existing technology to identify where AI can create the most meaningful impact.";
export const auditMicrocopy = "Typically 1–2 weeks";
export const auditCaption = "Illustrative interface — conceptual, not a live analysis.";
export const auditCta = { label: "Explore AI Audit", href: "/services" } as const;
```

The `number` on a deliverable is an index, not a priority. Do not sort by it and do not let it imply ranking — the source lists them in this order and calls them a set.

---

## 5. Component architecture

```text
components/home/AIAudit.tsx        Server Component — section shell, header, deliverables, CTA
components/home/AIAuditVisual.tsx  Client Component — the panel, for the in-view reveal only
data/ai-audit.ts                   Copy and structure
```

`AIAudit.tsx` is a Server Component. It follows the split-header pattern `Services` and `ProductJourney` use — title left, description right — so the block does not read as a fourth Hero.

`AIAuditVisual.tsx` is a Client Component for the same single reason `AIGapVisual` is: `useInView`. It must use `useMediaQuery(REDUCED_MOTION_QUERY)` and **not** Motion's `useReducedMotion()`. The latter resolves at module load, so it reports `true` on the first client render while the server rendered `false` — a hydration mismatch on any attribute derived from it. This bug has already been fixed four times in this repository; do not reintroduce it.

The panel is `role="img"` with a full `aria-label` describing what it shows, because the rows are a diagram rather than prose.

---

## 6. Desktop and mobile layout

Desktop (`lg` and up):

```text
Header:  title col-span-7            · description col-span-5
Body:    deliverables col-span-5     · panel col-span-6 (starting col 7)
Footer:  microcopy left              · CTA right
```

Mobile (below `lg`):

- Everything stacks in source order: header, description, deliverables, panel, footer.
- The panel goes **after** the deliverables, so a narrow-screen visitor reads what they get before seeing the interface that produces it.
- No horizontal scrolling at any width.

Vertical rhythm: `py-section-lg`, matching every other full section.

---

## 7. Accessibility

- `<section id="ai-audit" aria-labelledby="ai-audit-title">`.
- The H2 is `Find your best AI opportunities.` — the outline reads `h1 → h2 ×4 → h2 → h3 ×4 → h2 → h2`.
- The deliverables are an `<ol>`, because the source numbers them and the numbering is meaningful (they are five distinct artefacts, not a ranking).
- The panel is `role="img"` with an `aria-label` that states it is a conceptual interface. A screen reader must not be able to mistake it for a real analysis either — the disclaimer is part of the accessible name, not only a visual caption.
- `Prioritize → Build → Measure` arrows are `aria-hidden`; the words carry the meaning.
- Colour contrast: `text-black/75` for the description (8.1:1), `text-black/70` for mono labels (6.8:1). **Do not use `--color-muted`** — 3.2:1, fails AA.
- The `DEMO` tag is `bg-vibe` with black text; black on `#c7ff3d` clears AA comfortably. Do not invert it.
- Focus: `ArrowLink` already inherits the global `:focus-visible` ring. Nothing new is needed.

---

## 8. Motion

Minimal, and all of it decorative.

- The panel rows fade and translate up in a short stagger when the panel enters the viewport — the same `useInView` + CSS-transition approach as `AIGapVisual`, so the animation stays off the main thread.
- The opacity floor is **0.8, not 0**, so every row stays legible if the trigger never fires.
- Only `transform` and `opacity` animate.
- Under reduced motion the panel renders in its final state in one step, via the `data-shown` attribute. No branch in the component, no separate code path.
- Nothing pulses, blinks or loops. A looping indicator would read as a live process, which is the one impression this section must not give.

---

## 9. Constraints — the part that matters

Hard rules, all of them restatements of the source:

1. **No invented metrics.** Not in the copy, not in the visual, not in an `aria-label`, not in a comment.
2. **No fake dashboard.** The panel must not look like a product screenshot showing real customer data.
3. **No client names, logos or testimonials.**
4. **No new routes.** `Explore AI Audit` points at `/services`, which already exists in `data/navigation.ts`. Do not create `/ai-audit` or `/services/strategy`.
5. **No new dependencies.** No chart library, no icon library beyond `lucide-react`, no animation library beyond `motion`.
6. **No `--color-muted`** anywhere in the section.
7. **Do not renumber** the AI Gap, Services or Product Journey.
8. **No pricing.** The source's business model puts the audit at `$5–15k`; that is internal and does not appear on the site. The only figure allowed near this section is `Typically 1–2 weeks`, which is a duration the source publishes deliberately.

---

## 10. Preserve

- The homepage order of the five existing sections.
- Every existing section id: `#trust`, `#the-ai-gap`, `#what-we-do`, `#how-we-work`.
- `NEXT_SECTION_ID` in `Hero.tsx` — it points at `#trust` and must not move.
- `--color-muted` as a token. Fixing contrast is done by choosing a different utility at the call site, never by editing the palette.
- The `@theme static` block in `app/globals.css` as the single source of design truth.

---

## 11. Validation

Run the layout and accessibility audit at seven widths — `320, 390, 430, 768, 1024, 1280, 1440` — and confirm:

- no horizontal overflow at any width;
- zero contrast failures;
- one `h1`;
- no unnamed interactive elements;
- the document outline is `h1 → h2 → h2 → h2 → h2 → h2 → h3 → h3 → h3 → h3 → h2`;
- the four anchors still resolve and still appear in page order;
- no console errors and no hydration warning on load;
- the panel's height is stable across reloads at the same width.

Then assert the content rules directly against the rendered HTML:

- the strings `processes analyzed`, `opportunities found`, `high-impact`, and `%` do not appear in the section;
- the only digits inside the panel are the `DEMO` tag's absence of digits and the deliverables' `01`–`05` outside it;
- `logo`, `Logo`, `<img` and `Trusted by` are absent;
- the seven scan areas and the five deliverables each appear exactly once.

---

## 12. Definition of Done

- [ ] `data/ai-audit.ts` exists with all exports `readonly`.
- [ ] `components/home/AIAudit.tsx` exists and contains no `"use client"`.
- [ ] `components/home/AIAuditVisual.tsx` exists, is a Client Component, and uses `useMediaQuery(REDUCED_MOTION_QUERY)`.
- [ ] `app/page.tsx` renders `Hero → TrustStrip → AIGap → Services → ProductJourney → AIAudit`.
- [ ] The section carries `id="ai-audit"` and `aria-labelledby="ai-audit-title"`.
- [ ] Copy is verbatim from §2, including the typographic apostrophe and the en dash.
- [ ] The panel contains no number, no percentage and no value bar.
- [ ] Lint and typecheck clean.
- [ ] Browser verification in §11 passes.
- [ ] `#trust`, `#the-ai-gap`, `#what-we-do` and `#how-we-work` are unchanged.

---

## 13. Do not overbuild

Not in this task:

- a booking flow, a calendar embed or a scheduler;
- a pricing table;
- an interactive "self-assessment" quiz;
- an animated counter, gauge or chart;
- a downloadable PDF;
- a form — the contact form is a separate task with its own pack;
- analytics events;
- a `/ai-audit` page.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 14. Commit

One commit:

```text
feat: add AI audit section
```

---

## 15. Final response format

Report:

1. the files created and changed;
2. the copy, quoted;
3. what the panel shows and — explicitly — what it deliberately does not;
4. the audit results at all seven widths;
5. the anchor order;
6. lint and typecheck status;
7. the commit hash;
8. anything in §16 that is still open.

---

## 16. Open questions

1. **Eyebrow.** `Not sure where to start?` is the source's kicker for this block, but every shipped section uses a section-name eyebrow instead. If consistency wins, this becomes `AI Audit` — a one-line change in `data/ai-audit.ts`.
2. **CTA target.** `/services` is the approved route closest to this content. If a dedicated AI Audit page is ever built, this is the link that should move.
3. **Numbering.** `04` assumes the Hero and Trust Strip stay unnumbered. If they are ever numbered, every section after them shifts.
