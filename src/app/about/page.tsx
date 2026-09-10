import AboutContent from "./AboutContent";
import { getPageImageMap } from "@/lib/cms";

export const metadata = {
  title: "About | Emagine Design Studio",
  description:
    "Emagine Design Studio — Chennai full-home and modular interiors, planned from your builder layout. Clarity, transparent ₹/sqft, no experience-centre detour.",
};

export default async function AboutPage() {
  const images = await getPageImageMap();
  return <AboutContent images={images} />;
}
