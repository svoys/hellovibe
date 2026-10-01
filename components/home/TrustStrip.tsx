import { Container } from "@/components/ui/Container";
import { trustCategories, trustStatement } from "@/data/trust";

/** Anchor for the Trust Strip. */
export const TRUST_SECTION_ID = "trust";

/**
 * Section 02 — TRUST / SOCIAL PROOF.
 *
 * A thin band between the Hero and the AI Gap. The Hero makes a claim and the AI
 * Gap immediately complicates it; this answers the unspoken "…and who are you?"
 * before the argument starts.
 *
 * It is deliberately quiet: no accent colour, no motion. It sits directly under
 * the Hero, which is the page's animated centrepiece, and a second animated
 * block there would compete with the thing the visitor is still reading.
 *
 * It is also deliberately **unnumbered**. The Hero has no number either, so
 * AI Gap stays `01`, What We Do `02` and Product Journey `03` — numbering the
 * strip would renumber three sections that are already built and approved.
 *
 * Server Component: nothing here is interactive.
 */
export function TrustStrip() {
  return (
    <section id={TRUST_SECTION_ID} aria-labelledby="trust-title" className="border-t border-line">
      <Container className="py-12 md:py-16">
        <div className="hv-grid items-center gap-y-6">
          {/*
            An `h2`, not a `p`. The strip is a real section of the document, and
            the outline should not jump from the Hero's `h1` to the AI Gap's `h2`
            with a gap where this section is.
          */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <h2 id="trust-title" className="max-w-[38ch] text-body-lg text-balance text-black/75">
              {trustStatement}
            </h2>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {trustCategories.map((category, index) => (
                <li key={category.id} className="flex items-center gap-3">
                  {/*
                    Decorative rules between labels, and `hidden md:block` so
                    they disappear exactly where the row wraps.

                    Below ~430px four labels cannot fit on one line without
                    shrinking the type (which the pack forbids), so the list
                    wraps to 3 + 1. A rule that only knows about `index > 0`
                    then lands at the *start* of the second line and reads as a
                    stray dash hanging in front of "Brands". There is no CSS
                    selector for "first item on a wrapped line", so the honest
                    fix is to drop the decoration at the width where it breaks.

                    `aria-hidden` because a screen reader announcing a rule
                    between every label is noise.
                  */}
                  {index > 0 ? (
                    <span aria-hidden="true" className="hidden h-px w-6 shrink-0 bg-line md:block" />
                  ) : null}
                  <span className="font-mono text-label uppercase text-black/70">
                    {category.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
