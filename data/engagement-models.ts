/**
 * Structure for Section 12 — Engagement Models.
 *
 * Only the *structure* is here: the two model ids, their order and their
 * destination. The model names, the audience lines, the item lists, the
 * outcome lines and the CTA labels are user-visible and live in
 * `messages/<locale>.json` under `Engagement.models.<id>`, as do the block's
 * kicker and headline.
 *
 * The prose is verbatim from the source, which gives this block four times.
 * Three of those passes carry the full phrasing — two of them
 * character-identical — and a fourth restates the same two models as short
 * fragments (`Defined challenge. / Fixed scope. / Clear outcome.`). That is a
 * compression of the same copy, not a different version of it, so the full
 * phrasing is what ships.
 */

/** Stable key for one of the two ways to work with HelloVibe. Doubles as its message key. */
export type EngagementModelId = "project" | "partnership";

/** One of the two ways to work with HelloVibe. */
export type EngagementModel = {
  /** Stable key, and the key under `Engagement.models`. */
  id: EngagementModelId;
  /** Destination. No per-model route exists, so both point at `/contact`. */
  href: string;
};

/**
 * The two models, in the source's order: the defined-scope engagement first,
 * the continuous one second.
 *
 * Both carry a CTA and both are written in bold in the source, so they ship at
 * equal weight — the block presents a choice, not a recommendation. Note that
 * `Button`'s `secondary` variant is *not* used to soften the second one: it is
 * unused everywhere else in the codebase, and its `border-line` measures about
 * 1.3:1 against a white card, so debuting it here would ship a control whose
 * boundary is barely visible. See the pack §4.
 */
export const engagementModels: readonly EngagementModel[] = [
  { id: "project", href: "/contact" },
  { id: "partnership", href: "/contact" },
];
