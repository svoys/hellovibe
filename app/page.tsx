import { Hero, NEXT_SECTION_ID } from "@/components/home/Hero";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/*
        Transition placeholder. The Hero's secondary CTA scrolls here, so the
        anchor has to exist; the real "AI Gap" section is the next phase.
      */}
      <section id={NEXT_SECTION_ID} aria-labelledby="ai-gap-title" className="border-t border-line">
        <Container className="py-section-lg">
          <p className="text-label uppercase text-black/70">The AI gap</p>
          <h2 id="ai-gap-title" className="mt-6 max-w-[18ch] text-h2">
            Everyone is talking about AI. Few know what to do with it.
          </h2>
        </Container>
      </section>
    </>
  );
}
