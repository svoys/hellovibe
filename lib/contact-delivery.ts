import type { ContactValues } from "@/lib/contact";

/**
 * Where a validated submission goes.
 *
 * This is the one seam between the form and the outside world, and it is
 * deliberately not connected. The source's flow is
 * `Client → Server Action → Validation → Email provider / CRM → Success state`,
 * and the provider step is an open decision: the source names no vendor, and
 * `.env.example` reserves only `CONTACT_EMAIL` and `EMAIL_API_KEY`. Nothing here
 * guesses one.
 *
 * Until a transport is chosen this returns `not-configured`, and the form shows
 * the honest "nothing was sent" state with the one channel that really exists.
 * It never reports success for a message nobody received — a false "we'll be in
 * touch" would both lie to the reader and silently lose the lead.
 *
 * To connect it, keep this signature and replace the body with the provider
 * call. `CONTACT_EMAIL` is the recipient and `EMAIL_API_KEY` is the credential;
 * both are server-side only and must never be prefixed `NEXT_PUBLIC_`, which is
 * what the source's security section requires. The action already treats a
 * non-`ok` outcome as "not delivered", so no other file needs to change.
 */
export type DeliveryOutcome = { ok: true } | { ok: false; reason: "not-configured" };

export async function deliverContactMessage(_values: ContactValues): Promise<DeliveryOutcome> {
  // The signature is the contract; nothing reads the values until a transport
  // exists to hand them to.
  void _values;

  return { ok: false, reason: "not-configured" };
}
