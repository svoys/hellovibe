import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { casesCta, workCategories } from "@/data/cases";

/** Anchor for the Cases block. */
export const CASES_SECTION_ID = "cases";

/**
 * Section 07 — CASES.
 *
 * Everything above this block makes a promise; this is the one that is supposed
 * to answer "and what have you actually built?". It cannot, yet — there are no
 * verified cases on record — so it renders the source conversation's own
 * empty state rather than three invented client cards.
 *
 * The rule that decides this is stated five times in the source and is worth
 * repeating: never invent clients, logos, metrics, testimonials, awards,
 * partnerships or results. The same document then supplies three example cards
 * that break it. The rule wins; see the pack for the full comparison.
 *
 * What is left is honest and still says something: four categories of work,
 * each with the artefacts that sit under it, all lifted from the brand spec.
 * A category describes the practice, not a client.
 *
 * Server Component. When real cases arrive they go into `caseStudies` in
 * `data/cases.ts` and this block switches over; that array and the `CaseStudy`
 * type are already the right shape, so no layout change is needed.
 */
export async function Cases() {
  const t = await getTranslations("Cases");

  return (
    <section id={CASES_SECTION_ID} aria-labelledby="cases-title" className="border-t border-line">
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="05"
              eyebrow={t("eyebrow")}
              tone="strong"
              titleId="cases-title"
              title={t("headline")}
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-body-lg text-pretty text-black/75">{t("supporting")}</p>
          </div>
        </div>

        {/*
          A list, not a card grid. Cards here would imply four things were built
          and shipped, which is exactly the claim this block must not make.
        */}
        <ul className="mt-16">
          {workCategories.map((category) => (
            <li
              key={category}
              className="flex flex-col gap-2 border-t border-line py-6 last:border-b sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <h3 className="text-h3 text-black">{t(`categories.${category}`)}</h3>
              {/*
                No `max-w` here. Constraining it wrapped the two longest
                artefact lists onto a second line, which made those rows taller
                than their siblings and broke the table rhythm. The longest
                list is ~41 characters; the row has room for it at every width
                from `sm` up, where the row is horizontal.
              */}
              <p className="font-mono text-label uppercase text-black/70 sm:text-right">
                {t(`work.${category}`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-lg text-black/75">{t("ctaPrompt")}</p>

          <ArrowLink href={casesCta.href} className="text-body-lg">
            {t("ctaLabel")}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
