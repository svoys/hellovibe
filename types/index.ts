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

/** Visual treatments available on {@link import("@/components/ui/Button").Button}. */
export type ButtonVariant = "primary" | "secondary";

/** Visual treatments available on {@link import("@/components/ui/Tag").Tag}. */
export type TagVariant = "default" | "vibe" | "orange";
