"use client";

import { useCallback, useSyncExternalStore } from "react";

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
