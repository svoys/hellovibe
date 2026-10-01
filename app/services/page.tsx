import type { Metadata } from "next";

import { ServiceVisual } from "@/components/home/ServiceVisual";
import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { capabilitiesById } from "@/data/service-capabilities";
import { services } from "@/data/services";
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
 * Deliberately no links to `/services/strategy`, `/services/systems`,
 * `/services/products` or `/services/creative`. Those routes are in the source's
 * route map but do not exist, and linking them would replace three 404s with
 * four new ones.
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
          {services.map((service) => {
            const dark = service.surface === "dark";
            const capabilities = capabilitiesById.get(service.id) ?? [];

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
                    {capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
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
