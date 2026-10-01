import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * FOUNDATION PREVIEW — DEVELOPMENT ONLY
 * ----------------------------------------------------------------------------
 * This is NOT the final HelloVibe homepage. The real Hero, the Vibe Machine
 * and the homepage sections are built in the next phase ("Implement HelloVibe
 * Navigation + Layout").
 *
 * Everything on this page exists only to prove that the foundation works:
 * typography hierarchy, colour tokens, Container, the responsive grid, Button,
 * ArrowLink, Tag and SectionHeader. Replace this file wholesale when the real
 * homepage lands.
 * ============================================================================
 */

const TYPE_SPECIMENS = [
  { label: "Display", className: "text-display", sample: "Real" },
  { label: "H1", className: "text-h1", sample: "From opportunity to outcome" },
  { label: "H2", className: "text-h2", sample: "Working systems" },
  { label: "H3", className: "text-h3", sample: "Strategy, product, technology" },
  { label: "H4", className: "text-h4", sample: "Creative engines" },
  {
    label: "Body Large",
    className: "text-body-lg",
    sample: "We turn AI opportunities into working products and business systems.",
  },
  {
    label: "Body",
    className: "text-body",
    sample: "We turn AI opportunities into working products and business systems.",
  },
  {
    label: "Small",
    className: "text-small",
    sample: "Supporting detail and metadata sit at this size.",
  },
  { label: "Label", className: "text-label uppercase", sample: "AI Strategy" },
] as const;

const COLOR_TOKENS = [
  { token: "--color-bg", role: "Primary warm background" },
  { token: "--color-black", role: "Primary text / dark surfaces" },
  { token: "--color-white", role: "Light text / contrast" },
  { token: "--color-muted", role: "Secondary text" },
  { token: "--color-line", role: "Borders / separators" },
  { token: "--color-vibe", role: "System / progress / structure" },
  { token: "--color-orange", role: "Experiment / creative energy" },
] as const;

const SERVICES = ["AI Strategy", "AI Systems", "AI Products", "AI Creative"] as const;

export default function HomePage() {
  return (
    <>
      {/* --- Foundation preview: opening block ------------------------------- */}
      <section className="border-b border-line">
        <Container className="py-section-lg">
          <div className="flex max-w-4xl flex-col gap-8">
            <div className="flex flex-wrap items-center gap-3">
              <Tag variant="vibe">Foundation preview v0.1</Tag>
              <Tag>Development only</Tag>
            </div>

            <p className="text-label uppercase text-muted">AI Product & Transformation Studio</p>

            <h1 className="text-display">AI, but make it real.</h1>

            <p className="max-w-[46ch] text-body-lg text-muted">
              We turn AI opportunities into working products, business systems and creative
              engines.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/contact" arrow>
                Start a project
              </ButtonLink>
              <ArrowLink href="/services">How we work</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Responsive grid + SectionHeader --------------------------------- */}
      <section className="border-b border-line">
        <Container className="py-section">
          <SectionHeader
            number="01"
            eyebrow="What we do"
            title="From opportunity to outcome."
            description="We combine strategy, product, technology and creative into one working system — from the first AI opportunity to a shipped result."
          />

          <div className="hv-grid mt-16 gap-y-8">
            {SERVICES.map((service, index) => (
              <article
                key={service}
                className="col-span-4 border-t border-line pt-6 md:col-span-4 lg:col-span-3"
              >
                <p className="text-label uppercase text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-h4">{service}</h3>
                <p className="mt-3 text-small text-muted">
                  Placeholder — real content arrives in a later phase.
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* --- Typography scale ------------------------------------------------- */}
      <section className="border-b border-line">
        <Container className="py-section">
          <SectionHeader
            number="02"
            eyebrow="Foundation"
            title="Typography scale"
            description="Mobile and desktop targets are expressed with clamp(), so hierarchy stays clear at every width instead of collapsing."
          />

          <dl className="mt-16 flex flex-col gap-10">
            {TYPE_SPECIMENS.map((specimen) => (
              <div key={specimen.label} className="border-t border-line pt-6">
                <dt className="text-label uppercase text-muted">{specimen.label}</dt>
                <dd className={cn("mt-4", specimen.className)}>{specimen.sample}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --- Colour tokens ---------------------------------------------------- */}
      <section className="border-b border-line">
        <Container className="py-section">
          <SectionHeader
            number="03"
            eyebrow="Foundation"
            title="Colour tokens"
            description="Seven tokens, one source of truth. Everything below is read straight from the CSS variables."
          />

          <ul className="hv-grid mt-16 gap-y-8">
            {COLOR_TOKENS.map((color) => (
              <li key={color.token} className="col-span-2 md:col-span-2 lg:col-span-3">
                <div
                  className="h-24 w-full rounded-control border border-line"
                  style={{ backgroundColor: `var(${color.token})` }}
                />
                <p className="mt-4 font-mono text-small">{color.token}</p>
                <p className="mt-1 text-small text-muted">{color.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* --- Component states ------------------------------------------------- */}
      <section>
        <Container className="py-section">
          <SectionHeader
            number="04"
            eyebrow="Foundation"
            title="Components"
            description="Default, hover, focus and disabled behaviour. Tab through this page to check the focus states."
          />

          <div className="hv-grid mt-16 gap-y-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-label uppercase text-muted">Button</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button disabled>Disabled</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <ButtonLink href="/contact" arrow>
                  Button as link
                </ButtonLink>
              </div>
            </div>

            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <p className="text-label uppercase text-muted">ArrowLink</p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <ArrowLink href="/services">What we do</ArrowLink>
                <ArrowLink href="/work">Cases</ArrowLink>
                <ArrowLink href="/about">About</ArrowLink>
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <p className="text-label uppercase text-muted">Tag</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Tag>Default</Tag>
                <Tag variant="vibe">Vibe</Tag>
                <Tag variant="orange">Orange</Tag>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
