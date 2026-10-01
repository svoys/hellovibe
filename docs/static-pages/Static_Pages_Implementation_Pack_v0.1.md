# HelloVibe — Static Pages Implementation Pack v0.1

## Purpose

Fix the three navbar links that 404.

`data/navigation.ts` has pointed at `/services`, `/work` and `/about` since the
Navigation + Footer Pack v0.1, and **none of those routes existed**. Three of the
four navbar links, and every footer link in the first column, dropped the visitor
on Next's bare default 404. The Cases Pack v0.1 §12 called this out and named it
the next task:

> `/services`, `/work` and `/about` are all linked from `data/navigation.ts` and
> **none of them exist**. Three of the four navbar links currently 404. That is the
> real next task after this one, and it is bigger than any single section.

This pack builds them, plus a custom 404 so an unknown URL is no longer a dead end.

**Not in this task:** the Method section (08), and everything after it in the
homepage order. This is routes only — no homepage block changed.

---

## What I decided — review these first

| # | Decision | Chosen | Alternative |
|---|---|---|---|
| 1 | Fix by building or by re-pointing? | **Build the three routes** | Re-point "What we do" and "Cases" at `/#what-we-do` and `/#cases` and leave "About" with nowhere to go. The Navigation + Footer Pack §1 fixes these routes by name; re-pointing three of them silently overrides an approved spec, and it cannot fix `/about` at all because no About content exists on the homepage |
| 2 | Are these "fake pages"? | **No** | The Navigation + Footer Pack §1 says *"If a route does not yet exist, do not create a fake page solely for this task."* That rule is about not inventing content to make a nav link resolve. Every page here is built from copy that already exists in an approved source — see §2 |
| 3 | `/services` content | **The four pillars plus each pillar's contents**, from the brand rules' "Core services" section | A repeat of the homepage Services cards. That would have made the route a duplicate of a block one scroll above it |
| 4 | `/work` state | **The empty state**, the same one the homepage block renders, plus the four categories and the publishing rule | A `CaseCard` grid. There are no verified cases — see §4 |
| 5 | `/about` length | **One screen.** Recovered headline and two recovered lines, plus an honest note about the missing photographs | A team section, a founding story, a "passionate professionals" paragraph. The source forbids exactly that — see §5 |
| 6 | Pillar capabilities | **A separate `data/service-capabilities.ts`, keyed by pillar id** | Adding a `capabilities` field to `data/services.ts`. That module is frozen — *"do not reword, reorder or extend this list"* — and the homepage grid does not need the field |
| 7 | Shared page shell | **New `components/layout/PageIntro.tsx`**, and `/contact` moved onto it | Four near-identical header blocks. `/contact` already had one, so this removes duplication rather than adding a fifth copy |
| 8 | Top border | **No `border-t` on a page's first section** | Keeping `/contact`'s existing `border-t`, which sits directly under the navbar's `border-b` and produced a doubled hairline |
| 9 | 404 page | **A custom `app/not-found.tsx`** that lists only routes which resolve | Next's default. It had no navbar, no footer and no way back into the site |
| 10 | `/services/*` sub-routes | **Not built, and not linked** | Linking them, which would have replaced three 404s with four new ones — see §8 |

---

## 1. Where this sits in the source

Three separate places in the source conversation ask for these routes, which is
why building them is in scope rather than an invention.

**The route map** (Technical Specification, §05):

```text
/
 /services
 /services/strategy
 /services/systems
 /services/products
 /services/creative
 /work
 /about
 /contact
```

**The Foundation-stage note**, written when the navbar first shipped:

> Некоторые ссылки сейчас ведут на страницы, которые ещё не реализованы. Это
> ожидаемо на Foundation-этапе — `/services`, `/work`, `/about`, `/contact`
> должны появиться дальше.

*("Some links currently lead to pages that are not yet implemented. This is
expected at the Foundation stage — `/services`, `/work`, `/about`, `/contact`
should appear later.")*

**The model-routing table**, which lists static pages as a distinct, approved work
item: `4. Статические страницы — ✅ — /about, /services, /contact`.

So: the routes are specified, the delay was acknowledged, and the task was
pre-approved. Nothing here needs a new decision about *whether* these pages exist.

---

## 2. Recovered copy vs copy written here

The project's standing rule is that copy is recovered from the source, not
invented. Every string on these pages is accounted for below.

| Page | String | Origin |
|---|---|---|
| `/services` | `What we do` | Source, section eyebrow `02 — WHAT WE DO` |
| `/services` | `From opportunity to outcome.` | Source, "WHAT WE DO" headline |
| `/services` | `We combine strategy, product, technology and creative to take AI ideas all the way from first hypothesis to working reality.` | Source, "WHAT WE DO" supporting line. Already shipped in `Services.tsx` |
| `/services` | Four pillar titles, four descriptions, four action labels | `data/services.ts` (AI Gap + Services Pack v0.1 §11) |
| `/services` | All 29 capability strings | Source, brand rules §2 "Core services" — verbatim |
| `/work` | `Selected work`, `Things we’re building.`, the four categories, `Working on something similar?`, `Start a project` | `data/cases.ts` (Cases Pack v0.1) |
| `/work` | Publishing rule — *"Results appear here only with verified numbers…"* | **Written here**, composed from the source's own rule: *"For results: Only use verified numbers"* and *"Early-stage prototype / Currently in development is completely acceptable"* |
| `/about` | `We like building things.` | Source, About page — `### WE LIKE BUILDING THINGS.` |
| `/about` | Both lead sentences | Source, About page — verbatim |
| `/about` | `AI Product & Transformation Studio` | Foundation Pack positioning line. Already in the footer |
| `/about` | `AI, but make it real.` | Foundation Pack core idea |
| `/about` | The missing-visuals note | **Written here** — see §5 |
| 404 | `This page doesn’t exist.` and the lead | **Written here.** The source never specifies a 404 |

**Two authored strings, both flagged.** The `/work` publishing rule and the
`/about` note are the only sentences on these pages that are not recoverable.
Everything else is lifted.

### One rendering choice worth naming

The source writes the About headline in full caps — `WE LIKE BUILDING THINGS.` —
but every other heading in the source is sentence case and the site's `h1` is
sentence case throughout. It ships as **`We like building things.`** with the
casing coming from the type system, not the string. If the caps were meant
literally, this is the line to change.

---

## 3. `/services` — `app/services/page.tsx`

The destination "What we do" has always named.

The homepage Services block shows four cards. This page shows the same four
pillars **with the contents the brand rules give each one** — `AI audit`,
`opportunity mapping`, `ROI hypotheses` under AI Strategy; `AI agents`, `RAG`,
`document intelligence` under AI Systems, and so on. That is what makes the page
add something the homepage cannot, instead of repeating it.

Layout: four rows, each a `hv-grid` with the pillar on the left (meta row, `h2`,
description, capability list) and its abstract diagram on the right in a bordered
box. The diagram box for `AI Products` keeps the dark surface the homepage card
gives it, so the page retains the "one pillar is different" rhythm the grid has.

- Section: `<section aria-labelledby="services-page-title">`, **no `border-t`**.
- Exactly one `h1`, then four `h2`s — one per pillar.
- The capability list is a `<ul>` with a left hairline, not a row of chips. Nine
  chips under AI Systems would read as a keyword cloud, which is the "SaaS
  dashboard" register the brand rules rule out.
- CTA: `Start a project` → `/contact`, as a `ButtonLink`.
- Metadata: `What we do` — the `layout.tsx` template renders it as
  `What we do — HelloVibe`.

**No links to `/services/strategy`, `/services/systems`, `/services/products` or
`/services/creative`.** Those are in the source's route map but do not exist.
Linking them would replace three 404s with four new ones. See §8.

---

## 4. `/work` — `app/work/page.tsx`

The destination "Cases" has always named, and the first real consumer of
`data/cases.ts`.

There is still nothing published, so it renders the same honest empty state the
homepage block does — `Things we’re building.` and the supporting sentence — plus
two things the homepage block does not have room for:

1. **The four categories**, as full-width rows with their artefacts.
2. **The publishing rule.** A reader who clicks "Cases" and finds nothing deserves
   to know why: results appear only with verified numbers, and where there is no
   measurable result an entry says `Early-stage prototype` or `Currently in
   development`. Both strings are the source's.

`caseStudies` stays **empty on purpose**. Do not populate it to make this page look
fuller. When real entries land there with `published: true`, this page is where
they get rendered — the listing UI arrives with that work, not before it.

- Section: `<section aria-labelledby="work-page-title">`, **no `border-t`**.
- Exactly one `h1`, then four `h2`s — one per category.
- CTA: `Working on something similar?` + `Start a project` → `/contact`.
- No link to `/work/[slug]`, and no `CaseCard`.

---

## 5. `/about` — `app/about/page.tsx`

The destination "About" has always named, and the shortest page on the site.

The source gives the About page a headline and two sentences, then asks for
"team / workspace / experiments / screens / sketches / prototypes" as the visual —
**and none of those photographs exist.** It also rules out the obvious filler
outright:

> About не должен говорить: *"We are a team of passionate professionals..."*

So there is no team section, no founding story, no headcount and no stock imagery.
The page carries the recovered headline and both recovered lines, the studio
positioning and core idea from the Foundation Pack, and one honest paragraph about
why it is this short.

**The one authored paragraph:**

> The team, the workspace, the sketches, the prototypes — that page arrives when
> those photographs do. Until then this one stays thin on purpose: no stock
> imagery, no invented history, and nothing we can’t point at.

It follows the precedent `/contact` set: say plainly what is not here yet rather
than fill the space. "Nothing we can’t point at" is deliberate echo of the Cases
block's *"we’d rather show nothing than show work we can’t back up"*.

> **A note on a first draft.** The paragraph originally ended *"…and no line about
> how passionate we are"* — a nod to the source's own prohibition. The content
> harness asserts the About page never contains the word `passionate`, and it
> failed. The harness was right and the copy was wrong: the ban is on the
> corporate paragraph, but a page that winks at its own brief is a worse page. The
> line was rewritten rather than the check weakened.

---

## 6. `app/not-found.tsx`

Before this, a mistyped URL rendered Next's default 404 — no navbar, no footer, no
route out.

The custom page states the problem, then lists **every route that actually
resolves**, built from the same two sources the navbar and footer use:

```tsx
const AVAILABLE_ROUTES = [{ label: "Home", href: "/" }, ...mainNavigation, primaryCta];
```

Deriving it that way means the list cannot point at a route that 404s, and a page
cannot be added to it without also being reachable from the navigation. The harness
re-fetches every link on this page and asserts each returns 200.

`metadata` sets `robots: { index: false, follow: false }`.

---

## 7. `PageIntro` and the `/contact` refactor

`components/layout/PageIntro.tsx` owns the opening block every standalone page
shares: eyebrow, the page's single `h1`, a lead column, and an optional action row.

It deliberately renders **no `<section>`, no `<Container>` and no vertical
padding**, because `/services` and `/work` carry content below the intro while
`/contact` and `/about` do not. Each page wraps it:

```tsx
<section aria-labelledby="…">
  <Container className="py-section-lg">
    <PageIntro … />
    {/* page-specific content */}
  </Container>
</section>
```

`/contact` was moved onto it. That is a change to a shipped page, and it is the
only one in this task: it removes a duplicated header block rather than adding a
fifth copy, and it gives `/contact` the `aria-labelledby` its section was missing.

Colours inside `PageIntro` are `black/75` (8.05:1) and `black/70` (6.84:1), not
`--color-muted` (3.2:1 on the warm background, which fails AA). Same reasoning as
the navbar fix in `b882ad9`.

---

## 8. The doubled top border

`/contact` shipped with `<section className="border-t border-line">` directly under
a navbar that already has `border-b border-line`. Adjacent 1px borders of the same
colour render as one 2px line.

The homepage does not do this: `Hero` has no top border, and only the sections
*between* blocks carry `border-t`. All four standalone pages now follow the
homepage rule — the navbar's `border-b` is the only rule above the first block.

---

## 9. Constraints this task must not break

- **The frozen pillar list.** `data/services.ts` is untouched. Its four pillars,
  numbers, actions and descriptions are byte-identical to what the homepage renders.
- **The frozen block copy.** `data/cases.ts` is untouched; `/work` imports from it.
- **`caseStudies` stays empty.** It is the extension point, not a placeholder.
- **No invented content, anywhere.** No clients, logos, metrics, testimonials,
  awards, partnerships, certifications, team members or company history. The
  content harness checks for all of them.
- **No new dependencies.** No new routes beyond the three, plus the 404.
- **The homepage is unchanged.** No block was renumbered, reordered or edited.
- **Every earlier anchor still resolves:** `trust`, `the-ai-gap`, `what-we-do`,
  `how-we-work`, `ai-audit`, `cases`.

---

## 10. Verification

### Run, and clean

| Check | Command | Result |
|---|---|---|
| Typecheck | `node node_modules/typescript/bin/tsc --noEmit` | Clean, exit 0 |
| Lint | see the caveat below | Clean, exit 0 |
| Route status | `/`, `/services`, `/work`, `/about`, `/contact` | All `200` |
| Route status | unknown path | `404`, rendered by the custom page |
| Link integrity | every internal link and anchor on all six pages | **No broken links.** 6/6 pages answered as expected |
| Content | 151 assertions across the three pages and the 404 | **151/151** |
| Layout + a11y | 8 widths × 5 pages (320, 375, 390, 430, 768, 1024, 1280, 1440) | No horizontal overflow, no contrast failures, no missing focus rings, 1 `h1` per page, 0 interactive elements without an accessible name |

The content harness asserts more than presence. It asserts that each pillar's
capability list renders **under that pillar** — that `RAG` sits between
`AI Systems` and `AI Products` — so a drifted `id` join fails instead of silently
rendering an empty list.

### The lint caveat — partial coverage, stated plainly

`eslint` cannot complete in this sandbox: `eslint-config-next` enables the
`react-hooks` v6 React Compiler rules, and running the compiler kills the process
tree with `SIGTERM` and no output. This is an environment limitation, not a
finding about the code.

Lint was therefore run with those 14 rules disabled
(`config`, `error-boundaries`, `gating`, `globals`, `immutability`,
`incompatible-library`, `preserve-manual-memoization`, `purity`, `refs`,
`set-state-in-effect`, `set-state-in-render`, `static-components`,
`unsupported-syntax`, `use-memo`). It exits 0. `rules-of-hooks` and
`exhaustive-deps` stay on.

**The skipped rules cannot apply to this change.** Every file added here is a
Server Component or a plain module — no hooks, no refs, no effects. The one
existing Client Component touched is not touched at all; `ServiceVisual` is
imported, not modified. This has been recorded in the
`sandboxed-windows-git-and-build` skill so the next session does not re-diagnose it.

### Not run

**No production build.** The project's standing rule is to ask before running one,
because `next build` cleans `.next` and trips the bulk-delete guard. Verification
was done on `next dev` at port 3200, which means the HMR runtime and the dev
tooling indicator are present in the screenshots. Every page here is a static
Server Component with no dynamic API, so the prerender risk is low — but that is a
reasoning argument, not a measurement. Say the word and it can be built into a
fresh `distDir`, which performs zero deletions.

### A false failure worth recording

Full-page screenshots showed a filled dark box sitting on `priority use cases` in
the AI Systems list, with the text rendered light — exactly like a stray selection
highlight. It reproduced at two widths across two runs.

It was not real. A DOM probe found `getSelection().rangeCount === 0`, the focused
element was `body`, and every ancestor of that `<li>` computed to
`rgba(0, 0, 0, 0)`. A plain viewport screenshot of the same region rendered the text
normally. It is a `captureBeyondViewport` artefact.

This is the second false failure of the same family as the `1.11:1` contrast
report, and both are now recorded in the audit skill: **when a measurement looks
like a bug, suspect the measurement first.**

---

## 11. Definition of Done

- [x] `app/services/page.tsx`, `app/work/page.tsx`, `app/about/page.tsx` exist.
- [x] `app/not-found.tsx` exists and lists only resolving routes.
- [x] `components/layout/PageIntro.tsx` exists; `/contact` uses it.
- [x] `data/service-capabilities.ts` exists, keyed by pillar id.
- [x] Every navbar link resolves — verified, not assumed.
- [x] No internal link or anchor 404s anywhere on the site.
- [x] Each page has exactly one `h1`.
- [x] `/services` renders all 29 capability strings under the right pillar.
- [x] No invented client, metric, testimonial, logo, team member or history.
- [x] `/services` does not link to the deferred sub-routes.
- [x] Typecheck clean; lint clean under the documented partial config.
- [x] No horizontal overflow at any of the eight widths.
- [x] `data/services.ts` and `data/cases.ts` unmodified.
- [x] The homepage is unchanged.

---

## 12. Deferred

These are real, specified and out of scope. They are recorded so they are not
rediscovered.

| Deferred | Why |
|---|---|
| `/services/strategy`, `/services/systems`, `/services/products`, `/services/creative` | In the source's route map. Each needs its own layout and a decision about how much of the pillar to expand. Deliberately **not linked** from `/services`, so they cannot 404 |
| `/work/[slug]` | Needs `generateStaticParams` and a 404 path for unpublished slugs |
| `CaseCard`, `CaseHero` | There are no cases to card. A component that renders nothing is worse than no component |
| A case listing UI on `/work` | Arrives with the first real published case |
| `/contact`'s real form | The source specifies fields, intent routing and validation. Its own task |
| A sitemap and `robots.txt` | Source §29/§30. Small, but not this task |

---

## 13. Do not overbuild

Not in this task, and not implied by it:

- a `/services` filter, tab bar or comparison table;
- per-pillar landing pages;
- an About page with team members, photographs or a timeline;
- a 404 illustration, animation or search box;
- `generateStaticParams` anywhere;
- a sitemap, `robots.txt` or structured data;
- any change to the homepage.

If any of those feel necessary, that is a signal to ask, not to build.

---

## 14. Finding — not fixed, reported

**`Tag`'s `default` variant fails WCAG AA on the light background.**

`components/ui/Tag.tsx` defines:

```tsx
default: "border-line text-muted",
```

`--color-muted` is `#8a8882`, which measures **3.2:1** on `--color-bg`
(`#f5f3ee`). Body text needs 4.5:1. `border-line` is a light hairline, so this
variant can only ever be used on a light surface — it is unusable as written.

It has never shipped: the only `<Tag>` in the codebase uses `variant="vibe"`
(`bg-vibe` + `text-black`, which passes). So there is no visual regression today,
and this task did not need the component, so it was left alone.

The fix, when something needs it: `default: "border-line text-black/70"` — the
same 6.84:1 substitution the navbar and `PageIntro` already use. One line.

---

## 15. Commit

Two commits:

```text
feat: add the missing static routes and a custom 404
docs: add static pages implementation pack
```

---

## 16. Final response format

Report:

1. the files created and changed;
2. that all three navbar 404s are gone, with the route statuses;
3. the copy, with the two authored strings flagged;
4. the lint caveat, stated as partial coverage;
5. that no production build was run, and why;
6. the audit results across the eight widths;
7. the `Tag` finding from §14;
8. the commit hashes.

---

## 17. Open questions

1. **The `/about` casing.** `We like building things.` ships in sentence case,
   matching every other heading on the site. The source writes it in caps. If the
   caps were the point, say so and it changes.
2. **The `/about` paragraph.** It is the only authored sentence on these pages that
   carries a point of view. It could be cut entirely, leaving the page as headline
   and two lines.
3. **Should `/services` link to the four sub-routes once they exist?** Today it
   renders the pillars as content with no links, because linking them would 404.
   When the sub-pages arrive, this page becomes a hub and the pillars should link.
4. **The `/work` publishing rule.** Useful here, and arguably belongs on the
   homepage Cases block too — it explains the empty state in one sentence. Not
   added, because that block is shipped and audited.
5. **`/contact`'s real form.** Still a placeholder. It is the last route the navbar
   promises that is not really finished.
