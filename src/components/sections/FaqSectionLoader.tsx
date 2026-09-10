import { getPageImageMap, getSiteContent } from "@/lib/cms";
import { pageImage } from "@/lib/page-image-slots";
import FaqSection from "./FaqSection";

export default async function FaqSectionLoader() {
  const [items, images] = await Promise.all([
    getSiteContent("faq"),
    getPageImageMap(),
  ]);
  return (
    <FaqSection items={items} sideImage={pageImage(images, "home_faq_side")} />
  );
}
