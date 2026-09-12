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
import {
  brandFromSettings,
  getSiteSettings,
  isSectionEnabled,
} from "@/lib/site-settings";

export default async function Home() {
  const [images, copy, settings] = await Promise.all([
    getPageImageMap(),
    getPageCopyMap(),
    getSiteSettings(),
  ]);
  const brand = brandFromSettings(settings);
  const on = (key: Parameters<typeof isSectionEnabled>[1]) =>
    isSectionEnabled(settings, key);

  return (
    <>
      {on("hero_enabled") ? <HeroSectionLoader /> : null}
      {on("trust_marquee_enabled") ? <TrustMarqueeLoader /> : null}
      {on("promise_strip_enabled") ? <PromiseStripLoader /> : null}
      {on("portfolio_enabled") ? <PortfolioSection /> : null}
      {on("room_designs_enabled") ? <RoomDesignsSectionLoader /> : null}
      {on("services_enabled") ? (
        <ServicesSection images={images} copy={copy} />
      ) : null}
      {on("solutions_enabled") ? <SolutionsCatalogSectionLoader /> : null}
      {on("process_enabled") ? (
        <ProcessProofSection images={images} copy={copy} />
      ) : null}
      {on("material_enabled") ? <MaterialSection copy={copy} /> : null}
      {on("testimonials_enabled") ? <TestimonialsSection /> : null}
      {on("pricing_enabled") ? <PricingToolSectionLoader /> : null}
      {on("faq_enabled") ? <FaqSectionLoader /> : null}
      {on("evaluation_enabled") ? (
        <EvaluationFormSection
          whatsapp={brand.contact.whatsapp}
          copy={copy}
          images={images}
        />
      ) : null}
      {on("closing_cta_enabled") ? <ClosingCtaSection /> : null}
    </>
  );
}
