import { getSiteContent } from "@/lib/cms";
import SolutionsCatalogSection from "./SolutionsCatalogSection";

export default async function SolutionsCatalogSectionLoader() {
  const items = await getSiteContent("solution");
  return <SolutionsCatalogSection items={items} />;
}
