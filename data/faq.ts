/**
 * Section 13 — FAQ.
 *
 * All of the prose below is verbatim from the source, with the site's single
 * normalisation applied: the apostrophes are typographic. The source writes
 * `there's`, `We'll` and `don't` straight and still ships the curly form
 * everywhere else, so the site's convention wins over the source's
 * inconsistency — the same call the Creative Engine and Product Studio modules
 * record.
 */

/** One question and its answer. */
export type FaqItem = {
  /**
   * Stable key for the list. Not rendered: the native `<details>` element needs
   * no `aria-controls` wiring, so there is no id to hang off the answer.
   */
  id: string;
  /** The question, verbatim. */
  question: string;
  /**
   * The answer, split where the source breaks it into paragraphs.
   *
   * Kept as an array rather than one string because the source's paragraph
   * breaks are deliberate: four of the six answers lead with a one-word
   * verdict (`Both.`, `No.`, `Yes.`) and then explain. Flattening them would
   * lose that — the direct answer first is the whole point of an FAQ.
   */
  answer: readonly string[];
};

/**
 * The six questions, in the source's order.
 *
 * The source gives this block four times. Three of those passes carry the full
 * question set, and **two of them are character-identical**; the fourth is a
 * bare list of topics (`existing companies vs startups`, `how projects start`)
 * rather than copy. A third full pass gives the same six questions with shorter
 * answers.
 *
 * The wording given twice verbatim is the one that ships — the same rule the
 * Creative Engine module applies to its six-item list. The shorter variant is
 * still accounted for: nothing in it contradicts what ships here, it simply
 * says less.
 *
 * Fixed — do not reorder, extend or reword. The set answers the six things the
 * source names explicitly, and no more.
 */
export const faqItems: readonly FaqItem[] = [
  {
    id: "who-we-work-with",
    question: "Do you work with existing companies or startups?",
    answer: [
      "Both.",
      "We work with founders building new products and established teams looking for practical ways to use AI.",
    ],
  },
  {
    id: "defined-brief",
    question: "Do we need to know exactly what we want to build?",
    answer: [
      "No.",
      "You can come with a business problem, an idea, a process that feels too manual, or simply a feeling there’s a better way.",
      "We’ll help define the opportunity.",
    ],
  },
  {
    id: "ai-only",
    question: "Do you only work with AI?",
    answer: [
      "AI is central to what we do, but the goal is always the business or product outcome.",
      "We don’t add AI just because we can.",
    ],
  },
  {
    id: "idea-to-launch",
    question: "Can you take a product from idea to launch?",
    answer: [
      "Yes.",
      "Discovery, strategy, UX/UI, AI architecture, engineering, launch and ongoing development.",
    ],
  },
  {
    id: "existing-team",
    question: "Can you work with our existing team?",
    answer: [
      "Yes.",
      "We can act as an external product/AI team or add a specialist layer to your existing organization.",
    ],
  },
  {
    id: "how-projects-start",
    question: "How do projects start?",
    answer: [
      "Usually with a conversation.",
      "If the opportunity is unclear, an AI Audit or Product Discovery can be a good starting point.",
    ],
  },
];

/**
 * The block's kicker.
 *
 * The source gives this block an H2 and no eyebrow. `FAQ` is the source's own
 * name for the section — it is how the block is listed in the page order, and
 * how the requirement pass titles it — so it is the label, derived the same way
 * `Why HelloVibe` and `How we work` were. Nothing is invented: every other block
 * on the page carries an eyebrow, and dropping it here would leave the meta row
 * with a bare number.
 */
export const faqEyebrow = "FAQ";

/**
 * The H2, verbatim.
 *
 * Given once, in the pass that also supplies the `Accordion.` instruction — the
 * same pass whose answers ship.
 */
export const faqHeadline = "Questions people usually ask.";
