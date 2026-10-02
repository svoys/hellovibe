import { ProductStudioVisual } from "@/components/home/ProductStudioVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { studioBody, studioCta, studioEyebrow, studioHeadline } from "@/data/product-studio";

/** Anchor for the Product Studio block. */
export const STUDIO_SECTION_ID = "product-studio";

/**
 * Section 09 — AI PRODUCT STUDIO.
 *
 * The first dark section on the page, which is what the source asks for
 * outright ("Dark section."). Every block before it sits on the warm
 * background, so this one has to do two jobs at once: introduce the studio
 * offer, and break the page's rhythm before the Creative Engine block that
 * follows it.
 *
 * Consequences of the surface change, all handled deliberately:
 *
 *   - **No `border-t`.** Every other block carries `border-line` along its top
 *     edge, but here the colour change *is* the separator, and a 1px warm-grey
 *     line across a black section would be a stray artefact rather than a rule.
 *   - **`tone="inverse"` and `variant="inverse"`.** The header's `strong` tone
 *     and the button's `secondary` variant are both built for light surfaces;
 *     neither is legible here. See the pack §4.
 *   - **`data-surface="dark"`** flips the focus ring to white. The global ring
 *     is `--color-black`, which is invisible on `--color-black`.
 *
 * The header is a single column and the diagram sits beside it, rather than the
 * split title/description the Services and Product Journey blocks use — those
 * two have a supporting line each, and this block's supporting line belongs
 * under its own heading, next to the CTA it leads to.
 *
 * Server Component. Only the diagram crosses into the client bundle.
 */
export function ProductStudio() {
  return (
    <section
      id={STUDIO_SECTION_ID}
      aria-labelledby="studio-title"
      data-surface="dark"
      className="bg-black text-white"
    >
      <Container className="py-section-lg">
        <div className="hv-grid gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeader
              number="07"
              eyebrow={studioEyebrow}
              tone="inverse"
              titleId="studio-title"
              title={studioHeadline}
              description={studioBody}
            />

            <div className="mt-10">
              <ButtonLink href={studioCta.href} variant="inverse" arrow>
                {studioCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <ProductStudioVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
