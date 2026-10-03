import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware replacements for `next/link` and `next/navigation`.
 *
 * Every internal link on the site has to go through these rather than through
 * `next/link` directly, because `next/link` does not know that `/services` and
 * `/en/services` are the same page. `Link` from here resolves the `href` against
 * the *current* locale, so a reader on `/en/about` clicking "What we do" lands
 * on `/en/services` and not on the Russian `/services`. Hand-writing the prefix
 * at every call site is the alternative, and it is exactly the kind of thing
 * that silently breaks on one of thirty-nine components.
 *
 * `usePathname` is likewise re-exported: the version in `next/navigation`
 * returns the full path *including* the locale prefix, so `pathname === "/about"`
 * would be false on `/en/about` and the navbar's active state would break in
 * English. This one returns the path without the prefix, which is what the
 * active-state comparisons are written against.
 *
 * `redirect` is the server-side counterpart, used by the locale switcher's
 * fallback path and by anything that needs to move a reader to another locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
