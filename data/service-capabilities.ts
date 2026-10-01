import type { Service } from "@/data/services";

/**
 * What each pillar actually contains.
 *
 * Verbatim from the brand rules' "Core services" section — the same passage
 * that defines the four pillars. Nothing here is written for this page.
 *
 * This lives in its own module rather than on `Service` because `data/services.ts`
 * is frozen ("do not reword, reorder or extend this list") and the homepage grid
 * does not need these lists. The join back to the pillars is by `id`; a typo
 * would silently render an empty list, so the browser harness asserts every
 * capability string is present on `/services`.
 */
export type ServiceCapabilities = {
  /** Must match a `Service["id"]`. */
  id: Service["id"];
  /** The pillar's contents, in the order the brand rules list them. */
  capabilities: readonly string[];
};

export const serviceCapabilities: readonly ServiceCapabilities[] = [
  {
    id: "ai-strategy",
    capabilities: [
      "AI audit",
      "opportunity mapping",
      "automation opportunities",
      "priority use cases",
      "ROI hypotheses",
      "implementation roadmap",
    ],
  },
  {
    id: "ai-systems",
    capabilities: [
      "AI agents",
      "workflows",
      "integrations",
      "RAG",
      "CRM automation",
      "sales systems",
      "support systems",
      "document intelligence",
      "internal tools",
    ],
  },
  {
    id: "ai-products",
    capabilities: [
      "discovery",
      "UX/UI",
      "prototype",
      "MWP",
      "MVP",
      "engineering",
      "launch",
      "product development",
    ],
  },
  {
    id: "ai-creative",
    capabilities: [
      "creative strategy",
      "AI content systems",
      "image generation",
      "video generation",
      "campaigns",
      "always-on content operations",
    ],
  },
];

/** Look-up by pillar id. Returns `undefined` if the two lists ever drift apart. */
export const capabilitiesById = new Map(
  serviceCapabilities.map((entry) => [entry.id, entry.capabilities]),
);
