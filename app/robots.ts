import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/site";

/**
 * Crawling rules.
 *
 * Everything public is allowed — there is no private area, no staging path and
 * no search results page, so there is nothing to disallow. The sitemap is
 * advertised so a crawler that finds one route finds the rest.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
