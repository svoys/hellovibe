/**
 * Structure for Section 10 — AI Creative Engine.
 *
 * Only the *structure* is here: the six output formats and their order. The
 * format names, the seed, the block's kicker, headline, body, caption and CTA
 * label are user-visible and live in `messages/<locale>.json` under `Creative`.
 */

/** Stable key for one output format. Doubles as its message key. */
export type CreativeOutputId = "film" | "reel" | "ad" | "social" | "story" | "landing";

/**
 * The six formats, in the source's order.
 *
 * The source lists this fan three times. Twice it gives the identical six-item
 * sequence below; the third pass gives a longer seven-item list that adds
 * `Campaign` and `Static`. The six-item sequence is the one given twice
 * verbatim, so it is the one that ships — and `Campaign` is still accounted
 * for, because the block's own body copy names it.
 *
 * Fixed — do not reorder or extend.
 */
export const creativeOutputs: readonly CreativeOutputId[] = [
  "film",
  "reel",
  "ad",
  "social",
  "story",
  "landing",
];

/** The CTA. Label is `Creative.ctaLabel`. */
export const creativeCta = {
  href: "/contact",
} as const;
