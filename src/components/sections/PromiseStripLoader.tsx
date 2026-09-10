import { getSiteContent } from "@/lib/cms";
import PromiseStrip from "./PromiseStrip";

export default async function PromiseStripLoader() {
  const items = await getSiteContent("promise");
  return <PromiseStrip items={items} />;
}
