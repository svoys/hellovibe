import { AIAudit } from "@/components/home/AIAudit";
import { AIGap } from "@/components/home/AIGap";
import { Cases } from "@/components/home/Cases";
import { CreativeEngine } from "@/components/home/CreativeEngine";
import { EngagementModels } from "@/components/home/EngagementModels";
import { FAQ } from "@/components/home/FAQ";
import { Hero } from "@/components/home/Hero";
import { Method } from "@/components/home/Method";
import { ProductJourney } from "@/components/home/ProductJourney";
import { ProductStudio } from "@/components/home/ProductStudio";
import { Services } from "@/components/home/Services";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyHelloVibe } from "@/components/home/WhyHelloVibe";

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
    </>
  );
}
