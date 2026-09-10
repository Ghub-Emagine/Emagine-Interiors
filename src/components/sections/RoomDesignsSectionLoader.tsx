import { getRoomDesignGalleries } from "@/lib/cms";
import RoomDesignsSection from "./RoomDesignsSection";

export default async function RoomDesignsSectionLoader() {
  const galleries = await getRoomDesignGalleries();
  return <RoomDesignsSection galleries={galleries} />;
}
