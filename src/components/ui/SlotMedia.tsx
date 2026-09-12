"use client";

import { useRef } from "react";
import { trackVideoPlay } from "@/lib/track-conversion";

/** Full-bleed image or muted looping video for CMS page slots */
export default function SlotMedia({
  url,
  mediaType = "image",
  alt = "",
  className = "",
  imgClassName,
}: {
  url: string;
  mediaType?: "image" | "video";
  alt?: string;
  className?: string;
  /** Applied to img/video inside absolute fill wrappers */
  imgClassName?: string;
}) {
  const mediaClass = imgClassName ?? className;
  const playTracked = useRef(false);

  if (mediaType === "video") {
    return (
      <video
        src={url}
        className={mediaClass}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt || "Video"}
        onPlay={() => {
          if (playTracked.current) return;
          playTracked.current = true;
          trackVideoPlay({ label: alt || url });
        }}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className={mediaClass} />;
}
