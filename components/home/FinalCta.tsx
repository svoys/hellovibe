import { FinalCtaVisual } from "@/components/home/FinalCtaVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  finalCtaBody,
  finalCtaEyebrow,
  finalCtaHeadline,
  finalCtaMicro,
} from "@/data/final-cta";
import { contactEmail, primaryCta } from "@/data/navigation";

/** Anchor for the closing block. Nothing links to it; it exists for parity. */
export const FINAL_CTA_SECTION_ID = "final-cta";

/**
 * Section 14 — FINAL CTA.
 *
 * The second dark section on the page, and the last block before the footer.
 * The source is explicit about both: "Dark background. This should feel like
 * the emotional conclusion of the entire page", and the rhythm map lists
 * `DARK / Final CTA` immediately above `DARK / Footer`.
 *
 * The surface consequences are Product Studio's, re-applied:
 *
 *   - **No `border-t`.** FAQ above is warm, so the colour change is the
 *     separator; a `border-line` rule across a black section would be an
 *     artefact.
 *   - **`tone="inverse"` and `variant="inverse"`.** `strong`/`secondary` are
 *     built for light surfaces and are illegible here.
 *   - **`data-surface="dark"`** flips the focus ring to white — the global ring
 *     is `--color-black`, invisible on `--color-black`.
 *
 * The composition deliberately mirrors the Hero: copy in columns 1–7, the
 * machine in columns 8–12. The same object, in the same place, at the top and
 * the bottom of the page — the Hero's machine starts scattered and this one is
 * assembled, which is what "visually closes the narrative" means in practice.
 *
 * `primaryCta` and `contactEmail` come from `data/navigation.ts` rather than
 * being restated: the source's CTA label and address are exactly those values,
 * and the navbar, mobile menu and footer already read them from there.
 *
 * Server Component. The block ships no client JavaScript — no animation, no
 * in-view trigger, nothing to hydrate.
 */
export function FinalCta() {
  return (
    <section
      id={FINAL_CTA_SECTION_ID}
      aria-labelledby="final-cta-title"
      data-surface="dark"
      className="bg-black text-white"
    >
      <Container className="py-section-lg">
        <div className="hv-grid items-center gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="12"
              eyebrow={finalCtaEyebrow}
              tone="inverse"
              titleId="final-cta-title"
              title={finalCtaHeadline}
              description={finalCtaBody}
            />

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink href={primaryCta.href} variant="inverse" arrow>
                {primaryCta.label}
              </ButtonLink>

              {/*
                The email is the block's secondary action, so it borrows the
                Hero's secondary-CTA treatment — a bottom rule rather than an
                underline. `border-white/40` reads as a rule on black without
                competing with the button beside it.
              */}
              <a
                href={`mailto:${contactEmail}`}
                className="group inline-flex items-center border-b border-white/40 pb-0.5 font-medium text-white transition-colors duration-150 hover:border-vibe"
              >
                {contactEmail}
              </a>
            </div>

            <p className="mt-8 text-small text-white/70">{finalCtaMicro}</p>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <FinalCtaVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
