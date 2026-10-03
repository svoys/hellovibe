import { getTranslations } from "next-intl/server";

import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { Link } from "@/i18n/navigation";

/**
 * The 404, without a document around it.
 *
 * Split out because two files render it: `app/[locale]/not-found.tsx` (the
 * boundary Next uses when a route calls `notFound()`) and
 * `app/global-not-found.tsx` (the document Next renders for a URL that matches
 * no route at all). They must show the same page, and a copy in each would drift.
 *
 * ## Every route that actually resolves
 *
 * Built from the same two sources the navbar and footer use, so a page can never
 * be added to this list without also being reachable from the navigation — and,
 * more importantly, so this list can never point at a route that 404s.
 *
 * The labels come from `Nav.items`, which is the same namespace the navbar reads,
 * so the 404 cannot call a page something the navbar calls something else. Only
 * the hrefs live in `data/navigation.ts`; `Link` from `i18n/navigation.ts`
 * resolves each one against the locale the 404 was served in, so an English
 * reader is not sent back into the Russian site by the one page whose job is to
 * be helpful.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export async function NotFoundContent() {
  const t = await getTranslations("Pages.NotFound");
  const nav = await getTranslations("Nav");

  const routes = [
    { label: t("home"), href: "/" },
    ...mainNavigation.map((item) => ({ label: nav(`items.${item.key}`), href: item.href })),
    { label: nav("startProject"), href: primaryCta.href },
  ];

  return (
    <section aria-labelledby="not-found-title">
      <Container className="py-section-lg">
        <PageIntro
          eyebrow={t("eyebrow")}
          titleId="not-found-title"
          title={t("title")}
          lead={<p>{t("lead")}</p>}
        />

        <nav aria-label={t("routesLabel")} className="mt-12">
          <ul className="flex flex-col border-t border-line">
            {routes.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  className="block py-5 text-h3 transition-colors duration-150 hover:text-black/60"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
