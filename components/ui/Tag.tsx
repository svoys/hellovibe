import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { TagVariant } from "@/types";

const VARIANTS: Record<TagVariant, string> = {
  default: "border-line text-muted",
  vibe: "border-transparent bg-vibe text-black",
  /* Black on orange measures 7.4:1; white on orange only 2.9:1. */
  orange: "border-transparent bg-orange text-black",
};

type TagProps = {
  variant?: TagVariant;
  className?: string;
  children: ReactNode;
};

/** Compact uppercase label. Minimal radius — never pill-shaped. */
export function Tag({ variant = "default", className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag border px-2.5 py-1 text-label uppercase",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
