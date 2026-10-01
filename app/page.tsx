import { AIAudit } from "@/components/home/AIAudit";
import { AIGap } from "@/components/home/AIGap";
import { Cases } from "@/components/home/Cases";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ProductJourney } from "@/components/home/ProductJourney";
import { Services } from "@/components/home/Services";
import { TrustStrip } from "@/components/home/TrustStrip";

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
    </>
  );
}
