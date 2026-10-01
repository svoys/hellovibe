/**
 * Which abstract mark a stage draws.
 *
 * Every mark is built from CSS — borders, small shapes and type — never raster
 * imagery. See `components/home/JourneyVisual.tsx`.
 */
export type JourneyVisualKind = "discover" | "design" | "build" | "scale";

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
  /** What HelloVibe can pick up at this stage. */
  items: readonly string[];
  /** The visual metaphor, rendered as the caption under the mark. */
  metaphor: string;
  /** Abstract mark for this stage. */
  visual: JourneyVisualKind;
};

/**
 * The four stages, exactly as approved in the Product Journey Pack v0.1 §3.
 *
 * The copy is fixed — do not reword, reorder or extend this list. The phase
 * names, titles, descriptions, items and metaphors are all verbatim from the
 * pack; the strings are not to be "improved" in passing.
 *
 * Deliberately absent: durations and numbers-as-proof. Both are commitments,
 * and the pack does not invent commitments.
 */
export const journeyStages: readonly JourneyStage[] = [
  {
    id: "discover",
    number: "01",
    phase: "Discover",
    title: "Find the opportunity.",
    description: "We start with the problem, the business and the people behind it.",
    items: ["AI Audit", "Product Discovery", "Creative Audit"],
    metaphor: "Question → Signals → Opportunity",
    visual: "discover",
  },
  {
    id: "design",
    number: "02",
    phase: "Design",
    title: "Shape what could work.",
    description: "We turn the opportunity into a clear product, system or creative direction.",
    items: ["Strategy", "UX / UI", "Architecture", "Prototype"],
    metaphor: "Idea → Flow → Prototype",
    visual: "design",
  },
  {
    id: "build",
    number: "03",
    phase: "Build",
    title: "Make it real.",
    description:
      "We combine product, design, engineering and AI to build something people can actually use.",
    items: ["AI Systems", "MWP", "MVP", "Creative Engine"],
    metaphor: "Prototype → System → Product",
    visual: "build",
  },
  {
    id: "scale",
    number: "04",
    phase: "Scale",
    title: "Make it better. Then make it bigger.",
    description: "We optimize what works, automate what doesn’t and keep building from there.",
    items: ["Optimization", "Product Team", "Automation", "Growth"],
    metaphor: "Learn → Optimize → Scale",
    visual: "scale",
  },
];

/** The block's headline copy, verbatim from the pack §2. */
export const journeyHeadline = "Start anywhere. We’ll figure out what’s next.";

/** Supporting line under the headline, verbatim from the pack §2. */
export const journeySupporting = "You don’t need to know exactly what to build. That’s our job.";

/** Closing call to action, verbatim from the pack §4. */
export const journeyCta = {
  prompt: "Not sure where to start?",
  label: "Start a project",
  href: "/contact",
} as const;
