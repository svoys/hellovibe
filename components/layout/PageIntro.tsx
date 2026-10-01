import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageIntroProps = {
  /** Small uppercase kicker above the heading. */
  eyebrow: string;
  /** The page's single `h1`. */
  title: ReactNode;
  /** `id` on the heading, so the wrapping section can point `aria-labelledby` at it. */
  titleId: string;
  /** Lead paragraph, or several — pass `<p>` elements and the wrapper supplies the type. */
  lead: ReactNode;
  /** Optional action row below the lead. */
  actions?: ReactNode;
  className?: string;
};

/**
 * Opening block shared by every standalone page.
 *
 * It owns the one `h1` on the page and the typography around it, so `/services`,
 * `/work`, `/about` and `/contact` cannot drift apart. It deliberately renders
 * no `<section>`, no `<Container>` and no vertical padding: each page wraps it,
 * because `/services` and `/work` carry content *below* the intro while
 * `/contact` and `/about` do not.
 *
 * Colours are the alpha inks rather than `--color-muted`: `black/75` measures
 * 8.05:1 on the warm background and `black/70` measures 6.84:1, where the fixed
 * brand token only reaches 3.2:1 and fails AA. Same reasoning as the navbar fix.
 */
export function PageIntro({
  eyebrow,
  title,
  titleId,
  lead,
  actions,
  className,
}: PageIntroProps) {
  return (
    <header className={cn("flex flex-col", className)}>
      <p className="text-label uppercase text-black/70">{eyebrow}</p>

      <h1 id={titleId} className="mt-6 text-balance text-h1">
        {title}
      </h1>

      <div className="mt-7 flex max-w-[52ch] flex-col gap-4 text-body-lg text-pretty text-black/75">
        {lead}
      </div>

      {actions ? <div className="mt-10">{actions}</div> : null}
    </header>
  );
}
