/**
 * Shared vocabulary for the HelloVibe foundation.
 * Component-specific prop types stay next to their components.
 */

/**
 * Keys into the `Nav.items` message namespace.
 *
 * Navigation labels used to be literal strings on the entries themselves. They
 * are keys now because the label is the one part of a nav entry that changes
 * with the language — the route does not. Keeping the two in one object would
 * mean either duplicating the route list per locale or re-translating a `href`.
 */
export type NavItemKey = "whatWeDo" | "howWeWork" | "cases" | "about";

/** A single navigation entry. */
export type NavItem = {
  /**
   * Which `Nav.items` message names this entry.
   *
   * A key rather than a label: `data/` owns the site's structure, `messages/`
   * owns its words, and this is the join between them.
   */
  key: NavItemKey;
  /** Target route. Locale-independent — the locale-aware `Link` adds any prefix. */
  href: string;
};

/** An entry in the service list (the footer). */
export type ServiceItem = {
  /** Must match a `Service["id"]`, and so a key under `Services.pillars`. */
  id: string;
  /** Target route. */
  href: string;
};

/**
 * Visual treatments available on {@link import("@/components/ui/Button").Button}.
 *
 * `inverse` exists for the dark sections (Product Studio and the blocks after
 * it). It is not a new look — it is the same button read against near-black, so
 * the dark sections do not have to fork their own button.
 *
 * `accent` exists for the accent sections (Creative Engine). It looks identical
 * to `primary` at rest and exists purely for its hover state: `primary` hovers
 * to `--color-vibe`, which is the colour of the accent field itself, so the
 * button would vanish under the cursor there.
 */
export type ButtonVariant = "primary" | "secondary" | "inverse" | "accent";

/** Visual treatments available on {@link import("@/components/ui/Tag").Tag}. */
export type TagVariant = "default" | "vibe" | "orange";
