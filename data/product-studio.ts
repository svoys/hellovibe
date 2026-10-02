/**
 * Section 09 — AI Product Studio.
 *
 * All of the prose below is verbatim from the source, with one deliberate
 * normalisation: the apostrophe in `Let’s` is typographic, matching every other
 * section on the site. The source itself mixes both forms — it writes `doesn't`
 * straight in the Method block and that still ships as `doesn’t` — so the site's
 * convention wins over the source's inconsistency.
 */

/** One beat of the product journey. */
export type StudioStage = {
  /** Stable key. */
  id: string;
  /** Stage name as the source gives it, e.g. `"Discovery"`. Uppercased by CSS. */
  label: string;
  /**
   * Expansion of an acronym the visitor cannot be expected to know.
   *
   * Only `MWP` and `MVP` carry one. The source defines both explicitly and
   * argues at length for the distinction, so printing the bare acronyms would
   * drop the single most load-bearing idea in the block.
   */
  gloss?: string;
};

/**
 * The six stages, in the source's order.
 *
 * Fixed — do not reorder or extend. The source gives this sequence four times
 * (`IDEA → DISCOVERY → PROTOTYPE → MWP → MVP → SCALE`) and never varies it.
 */
export const studioStages: readonly StudioStage[] = [
  { id: "idea", label: "Idea" },
  { id: "discovery", label: "Discovery" },
  { id: "prototype", label: "Prototype" },
  { id: "mwp", label: "MWP", gloss: "Minimum Working Product" },
  { id: "mvp", label: "MVP", gloss: "Minimum Viable Product" },
  { id: "scale", label: "Scale" },
];

/** The block's kicker, verbatim. Rendered uppercase. */
export const studioEyebrow = "Have an idea?";

/** The H2, verbatim. */
export const studioHeadline = "Let’s turn it into something people can use.";

/** The supporting paragraph, verbatim — including its em dash. */
export const studioBody =
  "From the first product hypothesis to a working MWP, MVP and beyond — we bring product, design, AI and engineering under one roof.";

/** The CTA, verbatim. */
export const studioCta = {
  label: "Build my product",
  href: "/contact",
} as const;

/**
 * The caption under the diagram — **written here, not recovered.**
 *
 * It has to do one job the source only implies: make it impossible to read the
 * abstract frame above as a real product or a screenshot of one. The source
 * permits a demo interface only when it is "visually obvious that it is a demo",
 * and this sentence is what carries that on the page.
 */
export const studioCaption =
  "A diagram, not a screenshot. The frame shows how a product firms up from wireframe to working interface — no real product, no client work, and no metrics are depicted.";
