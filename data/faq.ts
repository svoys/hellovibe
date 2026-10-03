/**
 * Structure for Section 13 — FAQ.
 *
 * Only the *structure* is here: the six ids and their order. Each question and
 * its answer — an array of paragraphs — live in `messages/<locale>.json` under
 * `Faq.items.<id>`, as do the block's kicker and headline.
 *
 * The source gives this block four times. Three of those passes carry the full
 * question set, and **two of them are character-identical**; the fourth is a
 * bare list of topics (`existing companies vs startups`, `how projects start`)
 * rather than copy. A third full pass gives the same six questions with shorter
 * answers.
 *
 * The wording given twice verbatim is the one that ships — the same rule the
 * Creative Engine module applies to its six-item list. The shorter variant is
 * still accounted for: nothing in it contradicts what ships, it simply says
 * less.
 *
 * Fixed — do not reorder, extend or reword. The set answers the six things the
 * source names explicitly, and no more.
 */

/**
 * Stable key for one question. Doubles as its message key.
 *
 * Not rendered: the native `<details>` element needs no `aria-controls` wiring,
 * so there is no id to hang off the answer.
 */
export type FaqItemId =
  | "who-we-work-with"
  | "defined-brief"
  | "ai-only"
  | "idea-to-launch"
  | "existing-team"
  | "how-projects-start";

export const faqItems: readonly FaqItemId[] = [
  "who-we-work-with",
  "defined-brief",
  "ai-only",
  "idea-to-launch",
  "existing-team",
  "how-projects-start",
];
