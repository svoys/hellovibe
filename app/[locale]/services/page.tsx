import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ServiceVisual } from "@/components/home/ServiceVisual";
import { PageIntro } from "@/components/layout/PageIntro";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { servicePillars } from "@/data/service-pillars";
import { alternatesFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.Services");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: await alternatesFor("/services"),
  };
}

/**
 * `/services` — the destination the navbar's "What we do" has always pointed at.
 *
 * The homepage Services block shows the four pillars as cards. This page shows
 * the same four with the contents the brand rules give each one, so it adds
 * something the homepage cannot rather than repeating it.
 *
 * No `border-t`: the navbar already draws the rule above the first block. The
 * homepage follows the same rule — `Hero` has no top border, and only the
 * sections *between* blocks carry one.
 *
 * Each pillar carries the source's own CTA — "Explore AI Strategy →" — into its
 * dedicated page. Those four routes were previously left unlinked on purpose,
 * because they did not exist and linking them would have replaced three 404s
 * with four new ones. They exist now, so this page is the way in.
 *
 * ## Two namespaces, on purpose
 *
 * `Pages.Services` holds the page's own metadata and intro; `Services` holds the
 * pillars, their capability lists and the CTA pattern. They overlap on two
 * strings today, which is a coincidence of the page repeating the block's
 * headline — and keeping them separate is what would let the page intro diverge
 * from the homepage block without a second edit.
 */
export default async function ServicesPage() {
  const t = await getTranslations("Pages.Services");
  const services = await getTranslations("Services");
  const pillars = await getTranslations("Services.pillars");

  return (
    <section aria-labelledby="services-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow={t("eyebrow")}
          titleId="services-page-title"
          title={t("title")}
          lead={<p>{t("lead")}</p>}
        />

        <div className="mt-20 flex flex-col">
          {servicePillars.map((pillar) => {
            const { service, href } = pillar;
            const dark = service.surface === "dark";

            const action = pillars(`${service.id}.action`);
            const title = pillars(`${service.id}.title`);
            const description = pillars(`${service.id}.description`);
            /* An array in the catalogue, so it comes back unparsed. */
            const includes = services.raw(`capabilities.${service.id}`) as readonly string[];

            return (
              <article
                key={service.id}
                className="hv-grid items-start gap-y-8 border-t border-line py-12"
              >
                <div className="col-span-4 md:col-span-8 lg:col-span-5">
                  <p className="flex items-center gap-3 font-mono text-label uppercase text-black/70">
                    <span>{service.number}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-line" />
                    <span>{action}</span>
                  </p>

                  <h2 className="mt-5 text-h3">{title}</h2>

                  <p className="mt-4 max-w-[40ch] text-body text-pretty text-black/75">
                    {description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-2 border-l border-line pl-5 text-body text-black/75">
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <ArrowLink href={href}>{services("exploreCta", { title })}</ArrowLink>
                  </div>
                </div>

                {/* The one dark pillar keeps its dark surface here too, so the
                    page still has the rhythm the homepage grid has. */}
                <div
                  className={cn(
                    "col-span-4 border md:col-span-8 lg:col-span-6 lg:col-start-7",
                    dark ? "border-black bg-black" : "border-line bg-white",
                  )}
                >
                  <ServiceVisual kind={service.visual} surface={service.surface} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <ButtonLink href="/contact" arrow>
            {t("ctaLabel")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
