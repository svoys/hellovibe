/** One stage of the HelloVibe method. */
export type MethodStage = {
  /** Stable key. Also used to build the row's ids. */
  id: string;
  /** Display index shown in the meta row, e.g. `"01"`. */
  number: string;
  /** Stage name — stored in sentence case and rendered uppercase, like `phase`. */
  title: string;
  /** One sentence. */
  description: string;
};

/**
 * The five stages, verbatim from the source's Method section.
 *
 * The copy is fixed — do not reword, reorder or extend this list. The source
 * gives the stages as `UNDERSTAND / FOCUS / BUILD / LAUNCH / LEARN` in caps; they
 * are stored here in sentence case and uppercased by CSS, the same convention
 * `journeyStages.phase` and the service `action` labels already use.
 *
 * The source's technical spec asks for exactly this shape:
 *
 *   const method = [{ number: "01", title: "UNDERSTAND", description: "..." }, …]
 *
 * Deliberately absent: durations. A "1–2 week" claim per stage would be a
 * commitment the source never makes — the same reason the Product Journey stages
 * carry no `when` field.
 */
export const methodStages: readonly MethodStage[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand",
    description: "We start with the business, not the technology.",
  },
  {
    id: "focus",
    number: "02",
    title: "Focus",
    description: "We identify the smallest opportunity that can create meaningful value.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description: "We combine product, design, engineering and AI into one team.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch",
    description: "Real users beat internal assumptions.",
  },
  {
    id: "learn",
    number: "05",
    title: "Learn",
    description: "We measure what works, improve what doesn’t and keep moving.",
  },
];

/** The block's headline, verbatim from the source. */
export const methodHeadline = "Think first. Build fast. Learn constantly.";

/** The closing line, verbatim from the source. */
export const methodClosing = "No six-month black boxes. No innovation theatre. Just things that work.";
