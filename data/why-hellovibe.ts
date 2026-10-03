/**
 * Structure for Section 11 — Why HelloVibe.
 *
 * Only the *structure* is here: the four discipline ids and their order. The
 * discipline names and the sentences under them, plus the block's kicker,
 * headline and closing line, are user-visible and live in
 * `messages/<locale>.json` under `Why`.
 *
 * Every line of that copy is a statement about **how HelloVibe works**, never
 * about what it has achieved — no client, no result, no number. That is what
 * makes this block safe to publish with nothing to point at yet, and it is the
 * same line the AI Audit and Cases blocks hold. Do not add a fifth discipline,
 * and do not reword these into outcomes.
 *
 * Fixed — do not reorder or extend.
 */

/** Stable key for one of the four disciplines. Doubles as its message key. */
export type DisciplineId = "strategy" | "product" | "technology" | "creative";

export const disciplines: readonly DisciplineId[] = [
  "strategy",
  "product",
  "technology",
  "creative",
];
