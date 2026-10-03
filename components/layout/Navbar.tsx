import { getTranslations } from "next-intl/server";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta } from "@/data/navigation";
import { Link } from "@/i18n/navigation";

/**
 * Global navigation.
 *
 * Server Component: the only interactive pieces are extracted into `NavLinks`
 * (active route state), `LocaleSwitcher` (client, for the current path) and
 * `MobileMenu` (menu behaviour), which keeps the client boundary as small as
 * possible.
 *
 * The brand, the nav labels and the CTA label all come from the message
 * catalogues, so the header is fully localised. The routes do not — they are
 * locale-independent and the `Link` resolves them per locale.
 *
 * Deliberately not sticky — the pack asks for plain document navigation for now;
 * scroll-based refinement is a later task.
 */
export async function Navbar() {
  const t = await getTranslations("Nav");
  const common = await getTranslations("Common");

  return (
    <header className="border-b border-line bg-bg">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
          {common("brand")}
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          {/*
            Visible at every width, not only on desktop. The switcher is the one
            control a reader may need *before* they can read anything else, so
            burying it inside the mobile menu would be the wrong trade — the
            menu is exactly the thing they may not be able to parse yet.
          */}
          <LocaleSwitcher />

          <div className="hidden md:block">
            <ButtonLink href={primaryCta.href} arrow className="h-11 px-5 text-small">
              {t("startProject")}
            </ButtonLink>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
