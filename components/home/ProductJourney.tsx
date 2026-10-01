import { JourneyStepper } from "@/components/home/JourneyStepper";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journeyCta, journeyHeadline, journeySupporting } from "@/data/product-journey";

/** Anchor for the Product Journey block. */
export const JOURNEY_SECTION_ID = "how-we-work";

/**
 * Section 03 — HOW WE WORK.
 *
 * Answers the question the AI Gap and Services leave open: you said where AI
 * creates leverage and what you sell, so what actually happens next.
 *
 * The headline is deliberately a promise rather than a process description —
 * "Start anywhere" tells a visitor who has no brief yet that they are still in
 * the right place, which is the point the pack §14 makes about the copy having
 * to be legible from the interface itself.
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
              title={journeyHeadline}
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="max-w-[44ch] text-body-lg text-pretty text-black/75">
              {journeySupporting}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <JourneyStepper />
        </div>

        {/*
          The pack §4 asks for exactly one closing line and one link — no second
          complex CTA. `ArrowLink` is the same control the Hero and Services use,
          so it needs no new styling.
        */}
        <div className="mt-12 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-lg text-black/75">{journeyCta.prompt}</p>

          <ArrowLink href={journeyCta.href} className="text-body-lg">
            {journeyCta.label}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
