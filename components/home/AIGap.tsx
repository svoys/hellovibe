import { AIGapVisual } from "@/components/home/AIGapVisual";
import { NEXT_SECTION_ID } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Section 01 — THE AI GAP.
 *
 * Explains why companies get stuck: the difficulty is not finding another AI
 * tool, it is knowing where AI creates leverage.
 *
 * Server Component. The section id is the constant the Hero's secondary CTA
 * already scrolls to, so the anchor is reused rather than duplicated.
 */
export function AIGap() {
  return (
    <section id={NEXT_SECTION_ID} aria-labelledby="ai-gap-title" className="border-t border-line">
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeader
              number="01"
              eyebrow="The AI gap"
              tone="strong"
              titleId="ai-gap-title"
              title="Everyone is talking about AI. Few know what to do with it."
              description="AI can write, code, analyze, automate and create. But the hard part isn’t finding another AI tool. It’s knowing where AI actually creates leverage — and turning that opportunity into something people can use."
            />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <AIGapVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
