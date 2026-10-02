/**
 * Section 11 — Why HelloVibe.
 *
 * All of the prose below is verbatim from the source, which gives this block
 * three times with identical wording. A fourth pass compresses the four
 * sentences to fragments (`Find the problem before the solution.` / `Users,
 * outcomes, adoption.`); that is a summary of the same copy, not a different
 * version of it, so the full sentences are the ones that ship.
 */

/** One of the four disciplines HelloVibe brings to a project. */
export type Discipline = {
  /** Stable key. */
  id: string;
  /** Discipline name, e.g. `"Strategy"`. */
  label: string;
  /** What that discipline contributes, verbatim. */
  description: string;
};

/**
 * The four disciplines, in the source's order.
 *
 * Every line is a statement about **how HelloVibe works**, never about what it
 * has achieved — no client, no result, no number. That is what makes this block
 * safe to publish with nothing to point at yet, and it is the same line the AI
 * Audit and Cases blocks hold. Do not add a fifth discipline, and do not
 * reword these into outcomes.
 *
 * Fixed — do not reorder or extend.
 */
export const disciplines: readonly Discipline[] = [
  {
    id: "strategy",
    label: "Strategy",
    description: "We know how to find the problem before building the solution.",
  },
  {
    id: "product",
    label: "Product",
    description: "We think in users, outcomes and adoption — not just features.",
  },
  {
    id: "technology",
    label: "Technology",
    description: "AI-native engineering from prototype to production.",
  },
  {
    id: "creative",
    label: "Creative",
    description: "Products should work beautifully and communicate clearly.",
  },
];

/**
 * The block's kicker.
 *
 * The source writes it as `06 — WHY HELLOVIBE`. The `06` is the source's own
 * internal index and must not ship — the on-page number for this block is `09`
 * and it lives in the `number` prop, not in the eyebrow. Same trap the Creative
 * Engine block records for `14. AI Creative Engine`.
 */
export const whyEyebrow = "Why HelloVibe";

/** The H2, verbatim. Two sentences, one line. */
export const whyHeadline = "Different disciplines. One team.";

/**
 * The closing statement, verbatim.
 *
 * Rendered as a paragraph rather than a heading — the source marks it with a
 * `#`, but it is a rhetorical close, and promoting it would put a second
 * section-level title in the heading outline.
 */
export const whyClosing = "The best AI work happens where these disciplines meet.";
