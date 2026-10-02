/**
 * Section 12 — Engagement Models.
 *
 * All of the prose below is verbatim from the source, which gives this block
 * four times. Three of those passes carry the full phrasing — two of them
 * character-identical — and a fourth restates the same two models as short
 * fragments (`Defined challenge. / Fixed scope. / Clear outcome.`). That is a
 * compression of the same copy, not a different version of it, so the full
 * phrasing is what ships — the same call the Why HelloVibe module records for
 * its own four passes.
 */

/** A call to action attached to one engagement model. */
export type EngagementCta = {
  /** Button label, verbatim. The trailing `→` is the button's own arrow. */
  label: string;
  /** Destination. No per-model route exists, so both point at `/contact`. */
  href: string;
};

/** One of the two ways to work with HelloVibe. */
export type EngagementModel = {
  /** Stable key. */
  id: string;
  /**
   * Model name — the card's heading.
   *
   * The source writes these in caps (`## PROJECT`), but that is the source's
   * markdown heading styling rather than copy: the same document writes every
   * heading in caps, including the ones this site renders in sentence case. The
   * design system reserves caps for the mono label role, and an `h3` here is a
   * heading, so these ship in title case like every other `h3` on the page.
   */
  title: string;
  /** Who the model is for, verbatim. */
  audience: string;
  /**
   * What the model covers, in the source's order.
   *
   * `MWP` and `MVP` are deliberately **not** expanded inline here. The Product
   * Studio block does expand both, and repeating the gloss inside a
   * hairline-separated list would break the row rhythm for two items out of
   * eleven. The list is a menu of names, not a glossary.
   *
   * Fixed — do not reorder or extend.
   */
  items: readonly string[];
  /**
   * The trade-off in one line, verbatim — including the `→` (U+2192), which is
   * copy, not decoration.
   *
   * The source is split on the full stop: two of its four passes write one and
   * two do not. The form without ships, matching the two passes that give the
   * full phrasing.
   */
  outcome: string;
  /** The card's call to action, verbatim. */
  cta: EngagementCta;
};

/**
 * The two models, in the source's order: the defined-scope engagement first,
 * the continuous one second.
 *
 * Both carry a CTA and both are written in bold in the source, so they ship at
 * equal weight — the block presents a choice, not a recommendation. Note that
 * `Button`'s `secondary` variant is *not* used to soften the second one: it is
 * unused everywhere else in the codebase, and its `border-line` measures about
 * 1.3:1 against a white card, so debuting it here would ship a control whose
 * boundary is barely visible. See the pack §4.
 */
export const engagementModels: readonly EngagementModel[] = [
  {
    id: "project",
    title: "Project",
    audience: "For a defined challenge.",
    items: ["Discovery", "AI Audit", "MWP", "MVP", "AI System", "Creative Engine"],
    outcome: "Fixed scope → clear outcome",
    cta: { label: "Start a project", href: "/contact" },
  },
  {
    id: "partnership",
    title: "Partnership",
    audience: "For teams building continuously.",
    items: ["Fractional Product", "AI Engineering", "AI Strategy", "Creative", "Optimization"],
    outcome: "One team → ongoing momentum",
    cta: { label: "Build with us", href: "/contact" },
  },
];

/**
 * The block's kicker.
 *
 * The source writes it in caps (`HOW WE CAN WORK TOGETHER`); the
 * `text-label uppercase` treatment in `SectionHeader` supplies the caps, so the
 * value is stored in sentence case like every other eyebrow on the page.
 */
export const engagementEyebrow = "How we can work together";

/**
 * The H2, verbatim.
 *
 * The source sets it as two lines (`# One project.` / `# Or your AI team.`).
 * Stored as one string: it is one sentence pair, and `text-wrap: balance` in the
 * base layer already breaks it the way the source intends.
 */
export const engagementHeadline = "One project. Or your AI team.";
