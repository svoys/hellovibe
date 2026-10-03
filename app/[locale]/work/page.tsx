import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { casesCta, workCategories } from "@/data/cases";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.Work");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: await alternatesFor("/work"),
  };
}

/**
 * `/work` — the destination the navbar's "Cases" has always pointed at.
 *
 * This is the first consumer of `data/cases.ts`. There is still nothing
 * published, so it renders the same honest empty state the homepage block does,
 * plus the four categories and the publishing rule — which is the one thing a
 * reader who clicked "Cases" actually wants to know. That rule is
 * `Pages.Work.publishingPolicy`, in the source's own words.
 *
 * No `CaseCard` and no `/work/[slug]`: the source defers dynamic case pages until
 * real cases exist, and a card component with nothing to card would be worse
 * than no component. `caseStudies` stays empty on purpose — do not populate it
 * to make this page look fuller.
 *
 * The categories are a list of ids; their names and the artefacts under them come
 * from `Cases.categories.<id>` and `Cases.work.<id>`. A category describes the
 * *practice*, never a client — which is why these are safe to render while the
 * three example case cards in the source are not.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default async function WorkPage() {
  const t = await getTranslations("Pages.Work");
  const cases = await getTranslations("Cases");
  const categories = await getTranslations("Cases.categories");
  const work = await getTranslations("Cases.work");

  return (
    <section aria-labelledby="work-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow={t("eyebrow")}
          titleId="work-page-title"
          title={t("title")}
          lead={
            <>
              <p>{cases("supporting")}</p>
              <p>{t("publishingPolicy")}</p>
            </>
          }
        />

        <ul className="mt-20 flex flex-col border-t border-line">
          {workCategories.map((id) => (
            <li key={id} className="hv-grid items-baseline gap-y-2 border-b border-line py-8">
              <h2 className="col-span-4 text-h3 md:col-span-8 lg:col-span-6">{categories(id)}</h2>
              <p className="col-span-4 font-mono text-label uppercase text-black/70 md:col-span-8 lg:col-span-6 lg:text-right">
                {work(id)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-line pt-12">
          <p className="text-h3">{cases("ctaPrompt")}</p>
          <div className="mt-6">
            <ButtonLink href={casesCta.href} arrow>
              {t("ctaLabel")}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
