import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Colour treatment for the meta row and description.
 *
 * `default` keeps `--color-muted`, which measures 3.2:1 on the warm background
 * and fails WCAG AA for text. `strong` swaps in the alpha variants the Hero
 * already uses instead (8.1:1 for the description, 6.8:1 for the meta row), so
 * a section can meet AA without the fixed brand token being changed.
 */
type SectionHeaderTone = "default" | "strong";

const TONES: Record<SectionHeaderTone, { meta: string; description: string }> = {
  default: { meta: "text-muted", description: "text-muted" },
  strong: { meta: "text-black/70", description: "text-black/75" },
};

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
  /**
   * `id` applied to the heading, so a section can point `aria-labelledby` at it
   * without wrapping the title in an extra element.
   */
  titleId?: string;
  /** Colour treatment. Defaults to the original `--color-muted` styling. */
  tone?: SectionHeaderTone;
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
  titleId,
  tone = "default",
  className,
}: SectionHeaderProps) {
  const hasMeta = Boolean(number) || Boolean(eyebrow);
  const styles = TONES[tone];

  return (
    <header className={cn("flex flex-col gap-6", className)}>
      {hasMeta ? (
        <p className={cn("flex flex-wrap items-center gap-3 text-label uppercase", styles.meta)}>
          {number ? <span>{number}</span> : null}
          {number && eyebrow ? <span aria-hidden="true" className="h-px w-6 bg-line" /> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      ) : null}

      {title ? (
        <Heading id={titleId} className="text-h2">
          {title}
        </Heading>
      ) : null}

      {description ? (
        <p className={cn("max-w-[52ch] text-body-lg text-pretty", styles.description)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
