import { CreativeEngineVisual } from "@/components/home/CreativeEngineVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  creativeBody,
  creativeCta,
  creativeEyebrow,
  creativeHeadline,
} from "@/data/creative-engine";

/** Anchor for the Creative Engine block. */
export const CREATIVE_SECTION_ID = "creative-engine";

/**
 * Section 10 — AI CREATIVE ENGINE.
 *
 * The source gives this block two instructions and both are about the surface:
 * it is a *"Light / experimental section"*, it gets *"отдельный immersive
 * section"*, and its background and motion *"должен сильно отличаться от
 * предыдущего блока"*. The block before it is Product Studio, the first dark
 * section on the page — so the break the source is asking for is away from
 * near-black, not further into it.
 *
 * Hence a full-bleed `--color-vibe` field. It is the brand's own accent, the
 * source names the accent's job as "creative energy", and this is the one block
 * on the page whose subject *is* creative energy. It is also light, which keeps
 * the run of dark surfaces to a single section instead of letting Product
 * Studio, this block and the footer merge into one black mass.
 *
 * Consequences of the surface change, all handled deliberately:
 *
 *   - **No `border-t`.** As on Product Studio, the colour change *is* the
 *     separator, and `--color-line` measures 1.2:1 against `--color-vibe` — a
 *     hairline drawn there would be a stray artefact, not a rule.
 *   - **`tone="vibe"`.** Neither `strong` nor `inverse` is legible on an accent
 *     field, and the header's number/eyebrow divider is `bg-line` by default,
 *     which is invisible here. See the pack §4.
 *   - **`variant="accent"`.** `primary`'s hover fills the button with
 *     `--color-vibe`, which on a `--color-vibe` field makes the button
 *     disappear under the cursor. `accent` keeps the resting look identical and
 *     inverts to white instead.
 *   - **`data-surface="vibe"`** flips `::selection`. The global selection is
 *     `--color-vibe` on `--color-black`, so on this field selected text would
 *     be marked in the colour of the field itself — invisible. No focus-ring
 *     override is needed: the global ring is black, which is 16:1 here.
 *
 * Server Component. Only the diagram crosses into the client bundle.
 */
export function CreativeEngine() {
  return (
    <section
      id={CREATIVE_SECTION_ID}
      aria-labelledby="creative-title"
      data-surface="vibe"
      className="bg-vibe text-black"
    >
      <Container className="py-section-lg">
        <div className="hv-grid gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <SectionHeader
              number="08"
              eyebrow={creativeEyebrow}
              tone="vibe"
              titleId="creative-title"
              title={creativeHeadline}
              description={creativeBody}
            />

            <div className="mt-10">
              <ButtonLink href={creativeCta.href} variant="accent" arrow>
                {creativeCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <CreativeEngineVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
