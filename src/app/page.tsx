// src/app/page.tsx
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import MaterialSection from "@/components/sections/MaterialSection";
import PricingToolSection from "@/components/sections/PricingToolSection";
import EvaluationFormSection from "@/components/sections/EvaluationFormSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PortfolioSection />
      <MaterialSection />
      <PricingToolSection />
      <EvaluationFormSection />
    </>
  );
}