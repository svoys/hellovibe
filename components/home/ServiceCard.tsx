import { ServiceVisual } from "@/components/home/ServiceVisual";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * One service pillar.
 *
 * Server Component — only the diagram inside `ServiceVisual` crosses into the
 * client bundle.
 *
 * The four cards share one grid but not one look: `surface` flips the third
 * card to near-black, and each diagram has its own accent, so the block reads
 * as an editorial spread rather than four identical SaaS tiles.
 */
export function ServiceCard({ service }: { service: Service }) {
  const dark = service.surface === "dark";
  const muted = dark ? "text-white/70" : "text-black/70";
  const body = dark ? "text-white/75" : "text-black/75";
  const rule = dark ? "border-white/20" : "border-line";

  return (
    <article
      className={cn(
        "flex h-full flex-col border",
        dark ? "border-black bg-black text-white" : "border-line bg-white text-black",
      )}
    >
      <div className={cn("flex items-center justify-between gap-4 border-b px-6 py-4", rule)}>
        <span className={cn("font-mono text-label", muted)}>{service.number}</span>
        <span className={cn("font-mono text-label uppercase", muted)}>{service.action}</span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-7">
        <h3 className="text-h3">{service.title}</h3>
        <p className={cn("mt-3 max-w-[32ch] text-body text-pretty", body)}>{service.description}</p>
      </div>

      <div className={cn("mt-8 border-t", rule)}>
        <ServiceVisual kind={service.visual} surface={service.surface} />
      </div>
    </article>
  );
}
