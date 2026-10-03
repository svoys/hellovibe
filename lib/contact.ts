import {
  CONTACT_BUDGET_IDS,
  CONTACT_INTENT_IDS,
  CONTACT_STAGE_IDS,
  CONTACT_TIMING_IDS,
} from "@/data/contact";

/**
 * Contact form — the shape of a submission and the validation rules.
 *
 * Pure and server-safe: the Server Action is the only caller, but keeping the
 * rules here (rather than inline in the action) means the required/optional
 * split is readable in one place and cannot drift from the rendered fields.
 *
 * Required, per the source's Validation section: email (plus format), goal,
 * intent, stage. Optional: budget and timing. `name` is required as well — it is
 * one of the source's fields and a message with no name is not actionable, and
 * the success copy promises "we'll be in touch". `company` stays optional,
 * because the source's validation list does not mention it and a solo founder
 * has none.
 *
 * ## Why validation returns keys rather than sentences
 *
 * This module is locale-blind on purpose. `validateContact` answers *what is
 * wrong* — `{ key: "required" }` — and never *how to say it*. Two reasons:
 *
 * - The message depends on the reader's language, and this file is shared by
 *   both. A literal here would be a third copy of the same sentence in a
 *   codebase that already keeps one per locale.
 * - `app/[locale]/contact/actions.ts` is a `"use server"` module, so every
 *   export from it must be an async function. The mapping from key to sentence
 *   therefore cannot live next to the action; it lives here, in
 *   {@link describeContactIssues}, so the rules and the wording stay one file
 *   apart rather than in two.
 */

/** Every field the form submits, in the order the source lists them. */
export const CONTACT_FIELDS = [
  "intent",
  "goal",
  "stage",
  "budget",
  "timing",
  "name",
  "email",
  "company",
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactValues = Record<ContactField, string>;

/**
 * The keys under `ContactForm.errors`. A closed set, so a typo is a compile
 * error rather than a missing-key warning at runtime.
 */
export type ContactErrorKey =
  | "chooseOne"
  | "chooseListed"
  | "required"
  | "emailInvalid"
  | "tooLong";

/**
 * One validation failure: which message, and any values that message needs.
 *
 * `tooLong` carries `max` because the sentence interpolates it — `Please keep
 * this under {max} characters.` Keeping the number with the key is what lets
 * {@link describeContactIssues} stay a straight lookup.
 */
export type ContactIssue = {
  key: ContactErrorKey;
  values?: Record<string, string | number>;
};

/** What `validateContact` returns: one issue per bad field, at most. */
export type ContactIssues = Partial<Record<ContactField, ContactIssue>>;

/** What the form renders: one already-translated sentence per bad field. */
export type ContactErrors = Partial<Record<ContactField, string>>;

/**
 * The honeypot.
 *
 * A real person never sees or fills this — it is hidden from sight and from
 * assistive tech, and removed from the tab order. Anything that fills it is a
 * bot, and the action answers it exactly as it answers a real submission, so
 * the trap is not detectable.
 */
export const HONEYPOT_FIELD = "fax_number";

/**
 * The hidden field carrying the locale the form was rendered in.
 *
 * A Server Action cannot read the `[locale]` segment: Next 16.3's
 * `next/root-params` is documented not to work in Server Actions or Route
 * Handlers. So the form states its own locale explicitly and the action feeds
 * it to `getTranslations({ locale })` — which is the override branch in
 * `i18n/request.ts`. Without this field the validation messages would always
 * come back in the default locale, on both sites.
 *
 * It is a locale *tag*, not a label: it does not change with the copy, so it is
 * safe to submit alongside the machine-readable option ids.
 */
export const CONTACT_LOCALE_FIELD = "locale";

export const EMPTY_CONTACT_VALUES: ContactValues = {
  intent: "",
  goal: "",
  stage: "",
  budget: "",
  timing: "",
  name: "",
  email: "",
  company: "",
};

/** What the Server Action returns, and what the form renders from. */
export type ContactFormState =
  | { status: "idle" }
  | { status: "invalid"; errors: ContactErrors; values: ContactValues }
  | { status: "undelivered"; values: ContactValues }
  | { status: "success" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The option sets as lookup sets, for the membership checks below.
 *
 * `CONTACT_INTENT_IDS.includes(value)` cannot be used directly: the arrays are
 * `as const`, so their element type is the literal union and `includes` demands
 * an argument of that union — while what arrives from a form is a plain
 * `string`. Widening the arrays themselves would give up the `as const` typing
 * that the `Contact*Id` types are derived from, so the widening happens here
 * instead, once, at the point of use.
 */
const INTENT_IDS = new Set<string>(CONTACT_INTENT_IDS);
const STAGE_IDS = new Set<string>(CONTACT_STAGE_IDS);
const BUDGET_IDS = new Set<string>(CONTACT_BUDGET_IDS);
const TIMING_IDS = new Set<string>(CONTACT_TIMING_IDS);

/** Upper bounds, so a submission cannot be arbitrarily large. */
const MAX_LENGTH: Partial<Record<ContactField, number>> = {
  goal: 2000,
  name: 200,
  email: 254,
  company: 200,
};

/** Reads and trims every known field. Unknown fields are ignored entirely. */
export function readContactValues(formData: FormData): ContactValues {
  const values = { ...EMPTY_CONTACT_VALUES };

  for (const field of CONTACT_FIELDS) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim() : "";
  }

  return values;
}

/**
 * Server-side validation — the only validation that counts.
 *
 * The choice fields are checked against the approved option lists rather than
 * merely for emptiness, so a crafted POST cannot put arbitrary text into a field
 * the UI renders as a fixed set. Because those lists hold identifiers and not
 * labels, this check is identical in both locales and survives any copy edit.
 */
export function validateContact(values: ContactValues): ContactIssues {
  const issues: ContactIssues = {};

  if (!INTENT_IDS.has(values.intent)) {
    issues.intent = { key: "chooseOne" };
  }

  if (values.goal === "") {
    issues.goal = { key: "required" };
  }

  if (!STAGE_IDS.has(values.stage)) {
    issues.stage = { key: "chooseOne" };
  }

  // Optional — but if something was chosen it must be one of the options.
  if (values.budget !== "" && !BUDGET_IDS.has(values.budget)) {
    issues.budget = { key: "chooseListed" };
  }

  if (values.timing !== "" && !TIMING_IDS.has(values.timing)) {
    issues.timing = { key: "chooseListed" };
  }

  if (values.name === "") {
    issues.name = { key: "required" };
  }

  if (values.email === "") {
    issues.email = { key: "required" };
  } else if (!EMAIL_PATTERN.test(values.email)) {
    issues.email = { key: "emailInvalid" };
  }

  for (const field of CONTACT_FIELDS) {
    const max = MAX_LENGTH[field];
    if (max !== undefined && values[field].length > max) {
      issues[field] = { key: "tooLong", values: { max } };
    }
  }

  return issues;
}

/**
 * Turns validation keys into the sentences the form renders.
 *
 * @param issues what {@link validateContact} found
 * @param t a `ContactForm` translator — passed in rather than imported, because
 *   the locale is only known inside the request that is handling the submission
 */
export function describeContactIssues(
  issues: ContactIssues,
  t: (key: string, values?: Record<string, string | number>) => string,
): ContactErrors {
  const errors: ContactErrors = {};

  for (const field of CONTACT_FIELDS) {
    const issue = issues[field];
    if (issue) errors[field] = t(`errors.${issue.key}`, issue.values);
  }

  return errors;
}
