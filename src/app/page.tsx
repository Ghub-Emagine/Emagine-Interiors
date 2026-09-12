import HeroSectionLoader from "@/components/sections/HeroSectionLoader";
import TrustMarqueeLoader from "@/components/sections/TrustMarqueeLoader";
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
import { getPageImageMap, getPageCopyMap } from "@/lib/cms";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";

export default async function Home() {
  const [images, copy, settings] = await Promise.all([
    getPageImageMap(),
    getPageCopyMap(),
    getSiteSettings(),
  ]);
  const brand = brandFromSettings(settings);
  const showMarquee = settings.trust_marquee_enabled === "true";
  const showPromise = settings.promise_strip_enabled === "true";

  return (
    <>
      <HeroSectionLoader />
      {showMarquee ? <TrustMarqueeLoader /> : null}
      {showPromise ? <PromiseStripLoader /> : null}
      <PortfolioSection />
      <RoomDesignsSectionLoader />
      <ServicesSection images={images} copy={copy} />
      <SolutionsCatalogSectionLoader />
      <ProcessProofSection images={images} copy={copy} />
      <MaterialSection copy={copy} />
      <TestimonialsSection />
      <PricingToolSectionLoader />
      <FaqSectionLoader />
      <EvaluationFormSection
        whatsapp={brand.contact.whatsapp}
        copy={copy}
        images={images}
      />
      <ClosingCtaSection />
    </>
  );
}
