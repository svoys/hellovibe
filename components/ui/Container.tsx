import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Horizontal layout primitive: consistent gutter padding, max-width and
 * centering. Sections should never set their own horizontal margins.
 */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-hv px-gutter", className)} {...props} />;
}
