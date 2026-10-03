import type { MetadataRoute } from "next";

import { servicePillars } from "@/data/service-pillars";
import { routing } from "@/i18n/routing";
import { localePath } from "@/lib/seo";
import { siteOrigin } from "@/lib/site";

/**
 * Every public route, and nothing else — once, with both languages attached.
 *
 * The four pillar routes are derived from `servicePillars` rather than typed
 * out, so a pillar cannot exist without appearing here. `/definitely-not-a-page`
 * and other 404s are absent by construction.
 *
 * ## One entry per page, not one per translation
 *
 * A route is listed once, at its canonical URL — the Russian one, because
 * `localePrefix: "as-needed"` makes the bare path the default locale's address —
 * and the English URL is declared as a language alternate rather than as a
 * second entry. That is what Google asks for: `<xhtml:link rel="alternate"
 * hreflang="en" …>` inside a single `<url>` tells it "this is one page in two
 * languages", where two independent `<url>` entries would read as two pages
 * whose content happens to be similar, and the pair would then compete with each
 * other instead of reinforcing each other.
 *
 * It is also why `localePath` is imported rather than the prefixes being written
 * out here: the rule "the default locale is bare, everything else is prefixed"
 * is stated once, in `lib/seo.ts`, and the sitemap, the per-page metadata and the
 * `Link` header the middleware sets all read it from there. A sitemap that
 * disagreed with the `<link rel="canonical">` tags would be worse than no
 * sitemap.
 *
 * `lastModified` is deliberately omitted: there is no per-route timestamp to
 * report, and stamping every URL with the build time would tell crawlers that
 * the whole site changed on every deploy — worse than saying nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    ...servicePillars.map((pillar) => pillar.href),
    "/work",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteOrigin}${localePath(route, routing.defaultLocale)}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteOrigin}${localePath(route, locale)}`]),
      ),
    },
  }));
}
