import { getSiteContent } from "@/lib/cms";
import OfferingsSection from "./OfferingsSection";

export default async function OfferingsSectionLoader() {
  const items = await getSiteContent("offering");
  return <OfferingsSection items={items} />;
}
