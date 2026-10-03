# Service Pillars — Implementation Pack v0.1

Task #29 — the four `/services/*` pillar pages. Commit `88b2aac`
(`feat: add service pillar pages`).

---

## 1. What this covers

Four addressable pages:

```
/services/strategy
/services/systems
/services/products
/services/creative
```

They were the last gap between the shipped site and the source's own route map.
Everything before this task is unchanged.

## 2. Source of truth for the routes

`§05 Route map` → **"Main routes"**:

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

These are main routes, not "future" ones — unlike `/work/[slug]`, which the same
section defers until real case studies exist. That distinction is why these four
were built and `/work/[slug]` was not.

`§16 Services` fixes the same thing from the data side: each service card carries
`href: "/services/strategy"`.

## 3. The slug is not the id

| pillar id (internal key) | route slug (public) |
|---|---|
| `ai-strategy` | `strategy` |
| `ai-systems` | `systems` |
| `ai-products` | `products` |
| `ai-creative` | `creative` |

The id joins the capability list and keys the React lists; the slug is a public
route and the source decides it. The mapping lives in the new
`data/service-pillars.ts` rather than as a `slug` field on `Service`, because
`data/services.ts` is frozen ("do not reword, reorder or extend this list") and
the homepage grid has no use for a route. This is the same call
`data/service-capabilities.ts` already made.

Because `Service["id"]` is a plain `string`, the compiler cannot notice a fifth
pillar arriving without a slug. `service-pillars.ts` therefore validates the map
against the actual ids at module scope and **throws** — otherwise the new pillar
would ship as the route `/services/undefined`, a 404 nobody would trace back.

## 4. No invented content — the governing principle

Every visible string on these pages was already approved elsewhere:

| element | source |
|---|---|
| label `01 — FIND` | `Service.number` + `Service.action`, `data/services.ts` |
| h1 `AI Strategy` | `Service.title`, `data/services.ts` |
| lead sentence | `Service.description`, `data/services.ts` |
| `Includes` list | `data/service-capabilities.ts` (brand rules `§2 Core services`) |
| diagram | `ServiceVisual` — the same component the homepage cards use |
| CTA `Start a project` | `primaryCta`, `data/navigation.ts` |

Nothing was written for these pages. No metrics, no testimonials, no clients, no
logos, no case studies, no invented process — the pages are thin because the
source is thin, and padding them would have meant inventing claims. The page
earns its place by being addressable and by carrying the cross-navigation.

## 5. The `Includes` list, and its length

The brief said "Includes 4–6 пунктов". The rendered counts are **6 / 9 / 8 / 6**.

That is not a deviation by accident. The source gives the pillar contents twice:

- `§2 Core services` — the brand-rules list: **6 / 9 / 8 / 6** items
  (`AI audit`, `opportunity mapping`, … / `AI agents`, `workflows`, `RAG`, …).
- the "Four service cards" pass — the same contents condensed for a card:
  4 / 5 / 6 / 5 items.

`/services` already ships the `§2` list, and it is the only version that exists in
the codebase (`data/service-capabilities.ts`). Reusing it keeps one source for
the contents and avoids a second, competing list. **No new list was written.**

If the 4–6 figures were meant literally, the fix is to switch the pillar pages
(and `/services`) to the card-pass list — one module change, no page changes. It
was not done unilaterally because it would mean introducing a second contents
list for the same four pillars.

## 6. Page composition

`app/services/[slug]/page.tsx` — a dynamic route with `generateStaticParams`, so
the build emits exactly four static pages and nothing else. An unknown slug calls
`notFound()`.

```text
PageIntro      eyebrow "01 — Find" · h1 "AI Strategy" · lead = the approved sentence
hv-grid        left:  "Includes" + the contents list
               right: the pillar's abstract diagram, in the same frame `/services` uses
Four pillars   PillarCrossNav — all four, current marked
CTA            ButtonLink → /contact
```

The one dark pillar (`ai-products`) keeps its dark frame, so `/services` and the
pillar page present the same four pillars as one system.

Params are typed by hand (`{ params: Promise<{ slug: string }> }`) rather than
with the generated `PageProps<…>` helper: that helper's route union comes from
`.next/dev/types/routes.d.ts`, which Next regenerates, so on the first
`tsc --noEmit` after adding a route the union is still stale. The hand-written
type is structurally identical and `next build` still validates the page against
the real route types.

No `border-t` — the navbar already draws the rule above the first block, and
every other page follows the same rule.

## 7. Cross-navigation

`components/services/PillarCrossNav.tsx`. All four pillars are listed, not just
the other three: a reader arriving from search lands on one pillar with no idea
the others exist, so the list doubles as the answer to "what else does HelloVibe
do".

- The current pillar renders as text with **`aria-current="page"`** and is *not*
  a link to itself — the state is carried by ARIA, not by styling alone.
- The other three are `ArrowLink`s, i.e. real `next/link`s with the site's
  existing arrow affordance.
- It is its own `nav` landmark with `aria-label="Service pillars"`, so it is
  reachable as a landmark rather than only by tabbing.

## 8. The CTA

One per page, pointing at `/contact` via the shared `primaryCta`.

The source gives each pillar a CTA — "Explore AI Strategy →" — but that is the
link *into* the page. On the page itself the only honest next step is the shared
one, so no per-pillar product flow was invented. The source's own CTAs were
instead added where they belong: on `/services`, under each pillar's contents.

## 9. Homepage cards

`ServiceCard` now renders the whole card as a `next/link`.

The source's card spec does carry a CTA inside the card, but nesting it inside a
card-wide link would put an anchor inside an anchor. One target for the whole
card is valid HTML and the larger hit area.

`href` is passed in rather than looked up inside the card, so the card stays
presentational and knows nothing about routes; `Services.tsx` maps
`servicePillars` instead of `services`, which is a three-line change to the block
and no change to its layout.

## 10. Footer links, and the removal of `serviceLinks`

`serviceLinks` in `data/services.ts` pointed all four entries at `/services`,
with a comment explaining that the sub-routes did not exist and inventing them
was out of scope. They exist now, so that export was **removed** and the footer
reads `servicePillarLinks` from `data/service-pillars.ts`.

It was removed rather than rewritten in place to avoid an import cycle:
`service-pillars.ts` reads `services` from `data/services.ts`, so importing back
would have made the two modules mutually dependent and risked a temporal-dead-zone
error at module-eval time.

`data/ai-audit.ts` carried a comment asserting that `serviceLinks` "already
points all four pillars" at `/services`. That claim became false; the comment was
trimmed. `auditCta.href` was **not** changed — it still points at `/services`.

## 11. Files

**Created**

- `data/service-pillars.ts` — slug map, `servicePillars`, `pillarBySlug`,
  `servicePillarLinks`, and the build-time guard
- `app/services/[slug]/page.tsx` — the four pages
- `components/services/PillarCrossNav.tsx` — cross-navigation

**Modified**

- `app/services/page.tsx` — maps `servicePillars`, adds the source's
  "Explore … →" per pillar, drops the now-false "these routes do not exist" note
- `components/home/ServiceCard.tsx` — the card is a link
- `components/home/Services.tsx` — maps `servicePillars`
- `data/services.ts` — `serviceLinks` removed
- `data/navigation.ts` — `footerServices` reads `servicePillarLinks`
- `data/ai-audit.ts` — stale comment trimmed

## 12. Verification

| check | result |
|---|---|
| `tsc --noEmit` | clean (exit 0) |
| `eslint` (full config, React Compiler rules on) on all 9 changed files | clean (exit 0) |
| `next build` | exit 0; 12 static pages; exactly the four pillar routes as SSG, no extras |
| route status | 4 pillars + `/`, `/services`, `/work`, `/about`, `/contact` → 200 |
| unknown slug | `/services/definitely-not-a-pillar` → **404** |
| link integrity | 11/11 pages answered as expected; every internal link and anchor resolves |
| per page | h1, eyebrow, 6/9/8/6 includes, `Includes` + `Four pillars` headings, diagram present, CTA → `/contact` |
| cross-nav | 4 rows, exactly one `aria-current="page"`, that row is not a link, the other three link to the other three pillars |
| homepage | all four cards link to their pillar |
| footer | four service links, one per pillar — no longer all `/services` |
| mobile (390) | no horizontal overflow on any of the four |
| keyboard | all 3 cross-nav links + the CTA reachable by Tab, each with a visible focus ring |
| console | no errors, no warnings, no hydration warnings |

The build used the usual sandbox workaround: a temporary `distDir`
(`.next/prod-verify-7`) so Next performs no deletions, reverted immediately, and
`tsconfig.json` restored afterwards. Nothing was deleted.

**One false failure worth recording:** the first keyboard run reported 12
cross-nav links instead of 3. Tab order wraps, so the same three links were
counted repeatedly across 90 presses — the measurement was wrong, not the page.
The probe now counts distinct elements. The second run passed.

**And one false alarm:** a dark circular badge appears at the left edge of the
screenshots. It is the Next.js dev-tools indicator — fixed-position, dev-only,
absent from the production HTML (checked: zero matches for `nextjs-portal` /
`dev-tools` in the prerendered output).

## 13. Deliberately not done

- No `/work/[slug]` — the source defers dynamic case pages until real cases exist.
- No contact form, no sitemap (task #42, blocked on a delivery decision).
- No change to `auditCta.href`.
- No second contents list for the pillars.
- No per-pillar product flow or per-pillar CTA copy.
- Hero, AI Gap, Product Journey, Navbar, Footer layout, brand tokens, typography
  and the accepted visual components are untouched. `Services.tsx` changed only
  in which list it maps and what it passes to the card.
