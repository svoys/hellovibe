import { servicePillarLinks } from "@/data/service-pillars";
import type { NavItem } from "@/types";

/**
 * Single source of truth for navigation labels and routes.
 *
 * Routes are fixed by the Navigation + Footer Pack v0.1, §1, with one later
 * change: the Product Journey Pack v0.1 §11 requires "How we work" to point at
 * the homepage section rather than at `/services`, because that section is what
 * the label now names. §19 lists the same thing as a QA check.
 *
 *   What we do  → /services
 *   How we work → /#how-we-work
 *   Cases       → /work
 *   About       → /about
 *   Start a project → /contact
 *
 * The leading `/` is required: the navbar renders on every route, so a bare
 * `#how-we-work` would do nothing on `/about`. `NavLinks` compares
 * `usePathname()` against `href` for its active state, so this entry never
 * reports as the current page — which is right, because it is an in-page anchor
 * rather than a route of its own.
 */
export const mainNavigation: NavItem[] = [
  { label: "What we do", href: "/services" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "Cases", href: "/work" },
  { label: "About", href: "/about" },
];

/** Primary call to action, shared by the navbar, mobile menu and footer. */
export const primaryCta: NavItem = {
  label: "Start a project",
  href: "/contact",
};

/**
 * Service capabilities listed in the footer.
 *
 * Derived from `data/service-pillars.ts` so the four pillar names are defined
 * exactly once — the homepage Services section renders the same entries — and
 * each one points at its own pillar page rather than all four at `/services`.
 */
export const footerServices: NavItem[] = servicePillarLinks;

/** The only contact channel that actually exists. */
export const contactEmail = "hello@hellovibe.ru";
