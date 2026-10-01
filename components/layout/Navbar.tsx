import Link from "next/link";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta } from "@/data/navigation";

/**
 * Global navigation.
 *
 * Server Component: the only interactive pieces are extracted into `NavLinks`
 * (active route state) and `MobileMenu` (menu behaviour), which keeps the client
 * boundary as small as possible.
 *
 * Deliberately not sticky — the pack asks for plain document navigation for now;
 * scroll-based refinement is a later task.
 */
export function Navbar() {
  return (
    <header className="border-b border-line bg-bg">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
          hellovibe
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ButtonLink href={primaryCta.href} arrow className="h-11 px-5 text-small">
              {primaryCta.label}
            </ButtonLink>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
