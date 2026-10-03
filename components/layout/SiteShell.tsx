import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/**
 * Everything between `<body>` and `</body>`: the skip link, the navbar, the
 * main landmark and the footer.
 *
 * It exists because the site now has **two** documents that need it — the locale
 * layout (`app/[locale]/layout.tsx`) and the global 404
 * (`app/global-not-found.tsx`, which cannot use the locale layout, because Next
 * renders it as the layout of the not-found tree itself). Two copies of this
 * markup would drift the moment the navbar gained a link.
 *
 * It deliberately renders **no** `<html>` or `<body>`: those belong to whichever
 * document is using it, and only that document knows the locale for `lang`.
 *
 * ## The provider
 *
 * `NextIntlClientProvider` inherits `locale`, `messages`, `timeZone` and `now`
 * from `i18n/request.ts` when it renders in a Server Component, so it is passed
 * no props. It has to exist at all because nine components are Client
 * Components — the two menus, the journey stepper, the Vibe Machine, the service
 * diagrams, the method timeline and the contact form — and `useTranslations`
 * needs a provider above it on the client side.
 */
export async function SiteShell({ children }: { children: ReactNode }) {
  const t = await getTranslations("Common");

  return (
    <NextIntlClientProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-black focus:px-4 focus:py-2 focus:text-small focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </NextIntlClientProvider>
  );
}
