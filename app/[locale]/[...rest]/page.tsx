import { notFound } from "next/navigation";

/**
 * Catch-all for URLs that match no route.
 *
 * ## Why this file has to exist
 *
 * `not-found.tsx` only renders when something *calls* `notFound()` — it is a
 * boundary, not a router fallback. A URL that matches no route at all never
 * reaches it: Next looks for the nearest `not-found.tsx` along the *matched*
 * segments, and for an unmatched URL the only matched segment is the root, where
 * this project deliberately has no `app/layout.tsx` (see the note in
 * `app/[locale]/layout.tsx`) and therefore no `app/not-found.tsx` either. The
 * visitor was landing on Next's bare built-in 404 — no navbar, no way back into
 * the site — which is exactly the problem the branded 404 was written to solve.
 *
 * So this route exists to turn "matches nothing" into "matched, and calls
 * `notFound()`", which is the case the branded 404 already handles. It is the
 * documented next-intl pattern for a localised 404 and the only one that keeps
 * the 404 *inside* `[locale]`, where the locale is known: a root
 * `app/not-found.tsx` or a `global-not-found.tsx` would sit above the `[locale]`
 * segment and could not know which language to answer in.
 *
 * ## What it covers
 *
 * The middleware prefixes the default locale onto anything unmatched, so
 * `/definitely-not-a-page` arrives here as `/ru/definitely-not-a-page` and
 * `/zz/nope` as `/ru/zz/nope`. Both then render `app/[locale]/not-found.tsx`
 * with a real 404 status and `<html lang="ru">`. `/en/…` works the same way for
 * the English site.
 *
 * It does **not** shadow the real routes: Next prefers an exact or more specific
 * match, so `/services/strategy` still renders its pillar page, and
 * `/services/strategyy` is caught by `[slug]` and 404s from there.
 *
 * Nothing is rendered here on purpose — no markup, no metadata. The status code
 * and the page both come from `notFound()`.
 */
export default function CatchAllPage() {
  notFound();
}
