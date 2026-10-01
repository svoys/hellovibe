/**
 * Copy and structure for Section 06 — AI AUDIT.
 *
 * Recovered from the source conversation, which specifies this block across
 * three documents (§07 AI AUDIT, §10 AI Audit and §14 AI Audit) plus the
 * "Conversion Sections" prompt. There is no dedicated AI Audit pack; see
 * `docs/ai-audit/AI_Audit_Implementation_Pack_v0.1.md` for the two places
 * those documents contradict each other and how this file resolves them.
 *
 * Copy is fixed — do not reword, reorder or extend it.
 */

/** One artefact the audit hands back. */
export type AuditDeliverable = {
  /** Stable key. */
  id: string;
  /** Display index, `01`–`05`. */
  number: string;
  /** Published name of the deliverable. */
  label: string;
};

/**
 * The five deliverables, in the source's order.
 *
 * The `number` is an index, not a priority. Do not sort by it and do not let it
 * imply ranking — the source lists these as a set.
 */
export const auditDeliverables: readonly AuditDeliverable[] = [
  { id: "opportunity-map", number: "01", label: "AI opportunity map" },
  { id: "automation", number: "02", label: "Automation opportunities" },
  { id: "use-cases", number: "03", label: "Priority use cases" },
  { id: "roi", number: "04", label: "ROI hypotheses" },
  { id: "roadmap", number: "05", label: "Implementation roadmap" },
];

/**
 * The areas the audit examines.
 *
 * This is a fixed description of the **method**, taken from the product
 * architecture section of the source conversation — not an observation about
 * any business. That distinction is why these seven strings are safe to render
 * while the counts in the source's own mock (`12 processes analyzed`,
 * `7 AI opportunities found`) are not: a method can be stated, a finding cannot
 * be invented. See the pack §3.
 */
export const auditScanAreas: readonly string[] = [
  "Business model",
  "Processes",
  "Customer journey",
  "Operations",
  "Sales",
  "Marketing",
  "Existing technology",
];

/**
 * The kicker.
 *
 * The source uses this question rather than a section name, and it does real
 * work: it names the visitor's actual state, which is the whole reason this
 * block exists — it is the entry point for someone who has no brief yet.
 */
export const auditEyebrow = "Not sure where to start?";

export const auditHeadline = "Find your best AI opportunities.";

export const auditDescription =
  "We’ll look at your business, processes and existing technology to identify where AI can create the most meaningful impact.";

/** A published duration, not a price. The source is explicit that this one ships. */
export const auditMicrocopy = "Typically 1–2 weeks";

/**
 * Sits under the panel and is part of its accessible name too — the panel must
 * not be mistakable for a real analysis by a screen reader either.
 */
export const auditCaption = "Illustrative interface — conceptual, not a live analysis.";

/**
 * `/services` is the approved route where the AI Strategy pillar lives, and it
 * is where `serviceLinks` already points all four pillars. A dedicated
 * `/ai-audit` route does not exist and this task must not invent one.
 */
export const auditCta = {
  label: "Explore AI Audit",
  href: "/services",
} as const;
