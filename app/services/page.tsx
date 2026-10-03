import type { Metadata } from "next";

import { ServiceVisual } from "@/components/home/ServiceVisual";
import { PageIntro } from "@/components/layout/PageIntro";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { servicePillars } from "@/data/service-pillars";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What we do",
  description:
    "We combine strategy, product, technology and creative to take AI ideas all the way from first hypothesis to working reality.",
};

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
 * Each pillar now carries the source's own CTA — "Explore AI Strategy →" — into
 * its dedicated page. Those four routes were previously left unlinked on
 * purpose, because they did not exist and linking them would have replaced
 * three 404s with four new ones. They exist now, so this page is the way in.
 */
export default function ServicesPage() {
  return (
    <section aria-labelledby="services-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow="What we do"
          titleId="services-page-title"
          title="From opportunity to outcome."
          lead={
            <p>
              We combine strategy, product, technology and creative to take AI ideas all the way
              from first hypothesis to working reality.
            </p>
          }
        />

        <div className="mt-20 flex flex-col">
          {servicePillars.map((pillar) => {
            const { service, includes, href } = pillar;
            const dark = service.surface === "dark";

            return (
              <article
                key={service.id}
                className="hv-grid items-start gap-y-8 border-t border-line py-12"
              >
                <div className="col-span-4 md:col-span-8 lg:col-span-5">
                  <p className="flex items-center gap-3 font-mono text-label uppercase text-black/70">
                    <span>{service.number}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-line" />
                    <span>{service.action}</span>
                  </p>

                  <h2 className="mt-5 text-h3">{service.title}</h2>

                  <p className="mt-4 max-w-[40ch] text-body text-pretty text-black/75">
                    {service.description}
                  </p>

                  <ul className="mt-7 flex flex-col gap-2 border-l border-line pl-5 text-body text-black/75">
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    <ArrowLink href={href}>Explore {service.title}</ArrowLink>
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
            Start a project
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
