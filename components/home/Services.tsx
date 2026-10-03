import { ServiceCard } from "@/components/home/ServiceCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicePillars } from "@/data/service-pillars";

/** Anchor for the Services block. */
export const SERVICES_SECTION_ID = "what-we-do";

/**
 * Section 02 — WHAT WE DO.
 *
 * Answers the AI Gap: four pillars, each with an abstract diagram rather than a
 * stock image.
 *
 * Server Component. The header is deliberately split — title left, description
 * right — so it does not read as a second Hero.
 */
export function Services() {
  return (
    <section
      id={SERVICES_SECTION_ID}
      aria-labelledby="services-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="02"
              eyebrow="What we do"
              tone="strong"
              titleId="services-title"
              title="From opportunity to outcome."
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-body-lg text-pretty text-black/75">
              We combine strategy, product, technology and creative to take AI ideas all the way
              from first hypothesis to working reality.
            </p>
          </div>
        </div>

        {/* `hv-grid` already supplies the row gap, so no gap utility is needed. */}
        <div className="hv-grid mt-16">
          {servicePillars.map((pillar) => (
            <div key={pillar.service.id} className="col-span-4 md:col-span-4 lg:col-span-6">
              <ServiceCard service={pillar.service} href={pillar.href} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
