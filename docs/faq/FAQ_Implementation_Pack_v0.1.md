# HelloVibe — FAQ Implementation Pack v0.1

## Purpose

Implement **Section 13 — FAQ** as a homepage block after Engagement Models.

The source's job for this block is the last objection before the close. It answers the six things a visitor is still unsure about, and it is the only block on the page the reader drives.

This is a focused implementation task. Do NOT build or modify the Navbar, Hero, Vibe Machine, Trust Strip, AI Gap, Services, Product Journey, AI Audit, Cases, Method, Product Studio, Creative Engine, Why HelloVibe, Engagement Models, the final CTA, the Footer, the contact form, a CMS, a database, authentication or analytics.

**Also not in this task:** any route, any new page, any new dependency, any new component in `components/ui/`. FAQ is a homepage block and a `data/` module. It touches `app/globals.css` — the only shared file it needs — and adds no JavaScript at all.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, and the Engagement Models, Why HelloVibe, Creative Engine, Product Studio, Method, Cases, AI Audit, Trust Strip, Product Journey and Static Pages packs.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **`11`** — continuing the visitor-visible sequence (AI Gap `01` … Engagement Models `10`) | `13`, the block's position in the full 15-item page order. See §1 |
| 2 | Surface | **Light** — the warm background, `border-t border-line` | The source's page-rhythm map says `LIGHT` for this block, so there is nothing to decide. See §4 |
| 3 | Disclosure widget | **Native `<details>` / `<summary>`** | A `"use client"` component holding an open index and writing `aria-expanded`. See §3 — this is the block's main decision and the source pulls both ways |
| 4 | Answers | **Wording A** — the variant the source gives twice, character-identical | Wording B, the shorter version given once. See §2 |
| 5 | Eyebrow | **`FAQ`** | No eyebrow. The source gives none, but every other block carries one and the meta row would otherwise be a bare number. `FAQ` is the source's own name for the section. See §2 |
| 6 | H2 | **`Questions people usually ask.`** | Nothing else is offered — it is given once, in the pass whose answers ship. See §2 |
| 7 | Layout | **Full container width** | A capped column. Tried first at eight of twelve columns and rejected on sight — see §5 |
| 8 | Items open at once | **Any number.** No `name` attribute | An exclusive accordion. See §3 — it would violate the source's own "no layout jump beyond expected expansion" |
| 9 | Motion | **One CSS keyframe on `[open]`** | No animation at all, or an animated height. See §6 |
| 10 | Heading level | Each question is an `<h3>` inside its `<summary>` | Plain text. `<summary>` accepts heading content, and the heading is what makes the six questions navigable. See §11 |

---

## 1. Section position and anchor

FAQ is the **thirteenth** item in the source's page order:

```text
11. Why HelloVibe  12. Engagement Models  13. FAQ  14. Final CTA  15. Footer
```

Its anchor is **`#faq`**, exported as `FAQ_SECTION_ID` from `components/home/FAQ.tsx`.

**Nothing links to it.** No navbar entry, no footer entry, no in-page link points at this anchor — the same situation as Engagement Models. It exists so the block is addressable and so the anchor chain stays complete and testable:

```text
trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases → method
      → product-studio → creative-engine → why-hellovibe → engagement-models → faq
```

**The number is `11`, not `13`.** Two numbering schemes exist in the source — the position in the full page order, and the visitor-visible sequence of *indexed* blocks — and only the second one ships. Hero and Trust Strip carry no index, so the eleventh indexed block is `11`. Same trap as Why HelloVibe §1, Creative Engine §2 and Engagement Models §1.

---

## 2. Approved copy

All verbatim. Nothing here is written, only selected.

```text
11 —— FAQ

Questions people usually ask.

─────────────────────────────────────────────────────────────────────────────
Do you work with existing companies or startups?                          −
  Both.
  We work with founders building new products and established teams
  looking for practical ways to use AI.
─────────────────────────────────────────────────────────────────────────────
Do we need to know exactly what we want to build?                         +
─────────────────────────────────────────────────────────────────────────────
Do you only work with AI?                                                 +
─────────────────────────────────────────────────────────────────────────────
Can you take a product from idea to launch?                               +
─────────────────────────────────────────────────────────────────────────────
Can you work with our existing team?                                      +
─────────────────────────────────────────────────────────────────────────────
How do projects start?                                                    +
─────────────────────────────────────────────────────────────────────────────
```

### The source gives this block six times

| Pass | What it supplies |
|---|---|
| `# FAQ` (narrative map) | A bare topic list — `existing companies vs startups`, `how projects start`. Not copy |
| `# 23. FAQ` | **"Accessible accordion."** plus the six implementation requirements. No copy |
| `# 17. FAQ` | The six questions and answers, **wording A**. No H2 |
| `# 14. FAQ` | The H2, `Accordion.`, and the six questions and answers, **wording A — character-identical to `# 17`** |
| Mobile behaviour | `### FAQ / Accordion.` — confirms the accordion at mobile, so there is no desktop/mobile fork |
| `# 13. FAQ` | `Минимум 5 вопросов.` and the same six questions with **shorter answers, wording B** |

**Wording A ships.** It is given twice, character-identical, and the pass that supplies it also supplies the H2 and the `Accordion.` instruction — so the H2, the widget and the answers all come from one coherent pass. Wording B says less about the same six things; nothing in it contradicts what ships.

This is the same rule the Creative Engine module applies to its six-item list ("the six-item sequence is the one given twice verbatim") and the opposite of the Engagement Models case, where the *majority of the full-phrasing passes* won. The consistent principle: **the form the source repeats verbatim is the form that ships.**

### The answers keep their paragraph breaks

Four of the six answers lead with a one-word verdict — `Both.`, `No.`, `Yes.` — and then explain. That is deliberate FAQ writing: the direct answer first, the nuance second. The data model keeps them as an array of paragraphs so the break survives (§7); flattening them into one string would lose it.

### Apostrophes

The source writes `there's`, `We'll` and `don't` straight and still ships the curly form everywhere else. The site's convention wins, so all three are typographic (`’`, U+2019) — the same call recorded in the Creative Engine and Product Studio modules.

### The eyebrow is derived, not invented

The source gives this block an H2 and **no eyebrow**. Every other block on the page carries one, and dropping it here would leave the meta row as a bare `11`. `FAQ` is the source's own name for the section — it is how the block is listed in the page order and how the requirement pass titles it — so it is derived exactly the way `Why HelloVibe` and `How we work` were.

---

## 3. The accordion: native `<details>`, and how the source pulls both ways

This is the block's real decision, and the source gives two instructions that point in opposite directions.

**Instruction one — the requirements list:**

> Accessible accordion.
> Requirements:
> - keyboard accessible
> - proper button
> - `aria-expanded`
> - associated content
> - only necessary animation
> - no layout jump beyond expected expansion

Read alone, `proper button` and `aria-expanded` describe a hand-built accordion: a `<button>` carrying `aria-expanded` and `aria-controls`, with state held in a client component.

**Instruction two — the technical requirements, in the same document:**

> Use Server Components by default. Use Client Components only when needed.

**A native `<details>` / `<summary>` pair makes the client component unnecessary**, and that resolves the conflict in favour of the platform element. Every item on the requirements list is satisfied without writing a single line of JavaScript:

| Requirement | How `<details>` meets it |
|---|---|
| keyboard accessible | `<summary>` is focusable and Enter/Space toggle it, natively |
| proper button | `<summary>` carries a dedicated interactive role — see the finding in §13b — and the browser maintains its state |
| `aria-expanded` | The expanded/collapsed state is exposed to assistive technology by the browser and **cannot drift from the visual state**, because there is no second source of truth |
| associated content | By containment — the answer is the element's own content, so no `aria-controls` wiring is needed |
| only necessary animation | One CSS keyframe (§6) |
| no layout jump beyond expected expansion | The expansion is instant; the item grows by exactly the answer's height and nothing else moves |

Three further consequences, all of them the reason to prefer this over a hand-built widget:

- **The answers are in the server-rendered HTML.** A JS accordion that renders only the open panel hides five of six answers from a crawler and from anyone without JavaScript. This block asserts the opposite (§13c) — and it is the same trade the Product Journey block already made when it kept every panel in the DOM.
- **Zero bytes of client JavaScript.** No `"use client"`, no state, no hydration surface. After two blocks built this way, FAQ is the third in a row with no client boundary.
- **Find-in-page works.** Ctrl+F finds an answer inside a closed item and the browser opens it. A hand-built accordion cannot do that.

### Any number of items may be open, on purpose

The source does not say whether the accordion should be exclusive. Two reasons it is not:

1. An exclusive accordion collapses one answer when another opens — **a layout jump beyond the expected expansion**, which is the one behaviour the source rules out by name.
2. `<details name="…">` (exclusive grouping) is newer than everything else this block relies on, so leaving it out keeps the behaviour identical in every browser.

### What was given up

Honesty about the trade: a hand-built accordion could animate its height and could carry a literal `aria-expanded` attribute in the DOM. Neither is worth a client boundary here, and the second is not even a real advantage — see §13b.

---

## 4. Surface: light

The source's **PAGE RHYTHM** map assigns this block `LIGHT`:

```text
… Creative Engine EXPERIMENTAL · Why HelloVibe LIGHT · Engagement LIGHT
· FAQ LIGHT · Final CTA DARK · Footer DARK
```

So it keeps the ordinary warm background and `border-t border-line`, with no new surface hook: no `data-surface` attribute, no focus-ring override, no `::selection` override, no `tone` change.

This is the fourth light block in a row, which is what the map asks for before the Final CTA goes dark.

**The three deviations from the map remain open** — AI Gap, Journey and Cases are labelled differently in the map than they shipped. Both readings are in the Why HelloVibe pack §4c. Still not touched here; raised again in §18.

---

## 5. Layout: full width, and a rejected cap

```text
<section id="faq" aria-labelledby="faq-title" class="border-t border-line">
  Container py-section-lg
    hv-grid
      col-span-4 md:col-span-8 lg:col-span-7   → SectionHeader (number 11)
    hv-grid mt-16
      col-span-4 md:col-span-8 lg:col-span-12  → <ul> of six <li>
```

Each `<li>` is `border-t border-line` and holds one `<details class="faq-item">`:

| Part | Treatment |
|---|---|
| `<summary>` | `flex cursor-pointer items-center justify-between gap-6 py-6` |
| Question | `<h3 class="faq-question text-h4 text-black/75">` |
| Mark | `<span aria-hidden="true" class="faq-mark" />` — CSS only (§6) |
| Answer | `.faq-answer pb-8`, each paragraph `max-w-[62ch] text-body text-black/75`, subsequent ones `mt-3` |

The list closes with a `border-b` so the block does not end on a dangling rule.

### The cap was tried and rejected

The accordion was **first built at eight of twelve columns** (888px at 1440), on the theory that a question and a marker 1300px apart is a row nobody can read across.

A 1440px screenshot killed it. The capped column stopped the row rules roughly **450px short of the container edge** — so the rules no longer lined up with the section's own top rule, with Method's rail, with the Engagement card grid, or with any other rule on the page. It read as an unfinished block, not a deliberate measure.

Full width is correct here because **a wide row is not a reading problem**: the question text does not stretch, the whole row is the click target, so the space between the question and the mark is affordance rather than empty copy. The measure that matters — the answers — keeps its own `max-w-[62ch]` cap. Method already establishes the pattern of a full-width rule with a narrower text column.

---

## 6. Motion: one CSS keyframe, no height animation

The source asks for *"only necessary animation"*. What ships is exactly one animation:

```css
@keyframes faq-reveal {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.faq-item[open] .faq-answer {
  animation: faq-reveal 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

The expansion itself is deliberately **instant**. Animating a disclosure's height needs either script or `interpolate-size: allow-keywords`, and a sliding height is precisely the "layout jump beyond expected expansion" the source rules out. The answer is already in the DOM; opening reveals it, and the fade is the only thing that moves.

The plus-to-minus mark is a `transform` transition on one pseudo-element, not an animation (§9).

**Reduced motion needs no rule of its own.** The global block at the foot of `globals.css` already forces `animation-duration: 0.01ms !important` on everything, and the probe confirms the reveal measures under 0.01s under `prefers-reduced-motion` (§13b).

---

## 7. Data model

`data/faq.ts` — new file, 119 lines.

```ts
export type FaqItem = {
  id: string;
  question: string;
  answer: readonly string[];
};

export const faqItems: readonly FaqItem[];
export const faqEyebrow = "FAQ";
export const faqHeadline = "Questions people usually ask.";
```

`answer` is an array rather than a string because the source's paragraph breaks are content (§2). The `id` is a React key only — the native `<details>` element needs no `aria-controls` wiring, so nothing hangs off it in the DOM.

---

## 8. Component architecture

`components/home/FAQ.tsx` — new file, 132 lines. **Server Component.**

```text
FAQ                    (server)  ← the only file in the section
  SectionHeader        (server)  ← shared primitive, unchanged
  <details>/<summary>  (native)  ← no component, no state, no JS
```

There is no client component anywhere in this block, and no `<svg>` either — the mark is drawn with two pseudo-elements. The section's only interactive elements are six native disclosure rows.

---

## 9. Shared-component changes

**One: `app/globals.css`**, +84 lines, in a new `FAQ — the disclosure list` block placed before the motion-preferences section. Three jobs:

1. **Remove the platform marker** — `list-style: none` on the summary plus `::-webkit-details-marker { display: none }`, because `.faq-mark` replaces it and can show state.
2. **Draw the mark** — two 1px pseudo-element bars. `::before` is the horizontal bar that survives in both states; `::after` is the vertical bar, which scales to 0 when the item is open, turning `+` into `−` with no second element and no glyph to mis-render.
3. **Reveal the answer** — the keyframe in §6.

The hover/open colour of the question is also here rather than as a Tailwind `hover:` utility, because **the whole row is the target**: a `hover:` utility on the `<h3>` would only fire when the pointer is over the text itself, not over the row.

No change to `Button`, `SectionHeader`, `Container`, `ArrowLink`, `Tag` or any other primitive. This block adds no icons, no buttons and no links.

---

## 10. Layout, measured in the browser

### Surface

```text
background-color   rgba(0, 0, 0, 0)        → inherits the warm body background
border-top         1px rgb(216, 213, 205)  → --color-line
data-surface       absent                  → light block, no surface hook
```

### Resting geometry, all six items closed

```text
width  section h  row width  rows  overflowX
1440      1038       1344      6       0
 768       861        706      6       0
 375       916        335      6       0
```

Every row is exactly the container width at every breakpoint, and all six rows are identical in width — the standing convention that unequal rules read as a bar chart, i.e. as an invented measurement.

Section height is a little taller at 375 than at 768 because the questions wrap on a phone.

---

## 11. Accessibility

- `<section aria-labelledby="faq-title">` with `id="faq-title"` on the `h2`.
- **Each question is an `<h3>` inside its `<summary>`.** `<summary>` explicitly accepts heading content, and the heading is what puts the six questions into the document outline so a screen-reader user can jump between them. `text-h4` matches the size the Why HelloVibe labels use, so the two lists read as the same weight of thing.
- The mark is `aria-hidden` — it is decoration, and the expanded state is already exposed.
- Focus: the global base rule already lists `summary` among the elements that get an outline, and `:focus-visible` supplies a 2px `--color-black` ring at about 17:1 on the warm background. The 8-width audit reports no missing ring (§13a).
- The expanded state is exposed by the browser and asserted at the accessibility-tree level, not assumed (§13b).

---

## 12. Constraints

- No new dependency, no new route, no token change, no new primitive.
- No fabricated client, deliverable, metric, logo, award, price, year or timeline — in copy, in `aria-label`, or in a code comment.
- No imagery of any kind: no `<img>`, no `<svg>`, no `<figure>`. The mark is CSS.
- No links in the block — the source gives this block no CTA, and the Final CTA is its own section.
- Typographic apostrophes in visible text.
- The six questions stay in the source's order, and the set stays at six.

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

### b. Interaction and accessibility — 23/23, driven through CDP

A dedicated probe drives real input rather than dispatching synthetic events, and reads the accessibility tree through the `Accessibility` domain:

| Step | Asserted |
|---|---|
| Initial | six items, all closed; a closed item is **exactly as tall as its summary**; the answer is not painted; the mark is a plus; all six answers are in the DOM anyway |
| Accessibility tree | the summary carries a dedicated interactive role; `expanded === false` |
| Mouse | a real click opens the item, it becomes taller than its summary, the answer is painted, the plus becomes a minus, the other five stay closed |
| Accessibility tree | `expanded === true` |
| Independence | opening a third item leaves the first open; two are open at once |
| Keyboard | a summary takes focus; **Enter** closes then opens; **Space** closes then opens |
| Reduced motion | under `prefers-reduced-motion: reduce` the reveal measures under 0.01s |
| Console | no errors, no exceptions |

**Two genuine platform findings came out of this, both of which produced a false failure first:**

1. **A closed `<details>` still lays out its content's box.** Chrome hides closed content with `content-visibility`, not `display: none`, so the answer's own `getBoundingClientRect()` reports a **non-zero height on a closed item** — 119, 155, 94, 94, 119 and 94px across the six. The assertion "no answer is rendered while closed" failed loudly and looked like a real bug.
   It is not: the closed item consumes no space, because its height equals its summary's height exactly. The correct assertions are **`details.height === summary.height`** and **`answer.checkVisibility()`**, both of which pass. *An implausible measurement is a measurement bug until proven otherwise — the same lesson as the 1:1 contrast and the phantom screenshot box.*

2. **Chrome exposes `<summary>` as `DisclosureTriangle`, not `button`.** The accessibility tree reports `role: "DisclosureTriangle"` with `expanded: false`, and `expanded` flips to `true` on open. So the source's `aria-expanded` requirement is met **in the accessibility tree** — which is what the requirement is for — while no literal `aria-expanded` attribute exists in the DOM. Platform mappings translate the disclosure role to a button with an expanded/collapsed state on Windows and a disclosure triangle on macOS.
   This is the one place the implementation differs in *form* from the source's wording while satisfying its intent. It is recorded here rather than hidden, and it is the honest price of §3.

### c. Content assertions — 40/40

Scoped to `#faq` in the served HTML, tags stripped before asserting on text.

Checks worth naming:

- **"all six answers are present in the server HTML"** — a deep equality against the six expected strings. This is the assertion that makes the native-`<details>` choice worth it: a JS accordion that renders only the open panel fails here.
- **"no item ships pre-opened"** — every `<details>` tag is checked for an `open` attribute.
- **"the accordion is not exclusive"** — no `<details>` carries a `name` attribute, which is the assertion behind §3.
- **"every question is a heading inside its summary"** — checks the `<h3>` sits inside the `<summary>`, not merely somewhere in the section.
- **"no fabricated numbers in the copy"** — the section's own index `11` and the eyebrow are stripped first, then the remainder must contain no digits.
- **"no link in the block"** — the source gives this block no CTA.

### d. Page-wide

| Check | Result |
|---|---|
| Routes and anchors (`hv-links`) | 6/6, every internal link and anchor resolves |
| Static-page copy (`hv-pages-copy`) | 151/151 |
| Console | 1 message — `[HMR] connected` |
| Heading outline | Correct; `h2` + six `h3` last |
| Anchor chain | `… → engagement-models → faq` |

### e. Lint and typecheck

- `tsc --noEmit` → exit 0.
- `eslint` with the **full** config over all four changed/new files → exit 0.

---

## 14. Definition of Done

- [x] `data/faq.ts` with all copy verbatim, the six questions fixed, answers kept as paragraph arrays.
- [x] `FAQ.tsx` — Server Component, `#faq`, `aria-labelledby`, no client boundary.
- [x] Native `<details>` / `<summary>` accordion; answers in the server HTML; no `name` attribute.
- [x] Light surface, `border-t border-line`, no new surface hook.
- [x] Full-container rows with a closing rule; answers capped at `62ch`.
- [x] Plus/minus mark in CSS; one reveal keyframe; reduced motion already covered globally.
- [x] Wired into `app/page.tsx` after `EngagementModels`.
- [x] 8-width audit clean; 23/23 interaction and a11y; 40/40 content; 6/6 routes; 151/151 page copy; console clean.
- [x] `tsc` and `eslint` (full config) clean.
- [x] Committed `feat:` + this pack as `docs:`.

---

## 15. Deferred

- **The production build.** Blocked by the sandbox's bulk-delete guard, as for every block since Method.
- **The rhythm-map deviations in §4.** Deliberately not addressed here. Raised in §18.
- **A first item opened by default.** All six ship closed. Opening one would show the pattern, but it also makes the block taller on load and privileges one question over the others for no reason the source gives.
- **A per-question deep link.** No ids are emitted, so a specific question cannot be linked. `<details>` does not auto-open from a fragment anyway, so this would need script.
- **The `Tag` default-variant contrast** (`border-line text-muted` = 3.2:1). Pre-existing, unrelated to this block, still unfixed.

---

## 16. Do not overbuild

- Do not replace `<details>` with a client-component accordion "to get a real `aria-expanded`". The state is already in the accessibility tree and cannot drift; see §3 and §13b.
- Do not make the accordion exclusive. It is a layout jump the source rules out by name.
- Do not animate the height. Same reason, plus it needs script.
- Do not cap the row width again. It was tried and it broke the page's rule alignment (§5).
- Do not add a CTA. The source gives this block none, and the Final CTA is its own section.
- Do not add a seventh question. The source gives six, and names exactly these six topics.
- Do not open the first item by default.
- Do not add icons or a chevron. The CSS plus/minus is the site's own geometric language — the same instinct as the Method rail and the Journey nodes.

---

## 17. Commit

```text
5a1c374  feat: add faq section
```

Four files, 337 insertions, 0 deletions. Two new (`FAQ.tsx`, `data/faq.ts`), two modified (`app/globals.css`, `app/page.tsx`).

---

## 18. Open questions

1. **The page-rhythm map (§4).** Still unresolved, and this is the fourth pack to raise it. Block 13 followed the map knowingly, as block 12 did. Three already-shipped blocks (AI Gap, Journey, Cases) disagree with it. Only the Final CTA and the Footer remain, and the map makes both `DARK` — so the remaining risk is small, but the question does not resolve itself by being deferred again.
2. **The disclosure role (§13b).** Chrome reports `DisclosureTriangle` rather than `button`. If a literal `aria-expanded` attribute in the DOM is a hard requirement — for an audit script, a client checklist, or a house standard — then this block needs the client-component version instead, and the trade in §3 changes. Worth an explicit decision rather than a default.
3. **No CTA in this block (§12).** Faithful to the source, but it means the last content block before the Final CTA is entirely passive. If the page wants a soft link here, it should be a deliberate addition, not a drift.
4. **Four light blocks in a row (§4).** Why HelloVibe → Engagement → FAQ → and then the Final CTA. The map asks for this, but it is the longest run of one surface on the page, and it is worth confirming on purpose.
