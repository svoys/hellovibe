import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";

import { routing, type AppLocale } from "@/i18n/routing";

/**
 * Absolute-path helper for one route in one locale.
 *
 * `localePrefix: "as-needed"` means the default locale (Russian) has no prefix
 * and every other locale does. That single rule is expressed once, here, rather
 * than being re-derived at each call site — because the failure mode of getting
 * it wrong is silent: an English page whose canonical points at the Russian URL
 * de-indexes the English page, and nothing in the UI looks broken.
 *
 * @param path route path starting with `/`, or `"/"` for the homepage
 * @param locale the locale the path is being resolved for
 */
export function localePath(path: string, locale: AppLocale): string {
  const suffix = path === "/" ? "" : path;

  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }

  return `/${locale}${suffix}`;
}

/**
 * `canonical` plus `hreflang` alternates for one route.
 *
 * ## The canonical is the *current* locale's URL, not the default one
 *
 * This is the part that is easy to get wrong and expensive to get wrong.
 * `/services` and `/en/services` are translations of one page, so they share a
 * `hreflang` cluster — but each one's `canonical` has to point at **itself**.
 * Pointing the English page's canonical at the Russian URL tells a crawler the
 * English page is a duplicate of the Russian one, and the English page is then
 * dropped from the index entirely. Nothing in the UI looks broken when that
 * happens, which is why the locale is read here rather than left to the caller
 * to remember: the function resolves the current locale itself.
 *
 * ## Why `x-default` points at Russian
 *
 * `x-default` is the URL a crawler serves to a visitor whose language it cannot
 * match. Pointing it at the unprefixed Russian homepage is the same choice the
 * routing config makes — Russian is the site's primary language and the bare URL
 * is its canonical form — so the two cannot drift.
 *
 * ## Why every page needs this
 *
 * The alternates are *per route*: `/services` and `/en/services` are alternates
 * of each other, exactly as `/` and `/en` are. A layout-level value would claim
 * every page on the site was an alternate of the homepage, which is worse than
 * emitting nothing at all. That is why the layout sets no `alternates` and each
 * page calls this.
 *
 * @param path the route this page represents, e.g. `"/services"`
 */
export async function alternatesFor(path: string): Promise<Metadata["alternates"]> {
  const requested = await getLocale();
  /*
   * `getLocale()` is typed `string`; a value that is not one of the configured
   * locales should be impossible by the time it reaches a page — `i18n/request.ts`
   * calls `notFound()` for anything else — but the fallback keeps `canonical`
   * from ever being `undefined` if that ever stops holding.
   */
  const locale: AppLocale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const languages: Record<string, string> = {};

  for (const each of routing.locales) {
    languages[each] = localePath(path, each);
  }

  languages["x-default"] = localePath(path, routing.defaultLocale);

  return { canonical: languages[locale], languages };
}
