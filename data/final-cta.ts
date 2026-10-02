/**
 * Section 14 — Final CTA.
 *
 * All of the prose below is verbatim from the source. The block is given four
 * times, and every string is character-identical across all four passes — the
 * cleanest agreement of any block so far, so there is no majority vote to run.
 *
 * The site's single normalisation still applies: the apostrophes are
 * typographic. The source writes `there's` and `We'll` straight while shipping
 * the curly form elsewhere, so the site's convention wins over the source's
 * inconsistency — the same call `data/faq.ts` and `data/creative-engine.ts`
 * record.
 *
 * The eyebrow is stored in natural case and uppercased by `SectionHeader`, as
 * every other block's eyebrow is. The source's own caps (`READY WHEN YOU ARE`)
 * are document styling, not copy — see the numbering/caps note in MEMORY.md.
 *
 * The headline is a single string, not the source's three lines. One of the
 * four passes breaks it into `Got an idea?` / `A problem?` / `Or just a
 * feeling there's a better way?`, the other three run it as one line; the site
 * treats the source's markdown line breaks as styling (the FAQ pack records
 * the same), and the heading already balances its own wrap.
 *
 * The primary CTA and the email are NOT duplicated here — the component reads
 * `primaryCta` and `contactEmail` from `data/navigation.ts`, which is where the
 * navbar, mobile menu and footer already get them. The source's CTA label
 * ("Start a project") and address are exactly those values.
 */

/** Small uppercase kicker above the headline. */
export const finalCtaEyebrow = "Ready when you are";

/** The closing question. Three sentences; the wrap is left to the browser. */
export const finalCtaHeadline =
  "Got an idea? A problem? Or just a feeling there’s a better way?";

/** One supporting line, verbatim. */
export const finalCtaBody = "Tell us what’s on your mind. We’ll figure out where AI fits.";

/**
 * Reassurance under the actions, verbatim.
 *
 * Rendered as a quiet sentence rather than an uppercase mono label: the source
 * calls it "micro-copy", but it is a full sentence with a full stop, and this
 * site reserves the uppercase-mono treatment for fragments (the Hero's
 * "Strategy · Product · AI · Creative", the eyebrow row).
 */
export const finalCtaMicro = "No pitch deck required.";
