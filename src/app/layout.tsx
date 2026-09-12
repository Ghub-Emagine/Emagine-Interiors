import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import StickyMobileCta from "@/components/layout/StickyMobileCta";
import AnalyticsScripts from "@/components/layout/AnalyticsScripts";
import { getSiteSettings, brandFromSettings } from "@/lib/site-settings";
import { localBusinessJsonLd } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);
  return {
    title: `${brand.name} | Full-Home & Modular Interiors, Chennai`,
    description: brand.tagline,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const brand = brandFromSettings(settings);

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body
        className={`${inter.className} flex flex-col min-h-screen pt-[5.5rem] md:pt-24 pb-20 md:pb-0 font-sans`}
        suppressHydrationWarning
      >
        <AnalyticsScripts />
        <JsonLd data={localBusinessJsonLd(settings)} />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer brand={brand} />
        <StickyMobileCta whatsapp={brand.contact.whatsapp} />
        <WhatsAppFloat whatsapp={brand.contact.whatsapp} />
      </body>
    </html>
  );
}
