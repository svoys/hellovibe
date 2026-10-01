import { ArrowDown } from "lucide-react";

import { HeroTrack } from "@/components/home/HeroTrack";
import { VibeMachine } from "@/components/home/VibeMachine";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * The section the secondary CTA scrolls to — the block immediately after the
 * Hero, so "Explore what we do ↓" lands on the next thing rather than skipping
 * past it.
 *
 * This used to read `"the-ai-gap"` and did double duty: `AIGap` imported it and
 * spread it onto its own `<section>`, so the Hero's link target and the AI Gap's
 * anchor were the same constant. That is why `AIGap` now owns `AI_GAP_SECTION_ID`
 * instead — changing this value alone used to move the AI Gap's anchor too.
 */
export const NEXT_SECTION_ID = "trust";

/**
 * HelloVibe homepage Hero.
 *
 * Server Component: the scroll choreography lives in `HeroTrack` and the
 * machine, so only those two cross into the client bundle.
 *
 * Contrast note — the supporting copy and micro-labels use `black/75` and
 * `black/70` rather than `--color-muted`. Muted (#8a8882) measures 3.2:1 on the
 * warm background, which fails WCAG AA for body text; the alpha variants
 * measure 8.1:1 and 6.8:1. The token itself is untouched.
 */
export function Hero() {
  return (
    <HeroTrack>
      <div className="hero-stage w-full">
        <Container>
          <div className="hv-grid items-center gap-y-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="flex items-center gap-3 text-label uppercase text-black/70">
                <span aria-hidden="true" className="inline-block size-2 bg-orange" />
                AI Product &amp; Transformation Studio
              </p>

              <h1 id="hero-title" className="mt-6 text-h1">
                AI, but make it{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-0.04em] bottom-[0.06em] -z-10 h-[0.3em] bg-vibe"
                  />
                  real.
                </span>
              </h1>

              <p className="mt-7 max-w-[34ch] text-body-lg text-black/75">
                We turn AI opportunities into working products, business systems and creative
                engines.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href="/contact" arrow>
                  Start a project
                </ButtonLink>

                {/*
                  Deliberately not <ArrowLink>: that primitive renders a right
                  arrow, and the pack asks for a downward one. Reusing it would
                  have meant changing a frozen UI primitive, so this mirrors its
                  visual language locally instead.
                */}
                <a
                  href={`#${NEXT_SECTION_ID}`}
                  className="group inline-flex items-center gap-1.5 border-b border-line pb-0.5 font-medium text-black transition-colors duration-150 hover:border-black"
                >
                  Explore what we do
                  <ArrowDown
                    aria-hidden="true"
                    className="size-[1em] shrink-0 transition-transform duration-150 group-hover:translate-y-1"
                  />
                </a>
              </div>

              <p className="mt-10 text-label uppercase text-black/70">
                Strategy · Product · AI · Creative
              </p>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <VibeMachine />
            </div>
          </div>
        </Container>
      </div>
    </HeroTrack>
  );
}
