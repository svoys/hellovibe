/**
 * The site's public origin, in one place.
 *
 * Used for absolute URLs in metadata, the sitemap and robots. `NEXT_PUBLIC_SITE_URL`
 * is the only knob and it holds no secret — the source's environment section
 * lists exactly this variable, and the security section forbids `NEXT_PUBLIC_`
 * on anything private.
 *
 * The localhost fallback keeps `next dev` and the build working with no
 * configuration; it is not a production value.
 */
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);
