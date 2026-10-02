import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { disciplines, whyClosing, whyEyebrow, whyHeadline } from "@/data/why-hellovibe";

/** Anchor for the Why HelloVibe block. */
export const WHY_SECTION_ID = "why-hellovibe";

/**
 * Section 11 — WHY HELLOVIBE.
 *
 * The source states the job plainly: answer *"Почему вы?"*. It is the only block
 * on the page that argues for the studio rather than describing what it does,
 * which is also what makes it the most dangerous one — the house rule forbids
 * invented clients, results, awards and history, and a "why us" block is where
 * all four would normally go. Every line here is a claim about **method**, so
 * the block stands on its own with nothing to point at yet.
 *
 * **Surface: light.** The source's page-rhythm map assigns each block a
 * treatment, and this one is `LIGHT` — back to the warm background after Product
 * Studio's black and Creative Engine's accent. So it keeps the ordinary
 * `border-t border-line` the other light blocks use. See the pack §4.
 *
 * **Four columns, no cards.** The source says *"Четыре колонки"*. The obvious
 * risk is that this reads as a second Services block — that one is also four
 * named things in a grid — so the treatment is deliberately different: no card
 * box, no border on all four sides, no diagram. Just a top rule, a name and a
 * sentence, four across. Services sits in a 2x2 of bordered white cards with an
 * abstract diagram in each; this is a flat editorial row.
 *
 * **No animation, and that is the point.** The source specifies no motion here,
 * and the block directly above is the most heavily animated one on the page. A
 * calm, static block is what gives the rhythm a beat to land on. It also means
 * this block adds nothing to the client bundle — it is a pure Server Component,
 * with no client boundary at all.
 *
 * **No CTA.** The source gives this block a closing statement and no link, and
 * the Final CTA is a section of its own further down.
 */
export function WhyHelloVibe() {
  return (
    <section
      id={WHY_SECTION_ID}
      aria-labelledby="why-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        <div className="hv-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="09"
              eyebrow={whyEyebrow}
              tone="strong"
              titleId="why-title"
              title={whyHeadline}
            />
          </div>
        </div>

        {/*
          A list, not a grid of articles: the four disciplines are one
          enumeration, and `hv-grid` already supplies the row gap, so the items
          only need their column spans.
        */}
        <ul className="hv-grid mt-16">
          {disciplines.map((discipline) => (
            <li key={discipline.id} className="col-span-4 md:col-span-4 lg:col-span-3">
              <div className="border-t border-line pt-6">
                <h3 className="text-h4">{discipline.label}</h3>
                <p className="mt-3 max-w-[32ch] text-body text-pretty text-black/75">
                  {discipline.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/*
          The payoff. Deliberately without a rule: Method two blocks up already
          closes with a full-width `border-t` and a large paragraph, and two
          identical closes would read as one repeated device. Space alone
          separates this one.
        */}
        <div className="mt-20">
          <p className="max-w-[34ch] text-balance text-h3">{whyClosing}</p>
        </div>
      </Container>
    </section>
  );
}
