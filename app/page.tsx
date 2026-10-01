import { AIGap } from "@/components/home/AIGap";
import { Hero } from "@/components/home/Hero";
import { ProductJourney } from "@/components/home/ProductJourney";
import { Services } from "@/components/home/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AIGap />
      <Services />
      <ProductJourney />
    </>
  );
}
