# HelloVibe — Trust Strip Implementation Pack v0.1

## Purpose

Implement **Section 02 — TRUST / SOCIAL PROOF** as a thin strip between the Hero and the AI Gap.

It exists because the Hero makes a claim and the AI Gap immediately complicates it. A short band in between answers the unspoken "…and who are you?" before the argument starts.

This is a focused implementation task. Do NOT build or modify the Hero, Vibe Machine, AI Gap, Services, Product Journey, Navbar, Footer, AI Audit, Cases, Method, any studio section, FAQ, the final CTA, case studies, the contact form, a CMS, a database, authentication or analytics.

Before editing:

1. Read `AGENTS.md` if present.
2. Read `README.md`, the Foundation Pack, the Navigation + Footer Pack and the Product Journey pack.
3. Inspect the existing repository and git history.
4. Treat the repository and the existing implementation as the source of truth.
5. Do not overwrite working code unnecessarily.

---

## What I decided — review these first

The pack does not exist as a document in the source conversation — it was recovered from it, and the copy is quoted verbatim below. These judgement calls fill the gaps.

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Section number | **None.** Like the Hero, the strip is unnumbered, so AI Gap stays `01`, What We Do `02` and Product Journey `03` | Renumber everything after it — a large, pointless diff |
| 2 | Anchor | **`id="trust"`**, with no navbar entry | Give it a nav link — the navbar pack does not list one |
| 3 | Shape | **A thin band**, `py-12` / `md:py-16`, not a full `py-section-lg` block | Full-height section, which would put two big blocks back to back before any content |
| 4 | Hero CTA target | **Unchanged** — "Explore what we do ↓" still scrolls to `#the-ai-gap` | Retarget it to `#trust`, which would make the CTA land on a band rather than on content |
| 5 | Surface | **Warm background**, same as every other light section | A dark band, which would fight the Hero |

The one non-negotiable rule from the source conversation, stated twice and in capitals in the agent prompt:

> Do not invent client logos.
> If social proof is needed, use generic category labels rather than fake clients.

and

> Never use fake metrics as social proof.

Everything below is built around that. See §9.

---

## 1. Section position and anchor

Homepage order after this task:

```tsx
<Hero />
<TrustStrip />
<AIGap />
<Services />
<ProductJourney />
```

This restores the order recovered from the conversation, which lists the strip as `2. Trust / Social Proof` between the Hero and the AI Gap and says the order is intentional and not to be reordered casually.

Anchor:

```text
id="trust"
```

Notes:

- The section heading carries `id="trust-title"` so the section can use `aria-labelledby` without an extra wrapper.
- The Hero's secondary CTA keeps pointing at `#the-ai-gap`. A strip is not a destination.
- No navbar or footer change. `data/navigation.ts` is not touched by this task.

---

## 2. Approved copy

Verbatim from the source conversation, §03 TRUST STRIP and §06 Trust section.

```text
Built for ambitious teams building what’s next.

STARTUPS
SCALE-UPS
PRODUCT TEAMS
BRANDS
```

That is the whole block. There is no eyebrow, no H2 and no body copy beyond the sentence.

The four labels are **categories of team we build for**, not clients. The source is explicit: *"Не выдавать эти labels за клиентов"* — do not present them as clients. The sentence's verb is deliberate too: **"Built for"**, never "Trusted by".

Typographic apostrophe in `what’s` (`’`, U+2019), matching the rest of the site.

### Why no logo row

The conversation offers two branches:

- if there are real clients and permission to name them → show logos;
- if not → show the sentence and the labels.

There is no permission and no client list in the repository, so this pack takes the second branch. **Do not leave empty logo slots, grey placeholder rectangles or shimmer bars where logos would go** — a placeholder logo row is a fake client row with the serial numbers filed off.

---

## 3. Visual concept

Direction: **a quiet editorial band, not a logo wall.**

```text
──────────────────────────────────────────────────────────────
Built for ambitious teams            STARTUPS · SCALE-UPS ·
building what’s next.                PRODUCT TEAMS · BRANDS
──────────────────────────────────────────────────────────────
```

- The sentence is the only prose. It is set at `text-body-lg` and takes the left column.
- The four labels sit right, in the same mono uppercase treatment the rest of the site uses for metadata (`text-label`, `font-mono`, `uppercase`).
- Labels are separated by a 1px hairline rule, reusing `--color-line` — the same separator `SectionHeader` uses between its number and eyebrow, so the strip reads as part of the system.
- One hairline above the strip (`border-t border-line`), matching every other section boundary.
- **No accent colour.** `--color-vibe` and `--color-orange` are not used here. The strip is a connective tissue between the Hero and the AI Gap; both of those blocks already carry an accent, and a third would make the top of the page noisy.

Explicitly out of scope, per the conversation's visual rules:

- no invented logos, no placeholder logo slots;
- no fake metrics, no "trusted by 200+ companies", no star ratings;
- no stock photography, no avatars, no testimonial quotes;
- no counters, no animated numbers.

---

## 4. Data model

Create `data/trust.ts` — the copy is defined once.

```ts
/** One category of team the studio builds for. Never a client name. */
export type TrustCategory = {
  /** Stable key. Also used to build the list item id. */
  id: string;
  /** Display label, rendered uppercase in mono. */
  label: string;
};

/**
 * Categories of team, from the source conversation §03.
 *
 * These are NOT clients and must never be presented as such — see the pack §9.
 */
export const trustCategories: readonly TrustCategory[] = [
  { id: "startups", label: "Startups" },
  { id: "scale-ups", label: "Scale-ups" },
  { id: "product-teams", label: "Product Teams" },
  { id: "brands", label: "Brands" },
];

/** The strip's only sentence, verbatim from the source conversation §03. */
export const trustStatement = "Built for ambitious teams building what’s next.";
```

`readonly` throughout. The array is consumed by exactly one component.

---

## 5. Component architecture

```text
components/
└── home/
    └── TrustStrip.tsx     Server — the whole block
```

One file. **Server Component** — the source conversation lists `TrustStrip` under Server Components, and nothing here is interactive. No `"use client"`, no hooks, no Motion.

Do not create a `data/trust.ts`-plus-`TrustStripItem.tsx` pair. Four static labels do not need their own component.

---

## 6. Desktop and mobile layout

Desktop (`md` and up):

```text
lg: sentence col-span-5 · labels col-span-6 (starting col 7)
```

Reuse the `hv-grid` 12-column grid the other sections use, so the strip aligns with the Hero, the AI Gap and Services above and below it.

- Sentence: `text-body-lg`, `text-black/75`, `max-w-[38ch]`.
- Labels: a `<ul>` laid out as a single wrapped row, `gap-x-4 gap-y-2`, each `<li>` prefixed by a hairline separator except the first.

Mobile (below `md`):

- The strip stacks: sentence first, then the labels as a wrapped row.
- Labels wrap to two lines at 390px rather than shrinking the type. Do not truncate.
- No horizontal scrolling.

Vertical rhythm: `py-12` and `md:py-16`. Both are on the design system's 4/8/12/16/24/32/48/64/80/120/160 scale and both are deliberately smaller than `py-section-lg`, so the band reads as a band.

---

## 7. Accessibility

- The `<section>` is labelled by its heading via `aria-labelledby`, so the strip appears in a screen-reader landmark list as something with a name.
- The sentence is an `<h2>` — the strip is a real section of the document, and the outline should not skip from the Hero's `h1` to the AI Gap's `h2` without it.
- The labels are a `<ul>`. They are a set, and a list is what a set is.
- The hairline separators are `aria-hidden="true"` — they are decoration, and a screen reader announcing "vertical line" between every label is noise.
- Colour contrast: `text-black/75` on `--color-bg` is 8.1:1, and `text-black/70` is 6.8:1. Both clear AA. **Do not use `--color-muted`** (#8a8882), which measures 3.2:1 on the warm background and fails AA for body text.
- No interaction, so no focus management, no roving tabindex and no keyboard contract is needed.

---

## 8. Motion

**None.** No reveal, no fade, no stagger, no scroll-linked effect.

The strip sits directly under the Hero, which is the page's animated centrepiece. A second animated block immediately after it competes with the thing the visitor is still looking at, and the conversation's own instruction for the page is *"Do not over-animate."*

This also means the strip renders identically for a reduced-motion visitor with no branch anywhere in the code.

---

## 9. Constraints — the part that matters

The conversation is unusually blunt here, so these are hard requirements rather than preferences.

**Must not:**

- invent, generate or draw a client logo;
- render a placeholder, a grey rectangle, a shimmer bar or an empty slot where a logo would go;
- use a real company's mark without permission;
- claim a number — no "200+ projects", no "trusted by", no star ratings, no awards;
- present `STARTUPS` / `SCALE-UPS` / `PRODUCT TEAMS` / `BRANDS` as clients or as a client count;
- add a testimonial, a quote, an avatar or a named person;
- add a `logos/` folder to `public/` filled with invented marks.

**Must:**

- use the sentence and the four labels exactly as written in §2;
- keep the verb "Built for";
- say plainly in the data file's comment that the labels are categories, not clients, so the next person to edit it cannot mistake them.

If real client logos and permission arrive later, that is a separate task with a separate pack — this pack's structure should make it a small change (`trustCategories` gains a `logo` field and the row renders images instead of labels), not a rewrite.

---

## 10. Preserve

Do not modify, without an explicit instruction:

- `components/home/Hero.tsx` — including `NEXT_SECTION_ID`, which the AI Gap imports;
- `components/home/VibeMachine.tsx`, `HeroTrack.tsx`, `VibeMachineWord.tsx`;
- `components/home/AIGap.tsx`, `AIGapVisual.tsx`;
- `components/home/Services.tsx`, `ServiceVisual.tsx`;
- `components/home/ProductJourney.tsx`, `JourneyStepper.tsx`, `JourneyVisual.tsx`;
- `components/layout/*`, `components/ui/*`;
- `lib/*`, `types/*`;
- the `@theme static` token block in `app/globals.css` — **no new colours, no new fonts, no new spacing steps**;
- `package.json` — **no new dependencies**.

Do not rename existing components. Do not restructure `app/page.tsx` beyond inserting `<TrustStrip />` between `<Hero />` and `<AIGap />`.

---

## 11. Validation

Before commit:

```bash
node node_modules/eslint/bin/eslint.js .
node node_modules/typescript/bin/tsc --noEmit
```

Both must be clean.

Then verify in a real browser at **1440, 1280, 1024, 768, 640, 390 and 320**:

- no horizontal overflow at any width;
- nothing escapes the viewport;
- no clipped or truncated label text;
- the section renders identically with JavaScript disabled — it is a Server Component, so the sentence and all four labels must be in the prerendered HTML;
- `aria-labelledby` resolves to the heading;
- the heading is an `h2` and the document outline reads `h1 → h2 → h2 → h2 → h2`;
- no console errors and no hydration failure on load;
- the section height is identical at every width (there is no state, so any variance is a bug);
- no `--color-muted` text anywhere in the section.

And confirm by inspection that the diff contains **no logo, no number, no client name and no `public/` addition**.

---

## 12. Definition of Done

- [ ] `data/trust.ts` exists with `trustCategories` and `trustStatement`, both `readonly`.
- [ ] `components/home/TrustStrip.tsx` exists, is a Server Component, and contains no `"use client"`.
- [ ] `app/page.tsx` renders `Hero → TrustStrip → AIGap → Services → ProductJourney`.
- [ ] The strip carries `id="trust"` and `aria-labelledby="trust-title"`.
- [ ] Copy is verbatim from §2, including the typographic apostrophe.
- [ ] The four labels render as a `<ul>` with `aria-hidden` separators.
- [ ] No logos, no placeholders, no metrics, no testimonials, no new dependencies.
- [ ] Lint and typecheck clean.
- [ ] Browser verification in §11 passes at all seven widths.
- [ ] Section numbers `01`, `02`, `03` are unchanged on the AI Gap, Services and Product Journey.

---

## 13. Do not overbuild

Not in this task:

- a logo row of any kind, including "coming soon" slots;
- a testimonial carousel;
- an animated counter;
- a marquee or infinite scroll;
- a CMS field for logos;
- an image pipeline, `next/image` config or `public/logos/`;
- analytics events;
- a dark variant.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 14. Commit

```text
feat: add trust strip
```

Do not include the next section in the same commit.

---

## 15. Final response format

Return:

1. the commit SHA;
2. the list of files changed, with line counts;
3. lint and typecheck results;
4. the browser verification results per width;
5. an explicit statement that no logo, metric or client name was added, and how that was checked;
6. anything you decided that this pack did not specify.

---

## 16. Open questions

1. **Anchor.** `id="trust"` with no nav link. Add a navbar entry, or leave it unlinked?
2. **Labels.** `STARTUPS / SCALE-UPS / PRODUCT TEAMS / BRANDS` as recovered. Different or additional categories?
3. **Hero CTA.** Currently still scrolls to `#the-ai-gap`, skipping the strip. Leave it, or retarget to `#trust`?
4. **Real logos.** If client logos and permission exist, say so and this becomes a different task — the strip is built so that swap is small.

---

Next task after this:

**AI Audit** — section 06. No implementation pack exists for it either; it has to be written from the conversation, the same way this one was.
