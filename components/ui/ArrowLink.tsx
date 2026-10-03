import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ArrowLinkTone = "default" | "on-dark";

/** `on-dark` only swaps the underline colours — the shape stays identical. */
const TONES: Record<ArrowLinkTone, string> = {
  default: "border-line hover:border-black",
  "on-dark": "border-white/30 hover:border-vibe",
};

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  tone?: ArrowLinkTone;
  className?: string;
};

/**
 * Minimal editorial link with a trailing arrow.
 * Inherits its type size from context so it can sit in body copy or a CTA row.
 */
export function ArrowLink({ href, children, tone = "default", className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 border-b pb-0.5 font-medium transition-colors duration-150",
        TONES[tone],
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[1em] shrink-0 transition-transform duration-150 group-hover:translate-x-1"
      />
    </Link>
  );
}
