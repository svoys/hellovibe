import type { MetadataRoute } from "next";

import { servicePillars } from "@/data/service-pillars";
import { siteOrigin } from "@/lib/site";

/**
 * Every public route, and nothing else.
 *
 * The four pillar routes are derived from `servicePillars` rather than typed
 * out, so a pillar cannot exist without appearing here. `/definitely-not-a-page`
 * and other 404s are absent by construction.
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

  return routes.map((route) => ({ url: `${siteOrigin}${route}` }));
}
