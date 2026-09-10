import HeroSectionLoader from "@/components/sections/HeroSectionLoader";
import PromiseStripLoader from "@/components/sections/PromiseStripLoader";
import PortfolioSection from "@/components/sections/PortfolioSection";
import RoomDesignsSectionLoader from "@/components/sections/RoomDesignsSectionLoader";
import ServicesSection from "@/components/sections/ServicesSection";
import SolutionsCatalogSectionLoader from "@/components/sections/SolutionsCatalogSectionLoader";
import ProcessProofSection from "@/components/sections/ProcessProofSection";
import MaterialSection from "@/components/sections/MaterialSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingToolSectionLoader from "@/components/sections/PricingToolSectionLoader";
import FaqSectionLoader from "@/components/sections/FaqSectionLoader";
import EvaluationFormSection from "@/components/sections/EvaluationFormSection";
import ClosingCtaSection from "@/components/sections/ClosingCtaSection";
import { getPageImageMap } from "@/lib/cms";

export default async function Home() {
  const images = await getPageImageMap();

  return (
    <>
      <HeroSectionLoader />
      <PromiseStripLoader />
      <PortfolioSection />
      <RoomDesignsSectionLoader />
      <ServicesSection images={images} />
      <SolutionsCatalogSectionLoader />
      <ProcessProofSection images={images} />
      <MaterialSection />
      <TestimonialsSection />
      <PricingToolSectionLoader />
      <FaqSectionLoader />
      <EvaluationFormSection />
      <ClosingCtaSection />
    </>
  );
}
