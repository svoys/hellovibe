import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Colour treatment for the meta row and description.
 *
 * `default` keeps `--color-muted`, which measures 3.2:1 on the warm background
 * and fails WCAG AA for text. `strong` swaps in the alpha variants the Hero
 * already uses instead (8.1:1 for the description, 6.8:1 for the meta row), so
 * a section can meet AA without the fixed brand token being changed.
 *
 * `inverse` is the same idea for the dark sections: white at 70% and 75% over
 * `--color-black` measure 9.6:1 and 11:1. Neither `default` nor `strong` is
 * legible there, and a dark section should not have to fork its own header.
 *
 * `vibe` is the same idea for the accent sections: `strong`'s two alphas over
 * `--color-vibe` measure 6.6:1 and 7.8:1, and the field is light, so the text
 * colours do not have to change — only the number/eyebrow divider, which is
 * `--color-line` by default and would be invisible on an accent field.
 */
type SectionHeaderTone = "default" | "strong" | "inverse" | "vibe";

const TONES: Record<
  SectionHeaderTone,
  { meta: string; description: string; divider: string }
> = {
  default: { meta: "text-muted", description: "text-muted", divider: "bg-line" },
  strong: { meta: "text-black/70", description: "text-black/75", divider: "bg-line" },
  inverse: { meta: "text-white/70", description: "text-white/75", divider: "bg-line" },
  vibe: { meta: "text-black/70", description: "text-black/75", divider: "bg-black/40" },
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
          {number && eyebrow ? (
            <span aria-hidden="true" className={cn("h-px w-6", styles.divider)} />
          ) : null}
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
