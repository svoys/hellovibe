import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/PageIntro";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { contactEmail } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Start a project with HelloVibe.",
};

/**
 * Route placeholder so the Hero's primary CTA resolves instead of 404ing.
 *
 * Deliberately not a form: the pack rules out a fake or half-built contact
 * experience in this phase. The only channel that genuinely exists is email.
 *
 * No `border-t` — the navbar already draws the rule above the first block, so a
 * top border here produced a doubled hairline. `/services`, `/work` and `/about`
 * follow the same rule.
 */
export default function ContactPage() {
  return (
    <section aria-labelledby="contact-page-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow="Contact"
          titleId="contact-page-title"
          title="Start a project."
          lead={
            <p>
              The full contact experience arrives in the next phase. Until then, write to{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="border-b border-line text-black transition-colors duration-150 hover:border-black"
              >
                {contactEmail}
              </a>
              .
            </p>
          }
          actions={<ArrowLink href="/">Back home</ArrowLink>}
        />
      </Container>
    </section>
  );
}
