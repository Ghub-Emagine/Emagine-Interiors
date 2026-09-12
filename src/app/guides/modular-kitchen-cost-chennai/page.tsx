import type { Metadata } from "next";
import GuideArticle, { GuideList, GuideSection } from "../GuideArticle";
import { getPillar } from "../pillars";

const pillar = getPillar("modular-kitchen-cost-chennai")!;

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
};

export default function ModularKitchenCostPage() {
  return (
    <GuideArticle
      pillar={pillar}
      ctaHeadline="Get a kitchen budget against your plan"
      ctaBody="Upload your builder floor plan. We’ll flag wet-area constraints and WhatsApp a modular kitchen cost band for your Chennai flat."
    >
      <GuideSection title="What “modular kitchen cost” usually means in Chennai">
        <p>
          Most Chennai quotes are framed as ₹/sqft of shutter area (or carcass
          + shutter), not a single lump sum. A 2 BHK L-shaped kitchen often
          lands in a different band than a 3 BHK parallel layout with tall
          storage—even at the same finish grade.
        </p>
        <p>
          Treat published Essential / Executive / Luxury ₹/sqft bands as
          guidance. Site conditions, shutter material, hardware brand, and
          whether the hob–sink run fights your cooking habit all move the
          number.
        </p>
      </GuideSection>

      <GuideSection title="Cost drivers that change the quote">
        <GuideList
          items={[
            "Carcass: branded BWP ply vs cheaper cores—moisture in Chennai coastal flats rewards BWP.",
            "Shutters: laminate vs acrylic vs veneer; soft-close and handle-less profiles add cost.",
            "Hardware: hinges, channels, and tall-unit mechanisms—named brands vs generic.",
            "Countertop & sink: granite/quartz thickness, under-mount vs top-mount, RO space.",
            "Appliances cut-outs: hob, chimney, built-in oven, dishwasher clearances.",
            "Services: plumbing reroutes, electrical for chimney and under-cabinet lights.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Typical Chennai flat layouts">
        <p>
          Casagrand, Appaswamy, Akshaya, and similar plans often push the wet
          area into a compact corner. That means less continuous counter, more
          tall units, and careful chimney placement so you don’t cook under a
          beam or block a window.
        </p>
        <p>
          Parallel kitchens need aisle clearance for two people; U-shaped plans
          need corner hardware that actually works; island talk is rare in
          mid-size Chennai flats unless the living–dining opens up.
        </p>
      </GuideSection>

      <GuideSection title="How to read a quote without getting lost">
        <GuideList
          items={[
            "Ask what sqft is measured—shutter face only, or carcass + top + accessories.",
            "Confirm inclusions: sink, hob cut-out, chimney civil, soft-close, loft.",
            "Separate furniture ₹ from civil/MEP—plumbing and electrical often sit outside the modular line.",
            "Match finish grade to how you cook daily, not to a showroom mood board.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Before you lock a kitchen vendor">
        <p>
          Get a layout review of the builder plan first. Fixing dead corners,
          fridge swing, and wash area access on paper is cheaper than changing
          carcass after site cutting starts.
        </p>
      </GuideSection>
    </GuideArticle>
  );
}
