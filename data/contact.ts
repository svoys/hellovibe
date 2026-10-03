/**
 * Contact form — the option sets, as stable machine-readable identifiers.
 *
 * Verbatim from the source's "Contact form" section (fields + validation rules)
 * and "Contact form content" section (the Step 01–05 questions and their
 * options). Nothing here is written for the form.
 *
 * ## Why these are ids and not labels
 *
 * Every option used to be a literal English string, and the form submitted that
 * string. The moment the site became bilingual that stopped working: the same
 * answer would arrive as `I want to use AI in my business` from the Russian page
 * and `I want to use AI in my business` from the English one, and a CRM would
 * have to reconcile two vocabularies for one intent — or worse, break the day a
 * translator reworded a label.
 *
 * So the `value` of every radio is now one of the identifiers below, and the
 * *label* is looked up per locale from `messages/<locale>.json` under
 * `ContactForm.<group>Options.<id>`. The payload is stable across languages and
 * across copy edits; only the pixels change.
 *
 * ## Why the ids are snake_case
 *
 * They are not internal keys — they leave the building. They are written the way
 * a backend, a webhook or a spreadsheet column would want to receive them
 * (`use_ai_business`, not `useAiBusiness`), so that whatever is eventually wired
 * to `lib/contact-delivery.ts` needs no translation table of its own. The rest
 * of the message keys in this project are local and human-facing; these are the
 * one namespace that is a contract, and the naming says so.
 */

/** Step 01 — the intent. Required; routes the lead. */
export const CONTACT_INTENT_IDS = [
  "use_ai_business",
  "build_ai_product",
  "automate_process",
  "scale_creative",
  "not_sure",
] as const;

export type ContactIntentId = (typeof CONTACT_INTENT_IDS)[number];

/** Step 03 — the stage. Required. */
export const CONTACT_STAGE_IDS = [
  "idea",
  "prototype",
  "existing_product",
  "existing_business",
  "scaling",
] as const;

export type ContactStageId = (typeof CONTACT_STAGE_IDS)[number];

/**
 * Step 04 — the budget. Optional.
 *
 * The source leaves this to commercial preference ("optional or required
 * depending on commercial preference"); it is optional here, so a lead is never
 * blocked on a number the reader may not have yet.
 */
export const CONTACT_BUDGET_IDS = [
  "under_10k",
  "from_10k_to_30k",
  "from_30k_to_75k",
  "from_75k_to_150k",
  "over_150k",
] as const;

export type ContactBudgetId = (typeof CONTACT_BUDGET_IDS)[number];

/** Step 05 — the timing. Optional. */
export const CONTACT_TIMING_IDS = [
  "asap",
  "months_1_2",
  "months_3_6",
  "exploring",
] as const;

export type ContactTimingId = (typeof CONTACT_TIMING_IDS)[number];
