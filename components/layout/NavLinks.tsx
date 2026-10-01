"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation links with a subtle active-route state.
 *
 * This is the only reason the desktop navbar needs a Client Component at all —
 * `usePathname` is a client hook. Everything else in `Navbar` stays a Server
 * Component.
 *
 * The active state is a hairline underline plus stronger text. No pills, no
 * filled tabs.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-6 lg:gap-8">
        {mainNavigation.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative inline-block text-small whitespace-nowrap transition-colors duration-150 hover:text-black",
                  active ? "text-black" : "text-muted",
                )}
              >
                {item.label}
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
