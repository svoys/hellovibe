/**
 * Contact form — every string the form renders.
 *
 * Verbatim from the source's "Contact form" section (fields + validation rules)
 * and "Contact form content" section (the Step 01–05 questions and their
 * options). Nothing here is written for the form.
 *
 * Apostrophes are typographic (`’`) per the site convention, even where the
 * source used a straight one.
 */

/** Step 01 — the intent. Required; routes the lead. */
export const contactIntentQuestion = "What brings you here?";
export const contactIntentOptions: readonly string[] = [
  "I want to use AI in my business",
  "I want to build an AI product",
  "I want to automate a process",
  "I want to scale content / creative",
  "I’m not sure yet",
];

/** Step 02 — the goal. Required, free text. */
export const contactGoalQuestion = "What are you trying to achieve?";
export const contactGoalPlaceholder =
  "Tell us what’s happening, what you’re trying to change, or what’s currently not working.";

/** Step 03 — the stage. Required. */
export const contactStageQuestion = "Where are you today?";
export const contactStageOptions: readonly string[] = [
  "Idea",
  "Prototype",
  "Existing product",
  "Existing business",
  "Scaling",
];

/**
 * Step 04 — the budget. Optional.
 *
 * The source leaves this to commercial preference ("optional or required
 * depending on commercial preference"); it is optional here, so a lead is never
 * blocked on a number the reader may not have yet.
 */
export const contactBudgetQuestion = "What’s your approximate budget?";
export const contactBudgetOptions: readonly string[] = [
  "<$10k",
  "$10–30k",
  "$30–75k",
  "$75–150k",
  "$150k+",
];

/** Step 05 — the timing. Optional. */
export const contactTimingQuestion = "When are you looking to start?";
export const contactTimingOptions: readonly string[] = ["ASAP", "1–2 months", "3–6 months", "Exploring"];

/** The form's own submit label, and the line that sits under it. */
export const contactSubmitLabel = "Let’s talk";
export const contactMicrocopy = "No pitch deck required.";

/**
 * Shown when the message was genuinely delivered.
 *
 * Unreachable today: delivery is not connected (see `lib/contact-delivery.ts`),
 * so a valid submission returns `undelivered` instead. This state is wired and
 * renders the moment a delivery transport is added — it is deliberately not
 * shown otherwise, because a success screen for a message nobody received would
 * be a lie, and a lost lead.
 */
export const contactSuccessHeading = "Got it.";
export const contactSuccessBody = "Thanks — we’ll be in touch soon.";

/**
 * Shown when validation passed but nothing could actually be sent.
 *
 * Operational copy, not a claim: it states exactly what happened and gives the
 * one channel that really exists.
 */
export const contactUndeliveredHeading = "Nothing was sent.";
export const contactUndeliveredBody =
  "Automatic delivery is not connected yet, so this form cannot send your message. Write to us directly and we’ll pick it up from there.";
