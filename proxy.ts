import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Locale routing middleware.
 *
 * Next 16 renamed the `middleware` file convention to `proxy` — `middleware.ts`
 * still works but logs a deprecation warning, and Next 16.3 will not let both
 * exist. This is the current name.
 *
 * What the middleware does for every matched request, given the configuration in
 * `i18n/routing.ts`:
 *
 *   `/`            → served as the Russian homepage (no rewrite needed, `ru` is
 *                    the default and `as-needed` means it has no prefix)
 *   `/services`    → rewritten to `/[locale]/services` with `locale = "ru"`
 *   `/en/services` → rewritten with `locale = "en"`
 *   `/ru/services` → 307 to `/services`, so the default locale has exactly one
 *                    URL and crawlers never see the same page twice
 *
 * It also sets the `Link` response header with the alternate-locale URLs, and
 * — because `localeDetection: false` — it never looks at `Accept-Language` or
 * writes a locale cookie. The URL is the only input.
 */
export default createMiddleware(routing);

/**
 * Which requests the middleware runs on.
 *
 * The negative lookahead excludes, in order:
 *
 * - `api`, `trpc` — route handlers, which are not localised
 * - `_next`, `_vercel` — framework and platform internals
 * - `.*\\..*` — anything whose last segment contains a dot
 *
 * That last one is the load-bearing clause. It is what keeps `/sitemap.xml`,
 * `/robots.txt`, `/favicon.ico` and every static asset in `public/` out of the
 * locale rewrite. Without it, `/sitemap.xml` would be rewritten to
 * `/ru/sitemap.xml`, which does not exist, and the site would advertise a
 * sitemap that 404s. The site's own routes contain no dots, so nothing that
 * should be localised is excluded by accident.
 */
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
