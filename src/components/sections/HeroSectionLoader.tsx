import { getPublishedHeroSlides, getPageCopyMap } from "@/lib/cms";
import HeroSection from "./HeroSection";

export default async function HeroSectionLoader() {
  const [slides, copy] = await Promise.all([
    getPublishedHeroSlides(),
    getPageCopyMap(),
  ]);
  return <HeroSection slides={slides} copy={copy} />;
}
