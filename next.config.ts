import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

/**
 * Deliberately almost empty, and `experimental.globalNotFound` is deliberately
 * **not** set here. Both facts are the result of measurement, not taste.
 *
 * ## Why there is no `globalNotFound`
 *
 * `app/global-not-found.tsx` was written for this project and then removed,
 * because enabling it breaks the whole site rather than the 404. Two
 * independent faults, both verified against the installed 16.3.7:
 *
 * **1. The flag does not reach Turbopack.** `isGlobalNotFoundEnabled` is passed
 * to the app loader from exactly two places — `build/entries.js:373` and
 * `server/dev/hot-reloader-webpack.js` — and `createEntrypoints`, which sets it,
 * is called only by `build/webpack-build/impl.js` and the webpack dev reloader.
 * Neither `build/turbopack-build/impl.js` nor
 * `server/dev/hot-reloader-turbopack.js` calls it. Next 16 uses Turbopack for
 * dev *and* build by default, so the loader never sees the option and never
 * registers the file. The dev server nevertheless selects the file for the
 * `/_not-found` route (`server/dev/on-demand-entry-handler.js:295` reads the
 * config directly), so the two halves of the framework disagree about what the
 * 404 even is.
 *
 * **2. A root-level 404 cannot compile against next-intl.** Compiling
 * `app/global-not-found.tsx` fails with:
 *
 * ```text
 * The export locale was not found in module [next]/root-params.js [app-rsc]
 * The module has no exports at all.
 * Import traces:
 *   #1 ./i18n/request.ts ← … ← ./app/[locale]/layout.tsx
 *   #2 ./i18n/request.ts ← … ← ./app/global-not-found.tsx
 * ```
 *
 * `next/root-params` exposes `locale` only to modules *below* the `[locale]`
 * segment. `app/global-not-found.tsx` sits above it, so in that compilation the
 * virtual module is empty and `i18n/request.ts` — which every next-intl helper
 * routes through — cannot resolve `rootParams.locale()`. The failure is not
 * confined to the 404: Turbopack keeps the broken module in the graph and the
 * app starts answering 500 to every page.
 *
 * This is the reason the branded 404 does not exist yet. `app/[locale]/not-found.tsx`
 * and the `[...rest]` catch-all are the working mechanism; they are scoped to
 * `[locale]`, where the locale is knowable and the compile is sound. Branding the
 * *unmatched-URL* 404 needs either `--webpack` (so the flag is passed) plus a
 * non-localised `global-not-found`, or a Next release that wires the convention
 * for Turbopack.
 */
const nextConfig: NextConfig = {};

/**
 * next-intl build integration.
 *
 * The plugin does one job: it makes the module specifier `next-intl/config`
 * resolve to this project's `i18n/request.ts`. That is how `useTranslations`,
 * `getTranslations` and the `NextIntlClientProvider` find the catalogue for the
 * current request without every component importing the config directly.
 *
 * The path is left implicit. The plugin looks for `./i18n/request.{ts,tsx,js,jsx}`
 * (or the same under `src/`) and fails the build with a clear message if it
 * cannot find one — so passing the path explicitly would only be a second place
 * to keep in sync with the first.
 */
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
