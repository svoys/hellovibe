import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.About");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: await alternatesFor("/about"),
  };
}

/**
 * `/about` — the destination the navbar's "About" has always pointed at.
 *
 * Both sentences of the lead and the headline are the source's own About copy.
 * The source also rules out the obvious alternative — *"We are a team of
 * passionate professionals…"* — so there is no team section, no founding story
 * and no headcount here.
 *
 * ## Why this page is one screen long
 *
 * The source gives the About page a headline and two lines, then asks for
 * "team / workspace / experiments / screens / sketches / prototypes" — and none
 * of those photographs exist. The content rules forbid inventing team members
 * or company history, so the page says what is true instead of filling the space.
 * The paragraph that explains this is `Pages.About.missingVisualsNote`, and it
 * is the one paragraph on this page written rather than recovered. It is flagged
 * in the pack.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default async function AboutPage() {
  const t = await getTranslations("Pages.About");

  /* An array in the catalogue: two sentences, two paragraphs, no markup in the
     message. `t.raw` returns it unparsed. */
  const lead = t.raw("lead") as readonly string[];

  return (
    <section aria-labelledby="about-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow={t("eyebrow")}
          titleId="about-page-title"
          title={t("title")}
          lead={
            <>
              {lead.map((sentence) => (
                <p key={sentence}>{sentence}</p>
              ))}
            </>
          }
        />

        <div className="mt-20 border-t border-line pt-12">
          <p className="font-mono text-label uppercase text-black/70">{t("studioLabel")}</p>
          <h2 className="mt-5 text-h2 text-balance">{t("studioTitle")}</h2>
        </div>

        <p className="mt-16 max-w-[56ch] text-body text-pretty text-black/75">
          {t("missingVisualsNote")}
        </p>

        <div className="mt-20 border-t border-line pt-12">
          <ButtonLink href="/contact" arrow>
            {t("ctaLabel")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
