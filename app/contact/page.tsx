import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { finalCtaBody } from "@/data/final-cta";
import { contactEmail } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Start a project with HelloVibe.",
};

/**
 * `/contact` — the destination of every "Start a project" CTA on the site.
 *
 * The page was a placeholder while the form was out of scope; it now carries the
 * real form. Its lead reuses the Final CTA's body copy rather than inventing a
 * new sentence — it is the same promise the reader just clicked, and it is
 * already approved.
 *
 * The email sits in the intro's action row, outside the form. It is the one
 * channel that works today: delivery is not connected (`lib/contact-delivery.ts`),
 * so a reader must be able to reach a human *without* submitting first. The
 * form's own "nothing was sent" state repeats it, but only after a submission.
 * No prose was added — the address is the whole link.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default function ContactPage() {
  return (
    <section aria-labelledby="contact-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow="Contact"
          titleId="contact-page-title"
          title="Start a project."
          lead={<p>{finalCtaBody}</p>}
          actions={
            /*
             * A plain anchor, not `ArrowLink`: `ArrowLink` renders `next/link`,
             * and `next/link` is for routes, not for a `mailto:`. The treatment
             * is the site's established secondary action — the same bottom rule
             * the Final CTA uses for this same address.
             */
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center border-b border-line pb-0.5 font-medium text-black transition-colors duration-150 hover:border-black"
            >
              {contactEmail}
            </a>
          }
        />

        <ContactForm />
      </Container>
    </section>
  );
}
