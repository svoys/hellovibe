"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing, type AppLocale } from "@/i18n/routing";
import { deliverContactMessage } from "@/lib/contact-delivery";
import {
  CONTACT_LOCALE_FIELD,
  HONEYPOT_FIELD,
  describeContactIssues,
  readContactValues,
  validateContact,
  type ContactFormState,
} from "@/lib/contact";

/**
 * Which catalogue the validation messages come back in.
 *
 * `next/root-params` — the mechanism `i18n/request.ts` uses to read `[locale]`
 * everywhere else — is documented not to work in Server Actions. So the form
 * submits the locale it was rendered in, and this is where it is trusted.
 *
 * "Trusted" is the wrong word: the value arrives from the browser, so it is
 * validated against `routing.locales` before it reaches `getTranslations`. An
 * unknown or missing value falls back to the default locale rather than
 * throwing, because a validation message in the wrong language is a nuisance
 * and a 500 on the contact form is a lost lead.
 */
function resolveLocale(formData: FormData): AppLocale {
  const raw = formData.get(CONTACT_LOCALE_FIELD);

  return typeof raw === "string" && hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
}

/**
 * The contact form's Server Action.
 *
 * Follows the source's flow — Client → Server Action → Validation → delivery →
 * success state — with validation and the honeypot both happening here, on the
 * server, where they actually count. The client-side `required` attributes are
 * only a convenience; nothing is trusted from the browser.
 *
 * It returns a plain state object rather than throwing, so the form can render
 * the failure without losing what the reader typed.
 *
 * ## What crosses the wire
 *
 * The submitted values are the machine-readable identifiers from
 * `data/contact.ts` (`use_ai_business`, `existing_product`, …), never the
 * translated labels — so a submission means the same thing whichever site it
 * came from, and a copy edit cannot change the payload. What comes *back* is
 * the opposite: already-translated sentences, because the messages are the one
 * thing that does depend on the reader's language.
 */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  /*
   * The honeypot. A real person cannot see or focus this field, so anything in
   * it came from a bot — and the answer is deliberately the same `success` shape
   * a real submission gets, so the trap cannot be detected by probing.
   */
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { status: "success" };
  }

  const values = readContactValues(formData);
  const issues = validateContact(values);

  if (Object.keys(issues).length > 0) {
    /*
     * The locale override is the whole reason `i18n/request.ts` accepts an
     * explicit `locale`: without it, `getTranslations` would fall through to
     * the default locale and an English reader would get Russian errors.
     */
    const t = await getTranslations({
      locale: resolveLocale(formData),
      namespace: "ContactForm",
    });

    return { status: "invalid", errors: describeContactIssues(issues, t), values };
  }

  const outcome = await deliverContactMessage(values);

  return outcome.ok ? { status: "success" } : { status: "undelivered", values };
}
