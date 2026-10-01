import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI is changing how products are built, businesses operate and brands communicate. We want to be where those three things meet.",
};

/**
 * Why this page is one screen long.
 *
 * The source gives the About page a headline and two lines, then asks for
 * "team / workspace / experiments / screens / sketches / prototypes" — and none
 * of those photographs exist. The content rules forbid inventing team members
 * or company history, so the page says what is true instead of filling the space.
 *
 * Page-local copy, and the one paragraph on this page written rather than
 * recovered. It is flagged in the pack.
 */
const MISSING_VISUALS_NOTE =
  "The team, the workspace, the sketches, the prototypes — that page arrives when those photographs do. Until then this one stays thin on purpose: no stock imagery, no invented history, and nothing we can’t point at.";

/**
 * `/about` — the destination the navbar's "About" has always pointed at.
 *
 * Both sentences of the lead and the headline are the source's own About copy.
 * The source also rules out the obvious alternative — *"We are a team of
 * passionate professionals…"* — so there is no team section, no founding story
 * and no headcount here.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default function AboutPage() {
  return (
    <section aria-labelledby="about-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow="About"
          titleId="about-page-title"
          title="We like building things."
          lead={
            <>
              <p>AI is changing how products are built, businesses operate and brands communicate.</p>
              <p>We want to be where those three things meet.</p>
            </>
          }
        />

        <div className="mt-20 border-t border-line pt-12">
          <p className="font-mono text-label uppercase text-black/70">
            AI Product &amp; Transformation Studio
          </p>
          <h2 className="mt-5 text-h2 text-balance">AI, but make it real.</h2>
        </div>

        <p className="mt-16 max-w-[56ch] text-body text-pretty text-black/75">
          {MISSING_VISUALS_NOTE}
        </p>

        <div className="mt-20 border-t border-line pt-12">
          <ButtonLink href="/contact" arrow>
            Start a project
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
