import type { Metadata } from "next";

import { AIAudit } from "@/components/home/AIAudit";
import { AIGap } from "@/components/home/AIGap";
import { Cases } from "@/components/home/Cases";
import { CreativeEngine } from "@/components/home/CreativeEngine";
import { EngagementModels } from "@/components/home/EngagementModels";
import { FAQ } from "@/components/home/FAQ";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ProductJourney } from "@/components/home/ProductJourney";
import { ProductStudio } from "@/components/home/ProductStudio";
import { Services } from "@/components/home/Services";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyHelloVibe } from "@/components/home/WhyHelloVibe";
import { alternatesFor } from "@/lib/seo";

/**
 * The homepage sets exactly one metadata field.
 *
 * The title and description are the layout's `Metadata` namespace, which is
 * right for this page — it *is* the site. What the layout deliberately does not
 * set is `alternates`, because the value is per route: `/` and `/en` are
 * alternates of each other, exactly as `/services` and `/en/services` are. So
 * each page names its own pair, and this is the homepage's.
 *
 * Returning only `alternates` is safe: Next merges the layout's metadata with
 * the page's field by field, so `metadataBase`, `openGraph` and `twitter` all
 * survive.
 *
 * `async` because `alternatesFor` reads the current locale itself — see its doc
 * comment for why that cannot be left to the call site.
 */
export async function generateMetadata(): Promise<Metadata> {
  return { alternates: await alternatesFor("/") };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AIGap />
      <Services />
      <ProductJourney />
      <AIAudit />
      <Cases />
      <Method />
      <ProductStudio />
      <CreativeEngine />
      <WhyHelloVibe />
      <EngagementModels />
      <FAQ />
      <FinalCta />
    </>
  );
}
