"use server";

import { deliverContactMessage } from "@/lib/contact-delivery";
import {
  HONEYPOT_FIELD,
  readContactValues,
  validateContact,
  type ContactFormState,
} from "@/lib/contact";

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
  const errors = validateContact(values);

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const outcome = await deliverContactMessage(values);

  return outcome.ok ? { status: "success" } : { status: "undelivered", values };
}
