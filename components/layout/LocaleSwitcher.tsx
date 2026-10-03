"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * The `RU | EN` language switcher.
 *
 * ## Why it is this small
 *
 * The brief asks for a *minimal* switcher, and the site has exactly two locales,
 * so a dropdown or a globe menu would be more chrome than content. Two labels
 * and a hairline rule is the whole control.
 *
 * ## Why it is not a pill
 *
 * Every other control on the site is a flat rectangle with a 5px radius and no
 * fill at rest. A pill-shaped toggle would be the only rounded, filled control
 * on the page, and the design system explicitly reserves the filled treatment
 * for buttons. The active locale is marked the same way the navbar marks the
 * active route — stronger text plus `aria-current` — so the two "you are here"
 * signals on the page read as one system.
 *
 * ## Why the active locale is not a link
 *
 * It would navigate to the page the reader is already on. `aria-current="true"`
 * on a plain `span` says "this is the current choice" without offering a target
 * that does nothing.
 *
 * ## How the current page is preserved
 *
 * `usePathname` from `i18n/navigation.ts` returns the path *without* the locale
 * prefix, and `Link` from the same module re-applies whichever prefix the target
 * locale needs. So a reader on `/en/services` clicking `RU` lands on
 * `/services` — the same page, the other language — and the switcher never has
 * to know that Russian is the unprefixed locale.
 *
 * It renders as real anchors, so it works with JavaScript disabled and is
 * crawlable: the English pages are reachable from the Russian ones without
 * going through a redirect.
 *
 * ## The one `/ru` prefix this component does emit
 *
 * Measured, not assumed: on `/en/services` the Russian link's `href` is
 * `/ru/services`, **not** the bare `/services`. That is `next-intl`'s intended
 * behaviour, not a misconfiguration — `createSharedNavigationFns` computes
 * `forcePrefix: locale != null`, so *any* `Link` given an explicit `locale`
 * always carries a prefix, default locale included. The library does this on
 * purpose (its own comment: "Always include a prefix when changing locales"),
 * to guarantee a fresh server render for the new locale instead of a
 * client-router cache hit, and it accepts "an additional redirect" as the cost.
 *
 * So the switch costs one `307` (`proxy.ts` sends `/ru/*` → `/*`), and the URL a
 * reader ends on is the correct bare `/services`. Nothing canonical is affected:
 * `lib/seo.ts` builds the canonical, the `hreflang` alternates and the sitemap,
 * and none of them ever contains `/ru`.
 *
 * This is left as-is rather than worked around with a raw `next/link` and a
 * hand-built `localePath`: that would drop `next-intl`'s locale-cookie sync and
 * the `hreflang` attribute on the anchor, and would add a second, unmanaged way
 * to build internal links — the exact drift `i18n/navigation.ts` exists to
 * prevent. A rare, single redirect is the cheaper of the two.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common.languageSwitcher");

  return (
    <nav aria-label={t("label")} className={cn("flex items-center", className)}>
      <ul className="flex items-center gap-2.5">
        {routing.locales.map((locale, index) => {
          const isActive = locale === active;
          const label = t(locale);

          return (
            <li key={locale} className="flex items-center gap-2.5">
              {/* Decorative: the labels are already separated by their own
                  spacing, and a screen reader announcing a rule between two
                  letters would be noise. */}
              {index > 0 ? <span aria-hidden="true" className="h-3 w-px bg-line" /> : null}

              {isActive ? (
                <span
                  aria-current="true"
                  className="font-mono text-label uppercase text-black"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={pathname}
                  locale={locale}
                  aria-label={t("switchTo", { language: label })}
                  className="font-mono text-label uppercase text-black/60 transition-colors duration-150 hover:text-black"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
