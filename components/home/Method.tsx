import { MethodTimeline } from "@/components/home/MethodTimeline";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { methodClosing, methodHeadline } from "@/data/method";

/** Anchor for the Method block. */
export const METHOD_SECTION_ID = "method";

/**
 * Section 08 — HOW WE WORK.
 *
 * The source's narrative map puts this section against the question *"How do you
 * work?"* — where the Product Journey answers "how does it work" by walking the
 * four stages of a project, Method answers it with the five things HelloVibe
 * does on every one of them.
 *
 * The eyebrow is the source's own `HOW WE WORK` for this section. Product
 * Journey's eyebrow was moved back to its source value, `ONE PARTNER. EVERY
 * STAGE.`, at the same time: two sections cannot both be labelled the same thing,
 * and the source gives each of them a different one.
 * See `docs/method/Method_Implementation_Pack_v0.1.md` §2.
 *
 * The header is a single column, unlike Services and Product Journey, because the
 * source gives Method no supporting line — there is nothing to put on the right.
 *
 * No CTA. The source specifies exactly one closing line and no link here, and the
 * Final CTA is a section of its own further down.
 *
 * Server Component. Only the timeline crosses into the client bundle.
 */
export function Method() {
  return (
    <section
      id={METHOD_SECTION_ID}
      aria-labelledby="method-title"
      className="border-t border-line"
    >
      <Container className="py-section-lg">
        <div className="hv-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <SectionHeader
              number="06"
              eyebrow="How we work"
              tone="strong"
              titleId="method-title"
              title={methodHeadline}
            />
          </div>
        </div>

        <div className="mt-16">
          <MethodTimeline />
        </div>

        {/*
          A statement rather than a heading: the source marks it with a `#`, but
          it is a rhetorical close, and putting it in the heading outline would
          make a screen-reader heading list read it as a section title.
        */}
        <div className="mt-16 border-t border-line pt-10">
          <p className="max-w-[44ch] text-balance text-h3">{methodClosing}</p>
        </div>
      </Container>
    </section>
  );
}
