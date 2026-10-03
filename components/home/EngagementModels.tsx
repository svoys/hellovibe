import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { engagementModels } from "@/data/engagement-models";

/** Anchor for the Engagement Models block. */
export const ENGAGEMENT_SECTION_ID = "engagement-models";

/**
 * Section 12 — HOW WE CAN WORK TOGETHER.
 *
 * The source states the job as a question to close: *"Как с вами вообще
 * работать?"*. Everything above this point describes what HelloVibe does and how
 * it does it; this is the first block that answers what a visitor would actually
 * be buying, in two shapes.
 *
 * **Surface: light.** The page-rhythm map assigns this block `LIGHT`, so it keeps
 * the ordinary `border-t border-line` the other light blocks use — the third
 * light block in a row, which is what the map asks for before the Final CTA goes
 * dark again.
 *
 * **Two cards, not a second Services.** The source asks for *"две большие
 * карточки"*, and the risk is obvious: Services is also a grid of white bordered
 * cards. The treatment is deliberately built around what Services does *not*
 * have — Services is four cards with a meta bar, a description and an abstract
 * diagram; this is two cards whose body is a hairline-separated list of what the
 * engagement covers. No diagram, no meta bar, no fourth-side detail.
 *
 * **Static, and that is the point.** The source specifies no motion here, and the
 * block is a two-way choice — the one thing on the page that benefits from being
 * completely still. It is also what the rhythm needs: the block above it is the
 * heaviest animation on the page, and the FAQ below is interactive. So this is a
 * pure Server Component with no client boundary at all, the same call the Why
 * HelloVibe block records.
 *
 * **Two filled buttons.** The source bolds both CTAs and gives neither priority,
 * so both ship as `primary`. Softening the second one with `secondary` was
 * considered and rejected: that variant is unused elsewhere in the codebase and
 * its `border-line` measures about 1.3:1 against a white card. See the pack §4.
 */
export async function EngagementModels() {
  const t = await getTranslations("Engagement");

  return (
    <section
      id={ENGAGEMENT_SECTION_ID}
      aria-labelledby="engagement-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        {/*
          Single column: the source gives this block no supporting line, so there
          is nothing to put beside the title.
        */}
        <div className="hv-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="10"
              eyebrow={t("eyebrow")}
              tone="strong"
              titleId="engagement-title"
              title={t("headline")}
            />
          </div>
        </div>

        {/*
          Two cards across from `md` up, stacked on phones. `h-full` plus
          `mt-auto` on the footer is what keeps the two outcome lines and the two
          buttons on the same baseline even though one card lists six items and
          the other five.
        */}
        <div className="hv-grid mt-16">
          {engagementModels.map((model) => (
            <div key={model.id} className="col-span-4 md:col-span-4 lg:col-span-6">
              <article className="flex h-full flex-col border border-line bg-white">
                <div className="px-6 pt-8 lg:px-10 lg:pt-10">
                  <h3 className="text-h3">{t(`models.${model.id}.title`)}</h3>
                  <p className="mt-3 max-w-[34ch] text-body-lg text-pretty text-black/75">
                    {t(`models.${model.id}.audience`)}
                  </p>
                </div>

                {/*
                  Full-width rules rather than the leading dashes the Journey
                  list uses: these rows are the card's structure, and a dash that
                  stays behind on the first line when an item wraps would read as
                  a stray mark. A row rule cannot wrap.
                */}
                <ul className="mt-8 border-t border-line">
                  {(t.raw(`models.${model.id}.items`) as readonly string[]).map((item) => (
                    <li
                      key={item}
                      className="border-b border-line px-6 py-3 text-body text-black/75 lg:px-10"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col items-start gap-6 px-6 py-8 lg:px-10 lg:py-10">
                  <p className="text-body-lg font-medium">{t(`models.${model.id}.outcome`)}</p>

                  <ButtonLink href={model.href} arrow>
                    {t(`models.${model.id}.ctaLabel`)}
                  </ButtonLink>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
