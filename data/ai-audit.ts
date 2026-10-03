/**
 * Structure for Section 06 — AI AUDIT.
 *
 * Recovered from the source conversation, which specifies this block across
 * three documents (§07 AI AUDIT, §10 AI Audit and §14 AI Audit) plus the
 * "Conversion Sections" prompt. There is no dedicated AI Audit pack; see
 * `docs/ai-audit/AI_Audit_Implementation_Pack_v0.1.md` for the two places
 * those documents contradict each other and how this is resolved.
 *
 * Only the *structure* is here. The kicker, headline, description, microcopy,
 * caption, deliverable names and the seven scan areas are all user-visible and
 * live in `messages/<locale>.json` under `AIAudit`. A typo in the join would
 * render an empty list rather than fail, so the harness asserts the panel's
 * contents in both locales.
 */

/** Stable key for one artefact the audit hands back. Doubles as its message key. */
export type AuditDeliverableId = "opportunityMap" | "automation" | "useCases" | "roi" | "roadmap";

/** One artefact the audit hands back. */
export type AuditDeliverable = {
  /** Stable key, and the key under `AIAudit.deliverables`. */
  id: AuditDeliverableId;
  /** Display index, `01`–`05`. Language-independent. */
  number: string;
};

/**
 * The five deliverables, in the source's order.
 *
 * The `number` is an index, not a priority. Do not sort by it and do not let it
 * imply ranking — the source lists these as a set.
 */
export const auditDeliverables: readonly AuditDeliverable[] = [
  { id: "opportunityMap", number: "01" },
  { id: "automation", number: "02" },
  { id: "useCases", number: "03" },
  { id: "roi", number: "04" },
  { id: "roadmap", number: "05" },
];

/**
 * `/services` is the approved route where the AI Strategy pillar lives. A
 * dedicated `/ai-audit` route does not exist and this task must not invent one.
 *
 * The label is `AIAudit.ctaLabel` in the catalogues.
 */
export const auditCta = {
  href: "/services",
} as const;
