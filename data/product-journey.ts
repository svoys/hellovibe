/**
 * Which abstract mark a stage draws.
 *
 * Every mark is built from CSS — borders, small shapes and type — never raster
 * imagery. See `components/home/JourneyVisual.tsx`.
 */
export type JourneyVisualKind = "diagnose" | "define" | "build" | "scale";

/** One stage of the HelloVibe product journey. */
export type JourneyStage = {
  /** Stable key. Also used to build the tab and panel ids. */
  id: string;
  /** Display index shown in the rail, e.g. `"01"`. */
  number: string;
  /** Short phase name, rendered uppercase in mono. */
  phase: string;
  /** Stage headline — the rail label and the panel's accessible name. */
  title: string;
  /** One or two sentences of detail. */
  description: string;
  /** What the client actually receives at the end of this stage. */
  outputs: readonly string[];
  /** Abstract mark for this stage. */
  visual: JourneyVisualKind;
};

/**
 * The four stages, exactly as approved in the Product Journey Pack v0.1 §3.
 *
 * The copy is fixed — do not reword, reorder or extend this list.
 *
 * Deliberately absent: durations and numbers-as-proof. Both are commitments,
 * and the pack does not invent commitments.
 */
export const journeyStages: readonly JourneyStage[] = [
  {
    id: "diagnose",
    number: "01",
    phase: "Diagnose",
    title: "Find where AI actually pays off.",
    description:
      "We map how your business really works, then rank the places AI can move the needle — and the ones that only look good in a demo.",
    outputs: ["Opportunity map", "Ranked use cases", "A clear recommendation"],
    visual: "diagnose",
  },
  {
    id: "define",
    number: "02",
    phase: "Define",
    title: "Turn the opportunity into a plan.",
    description:
      "We shape the strongest bet into a scoped product or system — what we build, what we don’t, and how we’ll know it worked.",
    outputs: ["Scope and success criteria", "Prototype direction", "Effort and timeline"],
    visual: "define",
  },
  {
    id: "build",
    number: "03",
    phase: "Build",
    title: "Build the working version.",
    description:
      "We design and build the real thing in short cycles, so you review working software instead of another slide deck.",
    outputs: ["Working software", "Visible progress", "Decisions documented"],
    visual: "build",
  },
  {
    id: "scale",
    number: "04",
    phase: "Scale",
    title: "Make it real — and keep it real.",
    description:
      "We launch, measure and improve against real usage, then hand your team something they can run without us.",
    outputs: ["Launch and measurement", "Iteration on real usage", "Handover your team can run"],
    visual: "scale",
  },
];
