/**
 * Structure for Section 09 — AI Product Studio.
 *
 * Only the *structure* is here: the six stage ids and which of them carries an
 * acronym gloss. The stage names, the two glosses, the block's kicker, headline,
 * body, caption and CTA label are user-visible and live in
 * `messages/<locale>.json` under `Studio`.
 */

/** Stable key for one beat of the product journey. Doubles as its message key. */
export type StudioStageId = "idea" | "discovery" | "prototype" | "mwp" | "mvp" | "scale";

/** The two acronyms the block expands. */
export type StudioGlossId = "mwp" | "mvp";

/** One beat of the product journey. */
export type StudioStage = {
  /** Stable key, and the key under `Studio.stages`. */
  id: StudioStageId;
  /**
   * Which `Studio.glosses` entry expands this stage's acronym, if any.
   *
   * Only `MWP` and `MVP` carry one. The source defines both explicitly and
   * argues at length for the distinction, so printing the bare acronyms would
   * drop the single most load-bearing idea in the block. The gloss text itself
   * is localised, which is why this is a key and not a string.
   */
  gloss?: StudioGlossId;
};

/**
 * The six stages, in the source's order.
 *
 * Fixed — do not reorder or extend. The source gives this sequence four times
 * (`IDEA → DISCOVERY → PROTOTYPE → MWP → MVP → SCALE`) and never varies it.
 */
export const studioStages: readonly StudioStage[] = [
  { id: "idea" },
  { id: "discovery" },
  { id: "prototype" },
  { id: "mwp", gloss: "mwp" },
  { id: "mvp", gloss: "mvp" },
  { id: "scale" },
];

/** The CTA. Label is `Studio.ctaLabel`. */
export const studioCta = {
  href: "/contact",
} as const;
