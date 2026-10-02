import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { TagVariant } from "@/types";

/**
 * Colour treatments.
 *
 * `default` used `text-muted`, which measures 3.2:1 on the warm background and
 * fails WCAG AA for text — the same fixed brand token that every section header
 * had to work around. It swaps in `text-black/70` (6.84:1), matching the label
 * treatment the rest of the site uses. The `border-line` outline is left alone:
 * it is decorative, and the tag's meaning is carried by its text.
 *
 * This variant has never shipped — the only `<Tag>` in the codebase is
 * `variant="vibe"` in `AIAuditVisual`. The fix is still worth having so the
 * primitive is not a trap for the next caller.
 */
const VARIANTS: Record<TagVariant, string> = {
  default: "border-line text-black/70",
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
