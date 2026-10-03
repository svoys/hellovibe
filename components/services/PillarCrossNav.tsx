import { getTranslations } from "next-intl/server";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { servicePillars } from "@/data/service-pillars";
import { cn } from "@/lib/utils";

/**
 * Cross-navigation between the four pillars, for the foot of each pillar page.
 *
 * All four are listed rather than only the other three: a reader arriving from
 * search lands on one pillar with no idea the others exist, so the list doubles
 * as the answer to "what else does HelloVibe do". The current pillar is rendered
 * as text with `aria-current="page"` rather than as a link to itself, which is
 * also why the list keeps its own `nav` landmark and label.
 *
 * Async Server Component: the pillar names and action words are per locale, so
 * they are read from `Services.pillars` rather than from `data/services.ts` —
 * which is why this became `async` when the site went bilingual. `ArrowLink`
 * still supplies the locale-aware `Link`, so nothing here has to know the
 * routing rules. The global focus ring already covers the links, and the light
 * surface needs no `data-surface` hook.
 */
export async function PillarCrossNav({
  currentSlug,
  className,
}: {
  /** Slug of the pillar being viewed, so it can be marked instead of linked. */
  currentSlug: string;
  className?: string;
}) {
  const t = await getTranslations("Pages.Pillar");
  const pillars = await getTranslations("Services.pillars");

  return (
    <nav aria-label={t("crossNavLabel")} className={className}>
      <ul className="flex flex-col border-t border-line">
        {servicePillars.map((pillar) => {
          const isCurrent = pillar.slug === currentSlug;
          const title = pillars(`${pillar.service.id}.title`);
          const action = pillars(`${pillar.service.id}.action`);

          return (
            <li
              key={pillar.slug}
              className="hv-grid items-baseline gap-y-1 border-b border-line py-6"
            >
              <span className="col-span-1 font-mono text-label text-black/70">
                {pillar.service.number}
              </span>

              <span className="col-span-3 md:col-span-5 lg:col-span-8">
                {isCurrent ? (
                  /* Not a link: the reader is already here. `aria-current`
                     carries the state, so the styling is not the only cue. */
                  <span aria-current="page" className="text-h4">
                    {title}
                  </span>
                ) : (
                  <ArrowLink href={pillar.href} className="text-h4 text-black/75 hover:text-black">
                    {title}
                  </ArrowLink>
                )}
              </span>

              <span
                className={cn(
                  "col-span-4 font-mono text-label uppercase md:col-span-2 lg:col-span-3 md:text-right",
                  isCurrent ? "text-black" : "text-black/70",
                )}
              >
                {action}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
