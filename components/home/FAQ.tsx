import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

/** Anchor for the FAQ block. */
export const FAQ_SECTION_ID = "faq";

/**
 * Section 13 — FAQ.
 *
 * The source's job for this block is the last objection before the close: it
 * answers the six things a visitor is still unsure about, and it is the only
 * block on the page the reader drives.
 *
 * **Surface: light.** The page-rhythm map assigns this block `LIGHT`, so it
 * keeps the ordinary `border-t border-line` the other light blocks use.
 *
 * **Built on `<details>` / `<summary>`, not on a button and state.** The source
 * asks for an *"Accessible accordion"* and lists exactly what it wants:
 *
 *   > keyboard accessible · proper button · `aria-expanded` · associated
 *   > content · only necessary animation · no layout jump beyond expected
 *   > expansion
 *
 * The native disclosure element satisfies every line of that list without a
 * client boundary. `<summary>` carries the implicit `button` role and the
 * browser exposes expanded/collapsed to assistive technology, so the state is
 * announced without an author-written `aria-expanded`; the answer is associated
 * by containment rather than by `aria-controls`; Enter and Space toggle it for
 * free. The alternative — a `"use client"` component holding an open index —
 * would reimplement all of that, ship JavaScript to do it, and make six answers
 * disappear from the HTML for anyone without JS. This is the same trade the
 * Product Journey block already made when it kept every panel in the DOM.
 *
 * **Multiple items may be open at once, on purpose.** An exclusive accordion
 * (`<details name="faq">`) would collapse one answer when another opens, which
 * is a layout jump *beyond* the expected expansion — the one thing the source
 * rules out by name. It is also newer than the rest of the platform this block
 * relies on, so leaving it out keeps the behaviour identical everywhere.
 *
 * **No JS, no CSS beyond the marker and the reveal.** Server Component with no
 * client boundary, and the animation is one CSS keyframe on `[open]`. The
 * expansion itself is instant: a `height: auto` transition would need either
 * script or `interpolate-size`, and it is exactly the layout jump the source
 * does not want.
 *
 * **A `<h3>` inside every `<summary>`.** `<summary>` accepts heading content,
 * and the heading is what puts the six questions in the document outline so a
 * screen-reader user can jump between them. `text-h4` matches the size the Why
 * HelloVibe labels use, so the two lists read as the same weight of thing.
 */
export async function FAQ() {
  const t = await getTranslations("Faq");

  return (
    <section
      id={FAQ_SECTION_ID}
      aria-labelledby="faq-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        {/*
          Single column: the source gives this block no supporting line, so
          there is nothing to put beside the title.
        */}
        <div className="hv-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="11"
              eyebrow={t("eyebrow")}
              tone="strong"
              titleId="faq-title"
              title={t("headline")}
            />
          </div>
        </div>

        {/*
          Full container width at every breakpoint, so the row rules line up with
          the section's own top rule and with every other block's rules. A capped
          column was tried first and rejected on sight: at `lg` it stopped the
          rules about 450px short of the container edge, which read as an
          unfinished block rather than a deliberate measure.

          A wide row is not a reading problem here — the question text does not
          stretch, and the whole row is the click target, so the space between
          the question and the mark is affordance rather than empty copy. The
          answers keep their own `max-w-[62ch]` cap for the measure that matters.

          A `<ul>` because it is a list of questions; each row owns its own
          `border-t`, and the list closes with a `border-b` so the block does not
          end on a dangling rule.
        */}
        <div className="hv-grid mt-16">
          <ul className="col-span-4 border-b border-line md:col-span-8 lg:col-span-12">
            {faqItems.map((item) => (
              <li key={item} className="border-t border-line">
                <details className="faq-item">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 py-6">
                    <h3 className="faq-question text-h4 text-black/75">
                      {t(`items.${item}.question`)}
                    </h3>

                    {/*
                      A plus built from two 1px bars. The vertical bar collapses
                      when the item opens, so the mark becomes a minus with no
                      second element and no glyph to mis-render.
                    */}
                    <span aria-hidden="true" className="faq-mark" />
                  </summary>

                  <div className="faq-answer pb-8">
                    {/*
                      The answer is stored as an array of paragraphs, because the
                      source's breaks are deliberate: four of the six answers lead
                      with a one-word verdict and then explain. Flattening them
                      would lose the direct answer that makes an FAQ worth reading.
                    */}
                    {(t.raw(`items.${item}.answer`) as readonly string[]).map(
                      (paragraph, index) => (
                        <p
                          key={paragraph}
                          className={cn(
                            "max-w-[62ch] text-body text-pretty text-black/75",
                            index > 0 && "mt-3",
                          )}
                        >
                          {paragraph}
                        </p>
                      ),
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
