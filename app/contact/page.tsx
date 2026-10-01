import type { Metadata } from "next";

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
 */
export default function ContactPage() {
  return (
    <section className="border-t border-line">
      <Container className="py-section-lg">
        <p className="text-label uppercase text-black/70">Contact</p>

        <h1 className="mt-6 text-h1">Start a project.</h1>

        <p className="mt-7 max-w-[46ch] text-body-lg text-black/75">
          The full contact experience arrives in the next phase. Until then, write to{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="border-b border-line text-black transition-colors duration-150 hover:border-black"
          >
            {contactEmail}
          </a>
          .
        </p>

        <div className="mt-10">
          <ArrowLink href="/">Back home</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
