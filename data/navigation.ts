import { serviceLinks } from "@/data/services";
import type { NavItem } from "@/types";

/**
 * Single source of truth for navigation labels and routes.
 *
 * Routes are fixed by the Navigation + Footer Pack v0.1, §1:
 *   What we do  → /services
 *   How we work → /services
 *   Cases       → /work
 *   About       → /about
 *   Start a project → /contact
 *
 * Note: "What we do" and "How we work" intentionally share `/services`, so both
 * will report as the active route on that page. See the task report.
 */
export const mainNavigation: NavItem[] = [
  { label: "What we do", href: "/services" },
  { label: "How we work", href: "/services" },
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
 * Derived from `data/services.ts` so the four pillar names are defined exactly
 * once — the homepage Services section renders the same entries.
 */
export const footerServices: NavItem[] = serviceLinks;

/** The only contact channel that actually exists. */
export const contactEmail = "hello@hellovibe.ru";
