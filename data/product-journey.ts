/**
 * Which abstract mark a stage draws.
 *
 * Every mark is built from CSS — borders, small shapes and type — never raster
 * imagery. See `components/home/JourneyVisual.tsx`.
 */
export type JourneyVisualKind = "discover" | "design" | "build" | "scale";

/** Stable key for one stage of the product journey. Doubles as its message key. */
export type JourneyStageId = "discover" | "design" | "build" | "scale";

/** One stage of the HelloVibe product journey. */
export type JourneyStage = {
  /** Stable key, and the key under `Journey.stages`. Builds the tab and panel ids. */
  id: JourneyStageId;
  /** Display index shown in the rail, e.g. `"01"`. */
  number: string;
  /** Abstract mark for this stage. */
  visual: JourneyVisualKind;
};

/**
 * The four stages, exactly as approved in the Product Journey Pack v0.1 §3.
 *
 * The copy is fixed — do not reword, reorder or extend this list. The phase
 * names, titles, descriptions, items and metaphors are all verbatim from the
 * pack and live in `messages/<locale>.json` under `Journey.stages.<id>`; the
 * strings are not to be "improved" in passing.
 *
 * Deliberately absent: durations and numbers-as-proof. Both are commitments,
 * and the pack does not invent commitments.
 */
export const journeyStages: readonly JourneyStage[] = [
  { id: "discover", number: "01", visual: "discover" },
  { id: "design", number: "02", visual: "design" },
  { id: "build", number: "03", visual: "build" },
  { id: "scale", number: "04", visual: "scale" },
];

/** Closing call to action, verbatim from the pack §4. Labels are `Journey.ctaPrompt` / `Journey.ctaLabel`. */
export const journeyCta = {
  href: "/contact",
} as const;
