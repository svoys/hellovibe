import { defineRouting } from "next-intl/routing";

/**
 * Locale routing — the single source of truth for which locales exist and how
 * they appear in the URL.
 *
 * ## The two decisions that are not defaults
 *
 * **`localePrefix: "as-needed"`.** Russian is the site's primary language, so it
 * must not carry a prefix: the canonical Russian homepage is `/`, not `/ru`.
 * English is secondary and *is* prefixed, so it lives at `/en`. `as-needed`
 * encodes exactly that rule — the default locale is served bare, every other
 * locale is prefixed — and next-intl's middleware redirects a hand-typed
 * `/ru/anything` back to `/anything`, so the Russian URL cannot exist in two
 * forms and there is no duplicate content for a crawler to find.
 *
 * **`localeDetection: false`.** next-intl defaults this to `true`, which reads
 * the `Accept-Language` header and a cookie and redirects accordingly. That is
 * deliberately off here: the brief requires the URL to be the only source of
 * truth for language. A Russian speaker with an English browser must still get
 * the Russian site at `/`, and a crawler must see the same thing a visitor
 * does. With detection off, `/` is always Russian and `/en` is always English,
 * for everybody, on the first request.
 *
 * ## Why `alternateLinks` stays on
 *
 * It is left at its default (`true`). The middleware then sets a `Link`
 * response header listing the other locale's URL for every page, which is the
 * HTTP-level equivalent of the `hreflang` tags `app/sitemap.ts` and the
 * per-page metadata also emit. Three signals saying the same thing is the
 * intent — they are read by different consumers (header, page head, sitemap).
 */
export const routing = defineRouting({
  /** Order matters for the switcher's rendering, not for matching. */
  locales: ["ru", "en"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
  localeDetection: false,
});

/** `"ru" | "en"` — derived, so it can never drift from the list above. */
export type AppLocale = (typeof routing.locales)[number];
