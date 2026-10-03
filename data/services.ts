/**
 * Which abstract diagram a service card draws.
 *
 * Every diagram is built from CSS — borders, small shapes and type — never
 * raster imagery. See `components/home/ServiceVisual.tsx`.
 */
export type ServiceVisualKind = "strategy" | "systems" | "products" | "creative";

/** Surface treatment of a service card. Used sparingly so the grid has rhythm. */
export type ServiceSurface = "light" | "dark";

/** Stable pillar key. Also the key under `Services.pillars` in the message catalogues. */
export type ServiceId = "ai-strategy" | "ai-systems" | "ai-products" | "ai-creative";

/** A single HelloVibe service pillar. */
export type Service = {
  /** Stable key. Joins the pillar's copy, its capabilities and its route slug. */
  id: ServiceId;
  /** Display index shown in the card's meta row. Language-independent. */
  number: string;
  /** Abstract diagram rendered at the foot of the card. */
  visual: ServiceVisualKind;
  /** Card surface. */
  surface: ServiceSurface;
};

/**
 * The four pillars, exactly as approved in the AI Gap + Services Pack v0.1 §11.
 *
 * The copy is fixed — do not reword, reorder or extend this list.
 *
 * Only the *structure* of each pillar is here. The action word, the name and the
 * one-sentence description are all user-visible and therefore live in
 * `messages/<locale>.json` under `Services.pillars.<id>`, as do the pillar's
 * contents under `Services.capabilities.<id>`. This module keeps what does not
 * change with the language: the order, the index, the diagram and the surface.
 *
 * The join between the two halves is `id`. A typo on either side would render an
 * empty card rather than fail, so the browser harness asserts that all four
 * pillars have a title, an action and a description in both locales.
 */
export const services: readonly Service[] = [
  { id: "ai-strategy", number: "01", visual: "strategy", surface: "light" },
  { id: "ai-systems", number: "02", visual: "systems", surface: "light" },
  { id: "ai-products", number: "03", visual: "products", surface: "dark" },
  { id: "ai-creative", number: "04", visual: "creative", surface: "light" },
];
