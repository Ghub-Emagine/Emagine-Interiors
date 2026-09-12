import { getSiteContent } from "@/lib/cms";
import TrustMarquee from "./TrustMarquee";

export default async function TrustMarqueeLoader() {
  const items = await getSiteContent("marquee");
  return <TrustMarquee items={items} />;
}
