# HelloVibe — Final CTA Implementation Pack v0.1

Section 14 of the homepage, and the last block on the page.

---

## Purpose

Build the closing block: a dark section that reads as the emotional end of the
page, carries the primary CTA plus the email as a secondary action, and brings
back the Hero's Vibe Machine in its assembled state so the page's narrative
closes where it opened.

This pack records what was decided, what was measured, and what was deliberately
left alone. It assumes the reader has `docs/faq/` and `docs/engagement-models/`
to hand — the surface conventions and the copy-selection rule are established
there and are not re-derived here.

---

## What I decided — review these first

| # | Decision | Why |
|---|---|---|
| 1 | Surface is **dark** (`bg-black`, `data-surface="dark"`) | Source says "Dark background." outright, the rhythm map lists `DARK / Final CTA`, and §19 names `final CTA` as a dark section |
| 2 | **No `border-t`** | FAQ above is warm, so the colour change is the separator — the Product Studio rule |
| 3 | The visual is **the Hero's Vibe Machine, assembled** | Source: "Можно вернуть один элемент из Hero: THE VIBE MACHINE — но теперь он находится в собранном состоянии: OUTCOME" |
| 4 | The composition **mirrors the Hero's split** — copy 1–7, machine 8–12 | The bookend only reads if the object is in the same place at both ends |
| 5 | The machine reuses `lib/vibe-machine.ts` — **no second vocabulary** | `MACHINE_WORDS`, `LAYOUT_*` and `systemFrame` already define it; a copy would drift |
| 6 | Both layout layers are rendered and swapped with **CSS**, not `useMediaQuery` | Same breakpoint, same result, and the block stays a Server Component with **zero client JS** |
| 7 | Section number is **14** — **changed from `12` on 2026-10-03 by the owner** | The original decision was `12`, continuing the visible run 01–11, on the grounds that the source's own indices for this block conflict and are not copy. The owner overrode it in the production-gap pass, reading the block as its narrative position (Hero `01` … Final CTA `14`). See §1a — the override is **not** consistent with the rest of the page and was chosen knowingly |
| 8 | **The footer gained `border-t border-white/15`** | CTA → footer is the only DARK → DARK adjacency on the page; without a rule the two merge and the footer's nav reads as part of the CTA |
| 9 | Micro-copy is a **quiet sentence**, not an uppercase mono label | It is a full sentence with a full stop; the uppercase-mono treatment is for fragments |
| 10 | Email is a **secondary action**, borrowing the Hero's bottom-rule treatment | Source calls it "Secondary"; it is a link, not a label |
| 11 | **No motion at all** | Third static block in a row; nothing to animate that the source asks for |

---

## 1. Section position and anchor

Last block before the footer, immediately after FAQ.

```text
… → Engagement Models (10) → FAQ (11) → Final CTA (14) → Footer
```

### 1a. The section number, and why it now reads `14`

The displayed numbers are the **visitor-visible run of indexed blocks**: Hero and
Trust Strip carry no index, so AI Gap is `01` and the twelfth indexed block is
`12`. The source's `# 10. Homepage narrative` uses a different scheme — the
position in the full page order, where Hero is `1` and Final CTA is `14` — and
the source's own section headings use both (`# 14. FINAL CTA` in one pass,
`# 15. FINAL CTA` in another). The packs for Why HelloVibe, Engagement Models and
Creative Engine all record the same trap, and all shipped the indexed run.

**On 2026-10-03 the owner overrode that for this block**, so it now reads `14`.
The consequence is deliberate and on the record: FAQ still shows `11`, so the
page's last two numbers read `11 → 14`. Making the page fully consistent means
either reverting this block to `12`, or renumbering **all twelve** indexed blocks
to the full-page-order scheme (AI Gap `03` … Final CTA `14`). Neither has been
done — do not "fix" this number in isolation without asking.

Anchor: `#final-cta`. Nothing links to it — it exists for parity with every other
block, and so the anchor list stays complete. Confirmed on the page:

```text
trust → the-ai-gap → what-we-do → how-we-work → ai-audit → cases → method
      → product-studio → creative-engine → why-hellovibe → engagement-models
      → faq → final-cta
```

---

## 2. Approved copy

```text
12 —— READY WHEN YOU ARE
Got an idea? A problem? Or just a feeling there’s a better way?
Tell us what’s on your mind. We’ll figure out where AI fits.

[ Start a project → ]      hello@hellovibe.ru

No pitch deck required.
```

### The source gives this block five times, and they agree

| Pass | Location | Form |
|---|---|---|
| A | index only | headline, supporting, CTA, micro (no eyebrow, no email) |
| B | `# FINAL CTA` spec | eyebrow, headline, supporting, CTA, email, micro |
| C | `# 18. Final CTA` | eyebrow, H2, body, CTA, secondary, micro |
| D | `# 15. FINAL CTA` | **plus** "Dark background." and the Visual spec |
| E | `# 14. FINAL CTA` | same, with the headline broken over three lines |

Every string is **character-identical across all five passes**. This is the
cleanest source agreement of any block on the page — there is no majority vote to
run, and the verbatim-repetition rule resolves nothing because nothing differs.

### The headline is one string, not three lines

Pass E breaks it as:

```text
# Got an idea?
# A problem?
# Or just a feeling there's a better way?
```

Passes B, C and D run it as a single line. The site treats the source's markdown
line breaks as styling, not copy — the same call the FAQ pack records for its
answers — and the heading already carries `text-wrap: balance`. So it ships as one
string and wraps where the browser decides.

### Apostrophes

The source writes `there's` and `We'll` straight while shipping the curly form
elsewhere. The site's convention is typographic, so the rendered text carries
U+2019. Asserted both ways in the harness: the curly form must be present **and**
the straight form must be absent.

### The eyebrow is natural case

`Ready when you are`, uppercased by `SectionHeader` — as every other block's
eyebrow is. The source's caps are document styling.

### Number 12

The visible run is 01–11 (AI Gap → FAQ). Final CTA is the next numbered block, so
it is 12. The source's own headings for this block are `# 14.`, `# 15.` and
`# 18.` in different passes — the established rule applies: an index in the
source's own section heading is never copy.

### The primary CTA and the email are not restated

Both come from `data/navigation.ts`:

```ts
primaryCta   = { label: "Start a project", href: "/contact" }
contactEmail = "hello@hellovibe.ru"
```

The source's CTA label and address are exactly those values, and the navbar,
mobile menu and footer already read them from there. `data/final-cta.ts` holds
only the four strings that belong to this block alone.

---

## 3. The assembled machine — the narrative bookend

The source, pass D:

> ## Visual
> Very minimal.
> Можно вернуть один элемент из Hero:
> **THE VIBE MACHINE**
> Но теперь он находится в собранном состоянии:
> # OUTCOME
> Это визуально замыкает narrative.
> Hero: **CHAOS**
> Footer: **OUTCOME**

The Hero's machine walks five stages as its track is scrolled — Chaos → Strategy
→ System → Product → Outcome. The Final CTA renders the **final keyframe**:
no scroll, no pointer parallax, no float, no status changes.

### What "assembled" means concretely

At progress 1, `wordColors()` ends every word at `finalTone ?? "outline"` — so the
settled state is nine outline chips plus the one vibe-green outcome chip, in this
grid:

```text
INPUTS        SYSTEM       OUTPUT
IDEA          AI           USERS
DATA          PROCESS      AUTOMATION
CONTENT       CODE         CREATIVE

PRODUCT ——————————————————————— ■ OUTCOME
```

That is exactly what ships, and it is the Hero's own final frame.

### The palette is inverted for the dark surface

The Hero's machine sits on `bg-white`. There, `outline` is a white-filled chip
with black text and a black border, which on a white panel reads as plain black
text. Dropped onto `--color-black` unchanged it would become a bright white block,
so the two tones that survive to the settled state are inverted:

```ts
outline: { bg: "transparent",           fg: "var(--color-white)" }
vibe:    { bg: "var(--color-vibe)",     fg: "var(--color-black)" }
```

Result: white-bordered, white-labelled chips plus the green outcome chip. The
Hero's final frame with the surface flipped.

`orange` and `ink` are listed in the map so the record is total, but neither
appears once the system has settled.

### Why the grid lines are `rgba(255,255,255,0.12)`

The Hero's grid is `--color-line` (#d8d5cd) on white — a subtle light-on-light
hairline. The inverse on black is a subtle light-on-black hairline, which
`rgba(255,255,255,0.12)` gives. It is declared as a named constant in the
component rather than inline, so there is one value to change.

### The HUD is kept

The panel keeps the Hero's status bar, frozen on the last stage:

```text
THE VIBE MACHINE                    ■ 05 / 05 · OUTCOME
```

It names the object and states where it finished, which is the whole point of the
bookend. It is real text, not decoration.

---

## 4. Surface: dark — and the DARK → DARK seam

### Confirmed three ways

1. `Dark background.` — directly under `# 15. FINAL CTA`
2. The rhythm map — `DARK / Final CTA` immediately above `DARK / Footer`
3. `# 19. Dark sections` — "Используем dark sections как **dramatic pause**.
   Подходящие места: AI Gap, AI Systems, final CTA, footer"

### The treatment is Product Studio's, re-applied

- **No `border-t`.** FAQ above is warm, so the colour change is the separator.
  A `border-line` rule across a black section would be an artefact.
- **`tone="inverse"`** on the header — `strong`'s black alphas are illegible here.
- **`variant="inverse"`** on the button — `primary` is a black fill on black, and
  `secondary`'s `border-line` measures ~1.3:1.
- **`data-surface="dark"`** flips the focus ring to white. Verified reaching both
  actions, not just the section: `2px solid rgb(255,255,255)`, offset 3px.

### The seam — this is the one thing Product Studio's rule did not cover

Product Studio gets away with no rule because Creative Engine (an accent section)
follows it: the colour changes, so the boundary is legible. **The Final CTA is
followed by the footer, which is also `bg-black`.** That makes CTA → footer the
only DARK → DARK adjacency on the page.

Measured before the fix:

```text
ctaBottom=14004  footerTop=14004  ctaBg=rgb(17,17,17)  footerBg=rgb(17,17,17)
footerBorderTop=0px   void between the micro line and the footer wordmark = 299px
```

Two black sections, adjacent, with 299px of uninterrupted black between the last
line of the CTA and the first line of the footer, and nothing to read the boundary
from. The screenshot made it obvious: the footer's nav columns appear to be part
of the CTA.

**Fix:** `border-t border-white/15` on the `<footer>` — the same hairline value
the footer already uses above its copyright line, so no second weight is
introduced. Every block on the page announces itself with a hairline along its top
edge; this restores that for the one boundary where the colour-change exemption
does not apply.

On the interior pages the rule sits at a light → dark boundary and is barely
visible, which is fine — the colour change separates those.

After the fix: `footerBorderTop=1px`, and the void reads as deliberate breathing
room rather than a missing element.

---

## 5. Layout: the Hero's own split

```text
copy    col-span-4 md:col-span-8 lg:col-span-7
machine col-span-4 md:col-span-8 lg:col-span-5
grid    items-center gap-y-12
```

Identical to the Hero's split. This is deliberate: the narrative closes only if
the machine is the same object in the same place at the top and the bottom of the
page.

Product Studio uses 5/6; this uses 7/5, matching the Hero rather than Product
Studio. The two dark sections are five blocks apart with the accent Creative
Engine between them, so they do not read as a pair.

Below `lg` the two columns stack — copy above, machine below — and the machine
takes the full container width, exactly as the Hero's does.

### The 1024 case is tight, and it is inherited

At 1024 the machine box is 384px wide (5 columns), and the widest chip
(`AUTOMATION`, in the OUTPUT column at 70%) leaves only **15px** of slack:

```text
w1440  box 547×368  slack 60
w1280  box 483×368  slack 43
w1024  box 384×320  slack 15
w320   box 280×320  slack 54
```

Nothing is clipped and no two chips collide — asserted at all eight widths. The
tightness comes from `LAYOUT_DESKTOP`'s three-column grid in a 5-column box, which
is a property of the shared module: the Hero has the same box width at 1024 and the
same layout. It is inherited, not introduced, and it is left alone. See §18.

---

## 6. Motion: none

Third block in a row with no animation. The machine is static by definition — it is
the settled state — and the source's only motion instruction for this block is
"Very minimal".

Consequence: no `data-shown`, no in-view trigger, no `useMediaQuery`, no
reduced-motion branch. The block has nothing to suppress, so the three-pass DOM
probe that other blocks need does not apply here.

---

## 7. Data model

`data/final-cta.ts` — four strings:

```ts
export const finalCtaEyebrow  = "Ready when you are";
export const finalCtaHeadline = "Got an idea? A problem? Or just a feeling there’s a better way?";
export const finalCtaBody     = "Tell us what’s on your mind. We’ll figure out where AI fits.";
export const finalCtaMicro    = "No pitch deck required.";
```

No CTA object and no email: both are read from `data/navigation.ts` so the address
is defined exactly once.

The machine's vocabulary is **not** duplicated here. It lives in
`lib/vibe-machine.ts` and is imported.

---

## 8. Component architecture

```text
components/home/FinalCta.tsx        Server Component — the section
components/home/FinalCtaVisual.tsx  Server Component — the assembled machine
```

`FinalCta` composes `SectionHeader`, `ButtonLink` and a plain `<a>` for the email,
then renders `FinalCtaVisual`.

`FinalCtaVisual` renders the settled machine twice — once per layout — and lets
CSS choose:

```tsx
<div role="img" aria-label={SETTLED_LABEL}>
  <div className="md:hidden"><SettledMachine layout={LAYOUT_COMPACT} /></div>
  <div className="hidden md:block"><SettledMachine layout={LAYOUT_DESKTOP} /></div>
</div>
```

### Why CSS and not `useMediaQuery`

The Hero picks its layout with `useMediaQuery(COMPACT_QUERY)`, and that is right
there because the machine is already a client component driven by Motion values.
Here it would buy nothing and cost a client boundary. Both layers are rendered and
toggled at the **same 768px breakpoint** with `md:hidden` / `hidden md:block`:
same breakpoint, same result, no JS.

### `role="img"` is load-bearing here

Because both layers are in the DOM, the machine's text exists twice. `role="img"`
with an `aria-label` makes the subtree presentational, so assistive tech hears one
named image instead of twenty chips. The same pattern the Hero uses.

**Zero client JavaScript** ships for this block.

---

## 9. Shared-component changes

Two, both minimal and both recorded here because they touch shipped code.

### `components/layout/Footer.tsx`

Added `border-t border-white/15`. Reasoning in §4. The class list becomes:

```tsx
<footer className="border-t border-white/15 bg-black text-white">
```

This affects every page. On interior pages the rule sits at a light → dark
boundary where it is barely visible — the colour change does the work there.

### `app/globals.css`

One new class:

```css
.cta-machine { height: clamp(20rem, 30vw, 23rem); }
```

Deliberately **not** `.hero-machine`: that class carries the Hero's viewport-height
maths (`calc(100svh - 20rem)`), which belongs to the sticky track. Reusing it would
make the closing panel resize with the window for no reason and couple two
unrelated blocks.

Everything else in the panel is styled inline in the component, because every
colour is a per-word value from `lib/vibe-machine.ts`.

---

## 10. Layout, measured in the browser

### Surface

```text
w1440  bg=rgb(17,17,17)  borderTop=0px  surface=dark  overflowX=0
w1024  bg=rgb(17,17,17)  borderTop=0px  surface=dark  overflowX=0
```

### The machine box, per width

```text
w1440  547×368   chips=10  visible layers=1  captions visible=3
w1280  483×368   chips=10  visible layers=1  captions visible=3
w1024  384×320   chips=10  visible layers=1  captions visible=3
w768   706×320   chips=10  visible layers=1  captions visible=3
w430   388×320   chips=10  visible layers=1  captions visible=0
w390   350×320   chips=10  visible layers=1  captions visible=0
w375   335×320   chips=10  visible layers=1  captions visible=0
w320   280×320   chips=10  visible layers=1  captions visible=0
```

Captions are present at ≥768 and absent below, matching the Hero's compact layout.

### Row structure

Desktop (≥768), three columns:

```text
y=13552  IDEA(119) AI(137) USERS
y=13604  DATA(119) PROCESS(96) AUTOMATION
y=13656  CONTENT(95) CODE(120) CREATIVE
y=13748  PRODUCT
```

Compact (<768), two columns:

```text
y=14684  IDEA(103) AI
y=14716  USERS(96) DATA
y=14752  PROCESS(81) AUTOMATION
y=14788  CONTENT(81) CODE
y=14824  CREATIVE
y=14872  PRODUCT
```

Numbers in brackets are the horizontal gaps between chips in that row. The
narrowest gap anywhere is 37px at 320 — no collisions, asserted at every width.

---

## 11. Accessibility

- **Heading order** — the block contributes exactly one `h2`, and the page outline
  ends on it. Verified in the full heading dump.
- **The machine is one image** — `role="img"` with a descriptive `aria-label`
  ("The Vibe Machine, assembled: its ten words have settled into inputs, system and
  output, and the product has resolved into a green outcome."). The twenty chips
  behind it are not announced.
- **Both actions are keyboard-reachable** and are the only two focusable elements
  in the block, reached by real Tab key events.
- **Focus rings** — `2px solid rgb(255,255,255)`, offset 3px, on both. The global
  ring is `--color-black`; `data-surface="dark"` flips it.
- **The arrow is `aria-hidden`**, so the button's name is just "Start a project".
- **The HUD's stage square is `aria-hidden`** — it duplicates the text beside it.

### Contrast, measured with composited alpha

| Element | Ratio | AA |
|---|---|---|
| H2 (white) | 18.88:1 | pass (large) |
| Body (white/75) | 10.77:1 | pass |
| Eyebrow (white/70) | 9.48:1 | pass |
| Micro (white/70) | 9.48:1 | pass |
| HUD (white/70) | 9.48:1 | pass |
| Captions (white/70) | 9.48:1 | pass |
| Button label (black on white) | 18.88:1 | pass |
| Email (white) | 18.88:1 | pass |
| Outline chip (white on black) | 18.88:1 | pass |
| Outcome chip (black on vibe) | 16.01:1 | pass |

Every value is measured against the composited `rgb(17,17,17)`, not against pure
black.

---

## 12. Constraints

- **No invented content.** No clients, logos, testimonials, awards, metrics,
  prices or timeline promises. Asserted.
- **No fabricated numbers.** The only digits in the block are the section index
  (`14` since 2026-10-03, `12` before that) and the machine's stage counter
  (`05 / 05`) — both from the source. The harness strips those two tokens before
  asserting there are none left.
- **No illustration.** The only graphics are the button's 24px arrow icon and the
  machine's grid. No `<img>`.
- **No client JavaScript.**

---

## 13. Validation

### a. Responsive — 8 widths, 320–1440

`overflowX = 0` at every width; no clipped chip; no chip gap under 4px. **All
assertions passed.**

### b. Geometry + contrast — 8 widths

Box dimensions, chip geometry, row gaps, layer visibility, caption visibility,
`role`/`aria-label`, and ten contrast samples per width. **All assertions passed.**

### c. Content assertions — 54/54

Structure, surface attributes, verbatim copy, apostrophe convention, both actions
with their exact variants, the machine's ten words and three captions, the CSS
swap, the no-fabrication sweep, and page-level uniqueness and placement.

### d. Focus rings — 2/2

Both actions reached by real Tab events; ring white on the dark surface.

### e. Page-wide

- `hv-links.mjs` — **6/6** pages answer as expected; every internal link and anchor
  resolves.
- `hv-pages-copy.mjs` — **151/151**.
- Console — **one message**, `[HMR] connected`. No errors, no warnings.
- Routes — `/`, `/services`, `/work`, `/about`, `/contact` all 200;
  `/definitely-not-a-page` 404.

### f. Lint and typecheck

- `tsc --noEmit` — exit 0.
- `eslint` on all five changed files with the **full** config (React Compiler rules
  included, no `--rule` overrides) — exit 0. Real coverage, not partial.

---

## 14. Definition of Done

- [x] Dark surface, `data-surface="dark"`, no `border-t`
- [x] Copy verbatim, typographic apostrophes, eyebrow in natural case
- [x] Number 12, continuing the visible run
- [x] Primary CTA from `primaryCta`; email from `contactEmail`
- [x] The Vibe Machine rendered assembled, reusing `lib/vibe-machine.ts`
- [x] Composition mirrors the Hero (7/5 split)
- [x] Zero client JavaScript
- [x] DARK → DARK seam with the footer resolved
- [x] All contrast AA
- [x] Focus rings visible on the dark surface
- [x] 8-width clean, content 54/54, page-wide green
- [x] tsc + eslint clean

---

## 15. Deferred

- **The real contact form.** `Start a project` and the footer's CTA both point at
  `/contact`, which is still a placeholder. Blocked on a delivery decision.
- **A sitemap and legal links.** Noted in the footer's own TODO.
- **The PAGE RHYTHM deviation decision.** Now five packs running; see §18.

---

## 16. Do not overbuild

- **Do not animate the machine.** It is the settled state; animating it would
  contradict "assembled".
- **Do not add a second status bar or stage rail.** The Hero has the rail because
  it has stages to explain. This block has one state.
- **Do not restate the CTA label or the email in `data/final-cta.ts`.**
- **Do not expand `MWP`/`MVP` here.** Product Studio owns that.
- **Do not add a heading, tagline or strapline the source does not give.**
- **Do not "fix" the 1024 slack by forking the layout.** See §18.

---

## 17. Commit

`feat: add final cta section` followed by `docs: add final cta implementation pack`.

---

## 18. Open questions

1. **The 1024 tightness.** 15px of slack is legal but tight. The clean fixes all
   have a cost: switching to the compact layout below ~1200px would break the
   "same object as the Hero" fidelity; widening the machine column would break the
   Hero's split. Left as-is because it is inherited from the shared layout module
   and nothing is clipped. Worth a decision if the Hero is ever revisited.

2. **Is one hairline enough for the closing dark run?** The alternative was to
   accept CTA + footer as a single undivided black movement, on the grounds that
   the source groups them ("final CTA, footer" as one dramatic pause). The hairline
   was chosen because the page's own language is "every block marks its top edge"
   and the void otherwise reads as a missing element. Reversible in one line if
   the undivided reading is preferred.

3. **The PAGE RHYTHM deviation — fifth pack running.** The map assigns a surface to
   every block, and this block followed it knowingly (`DARK`). Three shipped blocks
   (AI Gap, Journey, Cases) still disagree with it and are all light. The page is
   now complete, so the deviation is at its final size and can be reviewed as a
   whole rather than block by block. Still deliberately not acted on.
