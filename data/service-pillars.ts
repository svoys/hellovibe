import { services, type Service, type ServiceId } from "@/data/services";
import type { ServiceItem } from "@/types";

/**
 * The four public pillar routes, exactly as the source's route map fixes them
 * (`§05 Route map` → "Main routes"):
 *
 *   /services/strategy   /services/systems   /services/products   /services/creative
 *
 * They deliberately do **not** match `Service["id"]` (`ai-strategy`, …). The id
 * is an internal key that also joins the pillar's copy and its capability list;
 * the slug is a public route, and the source decides the routes. Keeping the
 * mapping here instead of adding a `slug` field to `data/services.ts` keeps the
 * public URL out of the module the homepage grid reads.
 */
export const SERVICE_PILLAR_SLUGS = ["strategy", "systems", "products", "creative"] as const;

export type ServicePillarSlug = (typeof SERVICE_PILLAR_SLUGS)[number];

const SLUG_BY_ID: Readonly<Record<ServiceId, ServicePillarSlug>> = {
  "ai-strategy": "strategy",
  "ai-systems": "systems",
  "ai-products": "products",
  "ai-creative": "creative",
};

/** One pillar page: its route and the pillar it renders. */
export type ServicePillar = {
  /** Public route slug, e.g. `"strategy"`. */
  slug: ServicePillarSlug;
  /** Full route, e.g. `"/services/strategy"`. Locale-independent. */
  href: string;
  /** The approved pillar's structure — index, diagram, surface. */
  service: Service;
};

/**
 * The four pillars in the approved order, each joined to its route.
 *
 * This is the only place the two lists meet, so a pillar page, the homepage
 * grid, `/services` and the footer all read the same object. The pillar's words
 * are looked up per locale from `Services.pillars.<id>` at render time.
 */
export const servicePillars: readonly ServicePillar[] = services.map((service) => ({
  slug: SLUG_BY_ID[service.id],
  href: `/services/${SLUG_BY_ID[service.id]}`,
  service,
}));

/** Route lookup for `app/[locale]/services/[slug]`. `undefined` for an unknown slug. */
export const pillarBySlug: ReadonlyMap<string, ServicePillar> = new Map(
  servicePillars.map((pillar) => [pillar.slug, pillar]),
);

/**
 * Footer list.
 *
 * Previously these all pointed at `/services`, because the four routes did not
 * exist and inventing them was out of scope. They exist now, so each entry
 * points at its own pillar — which is what the source's route map asks for.
 */
export const servicePillarLinks: readonly ServiceItem[] = servicePillars.map((pillar) => ({
  id: pillar.service.id,
  href: pillar.href,
}));
