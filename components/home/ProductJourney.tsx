import { JourneyStepper } from "@/components/home/JourneyStepper";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Anchor for the Product Journey block. */
export const JOURNEY_SECTION_ID = "how-we-work";

/**
 * Section 03 — HOW WE WORK.
 *
 * Answers the question the AI Gap and Services leave open: you said where AI
 * creates leverage and what you sell, so what actually happens next.
 *
 * Server Component. The header is split — title left, description right — like
 * Services, so the block does not read as a third Hero. Only the stepper
 * crosses into the client bundle.
 */
export function ProductJourney() {
  return (
    <section
      id={JOURNEY_SECTION_ID}
      aria-labelledby="journey-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="03"
              eyebrow="How we work"
              tone="strong"
              titleId="journey-title"
              title="How an idea becomes something that works."
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-body-lg text-pretty text-black/75">
              No black box. Four stages, each with a clear output — so you always know what you’re
              getting and what happens next.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <JourneyStepper />
        </div>
      </Container>
    </section>
  );
}
