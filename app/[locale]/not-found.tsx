import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * The 404 boundary, for routes that call `notFound()`.
 *
 * Renders inside `app/[locale]/layout.tsx`, so the navbar and footer are there
 * and the reader is one click from anywhere. The route list is the whole point:
 * before this page existed, a mistyped URL dropped the visitor on Next's bare
 * default 404 with no way back into the site.
 *
 * The body lives in `NotFoundContent` because `app/global-not-found.tsx` renders
 * the same page — see that file for why there have to be two entry points.
 *
 * No `border-t`: the navbar already draws the rule above the first block.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.NotFound");

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    robots: { index: false, follow: false },
  };
}

export default function NotFound() {
  return <NotFoundContent />;
}
