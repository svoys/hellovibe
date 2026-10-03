import type { Metadata, Viewport } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { siteOrigin } from "@/lib/site";

import "../globals.css";

/**
 * The root layout.
 *
 * It lives inside `[locale]` rather than at `app/`, which Next 16.3 allows: a
 * root layout is now any layout with no other layout above it. That placement is
 * the whole point of the routing setup — the locale is a route parameter, so
 * `<html lang>` can be derived from the URL instead of guessed, and every page
 * beneath it is rendered for one specific language.
 *
 * There is deliberately **no** `app/layout.tsx`. Adding one — even a pass-through
 * that just returns `children` — would make *it* the root layout instead, and
 * this file would stop being one, taking the `[locale]` segment's locale with it.
 * Non-localised requests (a stray `/robots.txt`, a malformed path) are handled by
 * `proxy.ts`'s matcher and Next's own fallbacks, not by a second root layout.
 *
 * ## Static rendering
 *
 * `generateStaticParams` pre-renders both locales at build time. No
 * `setRequestLocale` call is needed anywhere in the project: Next 16.3's
 * `next/root-params` lets `i18n/request.ts` read the `[locale]` segment directly,
 * so a page that takes no `params` of its own can still be fully static.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Site-wide metadata.
 *
 * Locale-dependent, so it has to be generated rather than exported as a
 * constant. The `title.template` appends the brand to every page's own title,
 * which is why no page repeats "— HelloVibe" itself.
 *
 * `alternates` is *not* set here. It is per-route by nature — `/` and `/en` are
 * alternates of each other, but so are `/services` and `/en/services` — and a
 * layout-level value would claim every page's canonical was the homepage. Each
 * page sets its own through `lib/seo.ts`.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: t("siteTitle"),
      template: "%s — HelloVibe",
    },
    description: t("siteDescription"),
    applicationName: "HelloVibe",
    openGraph: {
      type: "website",
      siteName: "HelloVibe",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteTitle"),
      description: t("siteDescription"),
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  /* Must stay in sync with --color-bg (browser chrome cannot read CSS vars). */
  themeColor: "#f5f3ee",
};

/**
 * @param children the page for the current locale
 */
export default async function LocaleLayout({ children }: { children: ReactNode }) {
  /*
   * `getLocale()` rather than `params.locale`. Both are correct, but this one
   * goes through `i18n/request.ts`, so it returns the *resolved* locale — the
   * one whose catalogue was actually loaded — rather than whatever string
   * happened to be in the segment. If the two ever disagreed, `<html lang>`
   * would be the first thing to lie.
   */
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        {/*
          Everything inside `<body>` comes from `SiteShell`, which the global 404
          document uses as well — so the navbar and footer are defined once and
          the two documents cannot drift. The provider that used to live here
          moved into the shell with them; see its doc comment for why the
          Client Components need it.
        */}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
