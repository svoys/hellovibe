import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { mainNavigation, primaryCta } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist.",
  robots: { index: false, follow: false },
};

/**
 * Every route that actually resolves.
 *
 * Built from the same two sources the navbar and footer use, so a page can never
 * be added to this list without also being reachable from the navigation — and,
 * more importantly, so this list can never point at a route that 404s.
 */
const AVAILABLE_ROUTES = [{ label: "Home", href: "/" }, ...mainNavigation, primaryCta];

/**
 * Root 404.
 *
 * Renders inside the root layout, so the navbar and footer are still there and
 * the visitor is one click from anywhere. The route list is the whole point:
 * before this page existed, a mistyped URL dropped the visitor on Next's bare
 * default 404 with no way back into the site.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow="404"
          titleId="not-found-title"
          title="This page doesn’t exist."
          lead={
            <p>
              The link may be out of date, or the page may not have been built yet. Every page below
              does exist:
            </p>
          }
        />

        <nav aria-label="Available pages" className="mt-12">
          <ul className="flex flex-col border-t border-line">
            {AVAILABLE_ROUTES.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  className="block py-5 text-h3 transition-colors duration-150 hover:text-black/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
