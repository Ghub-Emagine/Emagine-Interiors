import { getPublishedHeroSlides } from "@/lib/cms";
import HeroSection from "./HeroSection";

export default async function HeroSectionLoader() {
  const slides = await getPublishedHeroSlides();
  return <HeroSection slides={slides} />;
}
