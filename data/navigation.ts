import type { NavItem } from "@/types";

/**
 * Single source of truth for navigation routes.
 *
 * Only routes live here. Labels moved to `messages/<locale>.json` under
 * `Nav.items` when the site became bilingual — each entry now carries a `key`
 * that names its label, and the navbar, mobile menu and footer resolve it
 * through `useTranslations`/`getTranslations`. That keeps one route list for
 * both languages, so a page can never be reachable in Russian and missing in
 * English.
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
 * `#how-we-work` would do nothing on `/about`. `NavLinks` compares the current
 * path against `href` for its active state, so this entry never reports as the
 * current page — which is right, because it is an in-page anchor rather than a
 * route of its own.
 *
 * The `href` values are deliberately locale-independent: `/services`, not
 * `/en/services`. The `Link` from `i18n/navigation.ts` resolves them against the
 * active locale, so the same list produces the right URL in both languages and
 * nothing here has to know the routing rules.
 */
export const mainNavigation: readonly NavItem[] = [
  { key: "whatWeDo", href: "/services" },
  { key: "howWeWork", href: "/#how-we-work" },
  { key: "cases", href: "/work" },
  { key: "about", href: "/about" },
];

/**
 * Primary call to action, shared by the navbar, mobile menu and footer.
 *
 * Label is `Nav.startProject` in every locale.
 */
export const primaryCta = {
  href: "/contact",
} as const;

/** The only contact channel that actually exists. Not translated — it is an address. */
export const contactEmail = "hello@hellovibe.ru";
