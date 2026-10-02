/**
 * Section 10 — AI Creative Engine.
 *
 * All of the prose below is verbatim from the source, with the same single
 * normalisation the Product Studio module applies: the apostrophe in `doesn’t`
 * is typographic, matching every other section on the site. The source writes
 * it straight here and still ships the curly form elsewhere, so the site's
 * convention wins over the source's inconsistency.
 */

/** One output format the seed idea can become. */
export type CreativeOutput = {
  /** Stable key. */
  id: string;
  /** Format name as the source gives it, e.g. `"Film"`. Uppercased by CSS. */
  label: string;
};

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
export const creativeOutputs: readonly CreativeOutput[] = [
  { id: "film", label: "Film" },
  { id: "reel", label: "Reel" },
  { id: "ad", label: "Ad" },
  { id: "social", label: "Social" },
  { id: "story", label: "Story" },
  { id: "landing", label: "Landing" },
];

/**
 * The single seed the whole diagram fans out from, verbatim.
 *
 * Rendered uppercase, so it reads `ONE IDEA` on the page exactly as the source
 * writes it.
 */
export const creativeSeed = "One idea";

/** The block's kicker, verbatim. The `×` is U+00D7. Rendered uppercase. */
export const creativeEyebrow = "AI × CREATIVE";

/** The H2, verbatim. */
export const creativeHeadline = "Your next creative team doesn’t sleep.";

/** The supporting paragraph, verbatim — including its em dash. */
export const creativeBody =
  "We build AI-powered content systems that turn strategy into a constant flow of ideas, campaigns, images, video and social content.";

/** The CTA, verbatim. */
export const creativeCta = {
  label: "Build a creative engine",
  href: "/contact",
} as const;

/**
 * The caption under the diagram — **written here, not recovered.**
 *
 * The same job the Product Studio caption does: the source is emphatic that no
 * client, no deliverable and no result may be implied, and a fan of six output
 * formats is exactly the shape that could be misread as a showreel. This
 * sentence is what stops that reading.
 */
export const creativeCaption =
  "A diagram, not a showreel. It shows the shape of the system — one idea branching into the formats it can feed — not a client campaign, a published asset or a measured result.";
