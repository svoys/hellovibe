"use client";

import { useTranslations } from "next-intl";

import { mainNavigation } from "@/data/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation links with a subtle active-route state.
 *
 * This is the only reason the desktop navbar needs a Client Component at all —
 * `usePathname` is a client hook. Everything else in `Navbar` stays a Server
 * Component.
 *
 * Both the link and the path hook come from `i18n/navigation.ts`. That matters
 * for the active state specifically: the `usePathname` in `next/navigation`
 * returns the path *with* the locale prefix, so on `/en/about` a comparison
 * against `/about` would be false and English readers would see no current-page
 * marker at all. The locale-aware hook strips the prefix, so the same comparison
 * works in both languages.
 *
 * The active state is a hairline underline plus stronger text. No pills, no
 * filled tabs.
 *
 * Contrast note — inactive links used `--color-muted` (#8a8882), which measures
 * 3.2:1 on the warm background and fails WCAG AA for 14px text. `black/60`
 * measures 5.6:1 and still leaves a visible delta against the `black` hover
 * state. Same trade the Hero makes; the token itself is untouched.
 */
export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <nav aria-label={t("primaryLabel")}>
      <ul className="flex items-center gap-6 lg:gap-8">
        {mainNavigation.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.key}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block text-small whitespace-nowrap transition-colors duration-150 hover:text-black",
                  active ? "text-black" : "text-black/60",
                )}
              >
                {t(`items.${item.key}`)}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-px origin-left bg-black transition-transform duration-150 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
