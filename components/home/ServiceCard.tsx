import { getTranslations } from "next-intl/server";

import { ServiceVisual } from "@/components/home/ServiceVisual";
import type { Service } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * One service pillar, linking to its own page.
 *
 * Server Component — only the diagram inside `ServiceVisual` crosses into the
 * client bundle.
 *
 * The four cards share one grid but not one look: `surface` flips the third
 * card to near-black, and each diagram has its own accent, so the block reads
 * as an editorial spread rather than four identical SaaS tiles.
 *
 * The whole card is the link rather than a small "Explore …" inside it. The
 * source's card spec does carry a CTA, but nesting it inside a card-wide link
 * would put an anchor inside an anchor; one target for the whole card is both
 * valid HTML and the larger hit area. `href` is passed in rather than looked up
 * here, so the card stays presentational and knows nothing about routes.
 */
export async function ServiceCard({ service, href }: { service: Service; href: string }) {
  const t = await getTranslations("Services.pillars");

  const dark = service.surface === "dark";
  const muted = dark ? "text-white/70" : "text-black/70";
  const body = dark ? "text-white/75" : "text-black/75";
  const rule = dark ? "border-white/20" : "border-line";

  return (
    <article className="h-full">
      <Link
        href={href}
        className={cn(
          "flex h-full flex-col border transition-colors duration-150",
          dark
            ? "border-black bg-black text-white hover:border-white/40"
            : "border-line bg-white text-black hover:border-black",
        )}
      >
        <div className={cn("flex items-center justify-between gap-4 border-b px-6 py-4", rule)}>
          <span className={cn("font-mono text-label", muted)}>{service.number}</span>
          <span className={cn("font-mono text-label uppercase", muted)}>
            {t(`${service.id}.action`)}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-6 pt-7">
          <h3 className="text-h3">{t(`${service.id}.title`)}</h3>
          <p className={cn("mt-3 max-w-[32ch] text-body text-pretty", body)}>
            {t(`${service.id}.description`)}
          </p>
        </div>

        <div className={cn("mt-8 border-t", rule)}>
          <ServiceVisual kind={service.visual} surface={service.surface} />
        </div>
      </Link>
    </article>
  );
}
