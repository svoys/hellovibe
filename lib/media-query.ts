"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * `prefers-reduced-motion: reduce`.
 *
 * Prefer this over Motion's `useReducedMotion()` in any component whose output
 * depends on the preference. Motion resolves it at module load, so on a
 * reduced-motion client it already reports `true` on the very first render while
 * the server rendered `false` — a hydration failure, because the server has no
 * media query to consult. `useMediaQuery` reports `false` from
 * `getServerSnapshot` during SSR *and* during hydration, then re-renders with
 * the real value, so the two always agree.
 *
 * See `docs/product-journey/…` and the memory note for the failure this caused.
 */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Subscribe to a CSS media query from React.
 *
 * `getServerSnapshot` reports `false`, so the server and the hydration pass
 * agree on the wide layout; React then re-renders with the real value. Using
 * `useSyncExternalStore` (rather than `useState` + `useEffect`) keeps this out
 * of the `react-hooks/set-state-in-effect` rule and avoids a hydration warning.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
