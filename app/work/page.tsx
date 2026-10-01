import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { casesCta, casesEyebrow, casesHeadline, casesSupporting, workCategories } from "@/data/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: "Selected work from HelloVibe.",
};

/**
 * The rule that explains why this page is empty, in the source's own words.
 *
 * Page-local rather than in `data/cases.ts`: that module is scoped to Section 07
 * and its copy is asserted by the Cases harness. `/contact` sets the precedent
 * for a page holding its own copy.
 */
const PUBLISHING_POLICY =
  "Results appear here only with verified numbers. Where there is no measurable result yet, an entry says so — “Early-stage prototype”, or “Currently in development”.";

/**
 * `/work` — the destination the navbar's "Cases" has always pointed at.
 *
 * This is the first consumer of `data/cases.ts`. There is still nothing
 * published, so it renders the same honest empty state the homepage block does,
 * plus the four categories and the publishing rule — which is the one thing a
 * reader who clicked "Cases" actually wants to know.
 *
 * No `CaseCard` and no `/work/[slug]`: the source defers dynamic case pages until
 * real cases exist, and a card component with nothing to card would be worse
 * than no component. `caseStudies` stays empty on purpose — do not populate it
 * to make this page look fuller.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default function WorkPage() {
  return (
    <section aria-labelledby="work-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow={casesEyebrow}
          titleId="work-page-title"
          title={casesHeadline}
          lead={
            <>
              <p>{casesSupporting}</p>
              <p>{PUBLISHING_POLICY}</p>
            </>
          }
        />

        <ul className="mt-20 flex flex-col border-t border-line">
          {workCategories.map((category) => (
            <li
              key={category.id}
              className="hv-grid items-baseline gap-y-2 border-b border-line py-8"
            >
              <h2 className="col-span-4 text-h3 md:col-span-8 lg:col-span-6">{category.label}</h2>
              <p className="col-span-4 font-mono text-label uppercase text-black/70 md:col-span-8 lg:col-span-6 lg:text-right">
                {category.work}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-line pt-12">
          <p className="text-h3">{casesCta.prompt}</p>
          <div className="mt-6">
            <ButtonLink href={casesCta.href} arrow>
              {casesCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
