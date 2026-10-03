import {
  contactBudgetOptions,
  contactIntentOptions,
  contactStageOptions,
  contactTimingOptions,
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
 * the UI renders as a fixed set.
 */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!contactIntentOptions.includes(values.intent)) {
    errors.intent = "Choose one option.";
  }

  if (values.goal === "") {
    errors.goal = "This is required.";
  }

  if (!contactStageOptions.includes(values.stage)) {
    errors.stage = "Choose one option.";
  }

  // Optional — but if something was chosen it must be one of the options.
  if (values.budget !== "" && !contactBudgetOptions.includes(values.budget)) {
    errors.budget = "Choose one of the listed options.";
  }

  if (values.timing !== "" && !contactTimingOptions.includes(values.timing)) {
    errors.timing = "Choose one of the listed options.";
  }

  if (values.name === "") {
    errors.name = "This is required.";
  }

  if (values.email === "") {
    errors.email = "This is required.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  for (const field of CONTACT_FIELDS) {
    const max = MAX_LENGTH[field];
    if (max !== undefined && values[field].length > max) {
      errors[field] = `Please keep this under ${max} characters.`;
    }
  }

  return errors;
}
