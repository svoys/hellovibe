import { capabilitiesById } from "@/data/service-capabilities";
import { services, type Service } from "@/data/services";
import type { ServiceItem } from "@/types";

/**
 * The four public pillar routes, exactly as the source's route map fixes them
 * (`§05 Route map` → "Main routes"):
 *
 *   /services/strategy   /services/systems   /services/products   /services/creative
 *
 * They deliberately do **not** match `Service["id"]` (`ai-strategy`, …). The id
 * is an internal key that also joins the capability list; the slug is a public
 * route, and the source decides the routes. Keeping the mapping here instead of
 * adding a `slug` field to `data/services.ts` is the same call
 * `service-capabilities.ts` made: that module is frozen ("do not reword, reorder
 * or extend this list") and the homepage grid has no use for a route.
 */
export const SERVICE_PILLAR_SLUGS = ["strategy", "systems", "products", "creative"] as const;

export type ServicePillarSlug = (typeof SERVICE_PILLAR_SLUGS)[number];

const SLUG_BY_ID: Readonly<Record<string, ServicePillarSlug>> = {
  "ai-strategy": "strategy",
  "ai-systems": "systems",
  "ai-products": "products",
  "ai-creative": "creative",
};

/*
 * Fail loudly instead of shipping a dead route. `Service["id"]` is a plain
 * `string`, so the compiler cannot notice a fifth pillar arriving without a
 * slug — without this guard it would render as `/services/undefined`, which is
 * a 404 nobody would trace back to here. Throwing at module scope turns that
 * into a build error.
 */
for (const service of services) {
  if (!(service.id in SLUG_BY_ID)) {
    throw new Error(`data/service-pillars.ts: no route slug for service "${service.id}".`);
  }
}

/** One pillar page: its route, the pillar itself, and its contents. */
export type ServicePillar = {
  /** Public route slug, e.g. `"strategy"`. */
  slug: ServicePillarSlug;
  /** Full route, e.g. `"/services/strategy"`. */
  href: string;
  /** The approved pillar — label, action word, description, diagram surface. */
  service: Service;
  /** The pillar's contents, from the brand rules' "Core services" section. */
  includes: readonly string[];
};

/**
 * The four pillars in the approved order, each joined to its route and its
 * contents. This is the only place the three lists meet, so a pillar page, the
 * homepage grid, `/services` and the footer all read the same object.
 */
export const servicePillars: readonly ServicePillar[] = services.map((service) => {
  const slug = SLUG_BY_ID[service.id];
  return {
    slug,
    href: `/services/${slug}`,
    service,
    includes: capabilitiesById.get(service.id) ?? [],
  };
});

/** Route lookup for `app/services/[slug]`. `undefined` for an unknown slug. */
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
export const servicePillarLinks: ServiceItem[] = servicePillars.map((pillar) => ({
  label: pillar.service.title,
  href: pillar.href,
}));
