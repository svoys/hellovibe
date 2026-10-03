import { getTranslations } from "next-intl/server";

import { AIGapVisual } from "@/components/home/AIGapVisual";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Anchor for the AI Gap. */
export const AI_GAP_SECTION_ID = "the-ai-gap";

/**
 * Section 01 — THE AI GAP.
 *
 * Explains why companies get stuck: the difficulty is not finding another AI
 * tool, it is knowing where AI creates leverage.
 *
 * Server Component. It owns its own anchor, like every other section —
 * `Services`, `ProductJourney` and `TrustStrip` each export theirs. It used to
 * import `NEXT_SECTION_ID` from the Hero, which meant the Hero's CTA target and
 * this section's `id` were the same constant and could not move independently.
 */
export async function AIGap() {
  const t = await getTranslations("AIGap");

  return (
    <section id={AI_GAP_SECTION_ID} aria-labelledby="ai-gap-title" className="border-t border-line">
      <Container className="py-section-lg">
        <div className="hv-grid items-start gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeader
              number="01"
              eyebrow={t("eyebrow")}
              tone="strong"
              titleId="ai-gap-title"
              title={t("title")}
              description={t("description")}
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
