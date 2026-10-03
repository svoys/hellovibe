/**
 * Which abstract diagram a service card draws.
 *
 * Every diagram is built from CSS — borders, small shapes and type — never
 * raster imagery. See `components/home/ServiceVisual.tsx`.
 */
export type ServiceVisualKind = "strategy" | "systems" | "products" | "creative";

/** Surface treatment of a service card. Used sparingly so the grid has rhythm. */
export type ServiceSurface = "light" | "dark";

/** A single HelloVibe service pillar. */
export type Service = {
  /** Stable key. */
  id: string;
  /** Display index shown in the card's meta row. */
  number: string;
  /** One-word action label, rendered uppercase. */
  action: string;
  /** Service name — the card's heading. */
  title: string;
  /** Single-sentence description. */
  description: string;
  /** Abstract diagram rendered at the foot of the card. */
  visual: ServiceVisualKind;
  /** Card surface. */
  surface: ServiceSurface;
};

/**
 * The four pillars, exactly as approved in the AI Gap + Services Pack v0.1 §11.
 *
 * The copy is fixed — do not reword, reorder or extend this list.
 */
export const services: Service[] = [
  {
    id: "ai-strategy",
    number: "01",
    action: "Find",
    title: "AI Strategy",
    description: "Find where AI can actually move the needle.",
    visual: "strategy",
    surface: "light",
  },
  {
    id: "ai-systems",
    number: "02",
    action: "Automate",
    title: "AI Systems",
    description: "Automate the work that shouldn’t be manual anymore.",
    visual: "systems",
    surface: "light",
  },
  {
    id: "ai-products",
    number: "03",
    action: "Build",
    title: "AI Products",
    description: "Turn ambitious ideas into products people can use.",
    visual: "products",
    surface: "dark",
  },
  {
    id: "ai-creative",
    number: "04",
    action: "Amplify",
    title: "AI Creative",
    description: "Build a creative engine that never runs out of ideas.",
    visual: "creative",
    surface: "light",
  },
];
