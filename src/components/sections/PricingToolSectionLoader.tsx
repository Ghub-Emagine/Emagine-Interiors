import { getSiteContent } from "@/lib/cms";
import { tiersFromContent } from "@/lib/pricing";
import PricingToolSection from "./PricingToolSection";

export default async function PricingToolSectionLoader() {
  const items = await getSiteContent("pricing");
  return <PricingToolSection tiers={tiersFromContent(items)} />;
}
