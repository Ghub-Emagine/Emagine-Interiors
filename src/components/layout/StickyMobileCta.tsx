"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackContactClick } from "@/lib/track-conversion";

/** Mobile sticky bar — drives traffic to free layout form */
export default function StickyMobileCta({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  if (pathname === "/layout-review") return null;

  const wa = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi Emagine - I'd like a free layout review for my Chennai flat.",
  )}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[55] md:hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <Link
        href="/#apply"
        className="flex-1 text-center bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-3 py-3 text-[11px] uppercase tracking-widest font-semibold"
        onClick={() => trackContactClick("form_cta")}
      >
        Free layout review
      </Link>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("whatsapp")}
        className="flex-1 text-center border border-[#25D366] text-[#128C7E] bg-[#25D366]/10 px-3 py-3 text-[11px] uppercase tracking-widest font-semibold"
      >
        WhatsApp
      </a>
    </div>
  );
}
