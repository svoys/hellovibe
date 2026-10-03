import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";

import { routing, type AppLocale } from "./routing";

/**
 * Message catalogues, one per locale.
 *
 * Written as an explicit map rather than a template-literal `import()`, for two
 * reasons. A bundler can enumerate this statically, so each locale's JSON is a
 * separate chunk instead of one glob; and typing it `Record<AppLocale, …>`
 * means adding a locale to `i18n/routing.ts` without adding its catalogue here
 * is a compile error rather than a runtime crash on the first request.
 *
 * The loader is a function so the catalogue is only parsed for the locale
 * actually being served — the Russian bundle never pays for the English one.
 */
const MESSAGES: Record<AppLocale, () => Promise<{ default: Record<string, unknown> }>> = {
  ru: () => import("../messages/ru.json"),
  en: () => import("../messages/en.json"),
};

/**
 * Per-request i18n configuration — the one place next-intl learns which locale
 * the current request is for and which catalogue goes with it.
 *
 * ## Reading the locale
 *
 * Next 16.3 added `next/root-params`, which exposes the value of a top-level
 * dynamic segment (`[locale]`) to any Server Component underneath it. That is
 * what makes the locale available *synchronously* here, and it is the reason
 * this project needs no `setRequestLocale` calls in its pages — a page that
 * takes no params can still be statically rendered, because the locale is
 * resolved by the framework rather than by a cache the page has to warm.
 *
 * ## The `locale` override
 *
 * `next/root-params` does not work in Server Actions or Route Handlers (a known
 * Next limitation). The contact form is a Server Action, and its validation
 * errors have to come back in the reader's language — so the action passes the
 * locale explicitly, and that explicit value wins here. Without this branch the
 * form would answer in the default locale regardless of which site the reader
 * was on.
 *
 * ## Unknown segments
 *
 * Because `[locale]` is a catch-all by nature, a request like `/en/nope` arrives
 * with a segment value that is simply not a locale. `hasLocale` narrows it, and
 * anything that fails the check calls `notFound()` — the reader gets the
 * branded 404 rather than a page rendered in a language that does not exist.
 */
export default getRequestConfig(async ({ locale: explicitLocale }) => {
  /*
   * Annotated rather than inferred. `explicitLocale` arrives as a plain `string`,
   * and `hasLocale` only narrows inside the branch it guards — without the
   * annotation the assignment would widen back to `string`, and `MESSAGES[locale]`
   * below would be an implicit `any` instead of the two-locale record.
   */
  let locale: AppLocale | undefined;

  if (hasLocale(routing.locales, explicitLocale)) {
    locale = explicitLocale;
  } else {
    const paramValue = await rootParams.locale();
    locale = hasLocale(routing.locales, paramValue) ? paramValue : undefined;
  }

  if (!locale) notFound();

  return {
    locale,
    messages: (await MESSAGES[locale]()).default,
  };
});
