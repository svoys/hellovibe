import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** Section index, e.g. `"01"`. */
  number?: string;
  /** Small uppercase kicker, e.g. `"What we do"`. */
  eyebrow?: string;
  /** Section title. */
  title?: ReactNode;
  /** Supporting paragraph. */
  description?: ReactNode;
  /** Heading level, so the document outline stays correct in any section. */
  as?: "h2" | "h3";
  className?: string;
};

/**
 * Every element is optional — a section can use only the pieces it needs.
 *
 * 01 ── WHAT WE DO
 * From opportunity to outcome.
 * We combine strategy, product, technology and creative...
 */
export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  const hasMeta = Boolean(number) || Boolean(eyebrow);

  return (
    <header className={cn("flex flex-col gap-6", className)}>
      {hasMeta ? (
        <p className="flex flex-wrap items-center gap-3 text-label uppercase text-muted">
          {number ? <span>{number}</span> : null}
          {number && eyebrow ? <span aria-hidden="true" className="h-px w-6 bg-line" /> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      ) : null}

      {title ? <Heading className="text-h2">{title}</Heading> : null}

      {description ? (
        <p className="max-w-[52ch] text-body-lg text-pretty text-muted">{description}</p>
      ) : null}
    </header>
  );
}
