/**
 * Structure for the Method block.
 *
 * Only the *structure* is here: the stage ids, their order and their display
 * indices. The stage names and their one-sentence descriptions are user-visible
 * and live in `messages/<locale>.json` under `Method.stages.<id>`, as do the
 * block's kicker, headline and closing line.
 *
 * The copy is fixed — do not reword, reorder or extend this list. The source
 * gives the stages as `UNDERSTAND / FOCUS / BUILD / LAUNCH / LEARN` in caps; they
 * are stored in sentence case in the catalogues and uppercased by CSS, the same
 * convention the journey's `phase` and the service `action` labels already use.
 *
 * Deliberately absent: durations. A "1–2 week" claim per stage would be a
 * commitment the source never makes — the same reason the Product Journey stages
 * carry no `when` field.
 */

/** Stable key for one stage of the HelloVibe method. Doubles as its message key. */
export type MethodStageId = "understand" | "focus" | "build" | "launch" | "learn";

/** One stage of the HelloVibe method. */
export type MethodStage = {
  /** Stable key, and the key under `Method.stages`. Also used to build the row's ids. */
  id: MethodStageId;
  /** Display index shown in the meta row, e.g. `"01"`. */
  number: string;
};

/** The five stages, in the source's order. */
export const methodStages: readonly MethodStage[] = [
  { id: "understand", number: "01" },
  { id: "focus", number: "02" },
  { id: "build", number: "03" },
  { id: "launch", number: "04" },
  { id: "learn", number: "05" },
];
