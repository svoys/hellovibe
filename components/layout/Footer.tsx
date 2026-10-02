import Link from "next/link";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { contactEmail, footerServices, mainNavigation, primaryCta } from "@/data/navigation";

/**
 * Global footer — the final editorial frame rather than a generic sitemap.
 *
 * Contains only what actually exists. No address, phone, social accounts,
 * clients, awards, certifications or registration details.
 *
 * `border-t border-white/15` marks the top edge. Every block on the page
 * announces itself with a hairline along its top edge; dark sections get away
 * with no rule because the colour change *is* the separator (see the Product
 * Studio and Final CTA notes). That reasoning does not hold here: the Final CTA
 * is `bg-black` too, so on the homepage this footer is the one DARK → DARK
 * adjacency on the page and the two merge into a single black run with nothing
 * to read the boundary from. The value is the same `border-white/15` the
 * copyright rule below already uses, so the footer is not inventing a second
 * hairline weight. On the interior pages the rule sits at a light → dark
 * boundary and is barely visible, which is fine — the colour change separates
 * those.
 *
 * TODO (later phase): legal links (privacy / terms) once the documents exist.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-black text-white">
      <Container className="py-section">
        <div className="hv-grid gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <p className="text-h3">hellovibe</p>
            <p className="mt-3 text-body text-muted">AI Product & Transformation Studio</p>
            <div className="mt-8">
              <ArrowLink href={primaryCta.href} tone="on-dark">
                {primaryCta.label}
              </ArrowLink>
            </div>
          </div>

          <nav aria-label="Footer" className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-6">
            <ul className="flex flex-col gap-3">
              {mainNavigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body text-muted transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-4 lg:col-span-2">
            <ul className="flex flex-col gap-3">
              {footerServices.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-body text-muted transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-2">
            <a
              href={`mailto:${contactEmail}`}
              className="text-body underline decoration-muted underline-offset-4 transition-colors duration-150 hover:decoration-vibe"
            >
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-20 border-t border-white/15 pt-6 text-small text-muted">
          <p>© HelloVibe</p>
        </div>
      </Container>
    </footer>
  );
}
