import { getPageImageMap, getSiteContent } from "@/lib/cms";
import { pageMedia } from "@/lib/page-image-slots";
import { faqJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import FaqSection from "./FaqSection";

export default async function FaqSectionLoader() {
  const [items, images] = await Promise.all([
    getSiteContent("faq"),
    getPageImageMap(),
  ]);
  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      <FaqSection items={items} sideMedia={pageMedia(images, "home_faq_side")} />
    </>
  );
}
