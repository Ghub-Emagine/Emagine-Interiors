import WhyUsContent from "./WhyUsContent";
import { getPageImageMap } from "@/lib/cms";

export const metadata = {
  title: "Why Emagine | Emagine Design Studio",
  description:
    "Why choose Emagine Design Studio for Chennai flat interiors—layout-first planning, clear ₹/sqft, one studio from plan to finish.",
};

export default async function WhyUsPage() {
  const images = await getPageImageMap();
  return <WhyUsContent images={images} />;
}
