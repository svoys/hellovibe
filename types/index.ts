/**
 * Shared vocabulary for the HelloVibe foundation.
 * Component-specific prop types stay next to their components.
 */

/** A single navigation entry. */
export type NavItem = {
  /** Visible link text. */
  label: string;
  /** Target route. */
  href: string;
};

/** An entry in the service list (footer, and later the services section). */
export type ServiceItem = NavItem;

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
