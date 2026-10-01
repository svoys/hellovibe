import { AIGap } from "@/components/home/AIGap";
import { Hero } from "@/components/home/Hero";
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
    </>
  );
}
