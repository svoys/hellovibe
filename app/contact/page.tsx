import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { finalCtaBody } from "@/data/final-cta";

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
        />

        <ContactForm />
      </Container>
    </section>
  );
}
