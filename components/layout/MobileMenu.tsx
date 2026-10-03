"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNavigation, primaryCta } from "@/data/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PANEL_ID = "mobile-navigation";

const CONTROL =
  "inline-flex h-11 items-center justify-center rounded-control px-3 text-small font-medium text-black transition-colors duration-150 hover:bg-line/50";

const FOCUSABLE = "a[href], button:not([disabled])";

/**
 * Mobile navigation: the menu control plus a full-screen editorial panel.
 *
 * Behaviour required by the pack (§5): opens from the control, closes from the
 * close control, closes after choosing a link, Escape closes it, focus stays
 * reasonable, the page behind cannot be interacted with, and the transition
 * respects `prefers-reduced-motion`. No dependency is used for any of it.
 */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const common = useTranslations("Common");

  // The panel is open only while the route it was opened on is still the current
  // one. Any navigation therefore closes it without needing an effect, and the
  // "close after choosing a link" requirement falls out of the same rule.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openedAt === pathname;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpenedAt(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep focus inside the panel while it is open.
      const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Delegated so it also covers the CTA, which is not a plain link element.
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.("a[href]")) setOpenedAt(null);
    };

    document.addEventListener("keydown", onKeyDown);
    panel.addEventListener("click", onClick);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      panel.removeEventListener("click", onClick);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  // Move focus into the panel when it opens so keyboard users land in the menu.
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={t("openMenu")}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpenedAt(pathname)}
        className={CONTROL}
      >
        <Menu aria-hidden="true" className="size-4" />
        {t("menuWord")}
      </button>

      <div
        id={PANEL_ID}
        ref={panelRef}
        inert={!open}
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-bg transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <Container className="flex h-20 shrink-0 items-center justify-between gap-4 border-b border-line">
          <Link href="/" className="text-[1.0625rem] font-semibold tracking-[-0.03em]">
            {common("brand")}
          </Link>

          {/*
            The panel covers the whole viewport, navbar included, so the
            switcher has to be repeated here — otherwise it would be unreachable
            for exactly as long as the menu is open.
          */}
          <LocaleSwitcher className="ml-auto" />

          <button type="button" aria-label={t("closeMenu")} onClick={close} className={CONTROL}>
            {t("closeWord")}
            <X aria-hidden="true" className="ml-2 size-4" />
          </button>
        </Container>

        <nav aria-label={t("mobileLabel")} className="flex-1 overflow-y-auto">
          <Container className="flex flex-col py-12">
            <ul className="flex flex-col gap-5">
              {mainNavigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="text-h3 inline-block transition-colors duration-150 hover:text-muted"
                  >
                    {t(`items.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <ButtonLink href={primaryCta.href} arrow>
                {t("startProject")}
              </ButtonLink>
            </div>
          </Container>
        </nav>
      </div>
    </div>
  );
}
