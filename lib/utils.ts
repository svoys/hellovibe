/** Values accepted by {@link cn}. */
export type ClassValue = string | number | false | null | undefined;

/**
 * Joins truthy class name values into a single space-separated string.
 *
 * Deliberately tiny: the foundation only needs class composition, not a full
 * class-merge library.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
