import type { Metadata } from "next";
import GuideArticle, { GuideList, GuideSection } from "../GuideArticle";
import { getPillar } from "../pillars";

const pillar = getPillar("full-home-interiors-cost-chennai")!;

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
};

export default function FullHomeInteriorsCostPage() {
  return (
    <GuideArticle
      pillar={pillar}
      ctaHeadline="Map a full-home budget to your flat"
      ctaBody="Share your builder plan and target lakhs band. We’ll reply on WhatsApp with what that budget typically covers in a Chennai 2 or 3 BHK."
    >
      <GuideSection title="Full-home vs modular-only">
        <p>
          Modular-only usually means kitchen and wardrobes. Full-home interiors
          for Chennai flats typically add living/dining storage, TV units, false
          ceiling, lighting design, bedroom soft finishes, and coordinated
          paint or wall treatments—one studio schedule instead of five vendors.
        </p>
        <p>
          Ads often ask in total lakhs. Internally, studios still price rooms and
          ₹/sqft grades. Knowing both helps you compare quotes without apples-to-
          oranges surprises.
        </p>
      </GuideSection>

      <GuideSection title="Where the money usually goes">
        <GuideList
          items={[
            "Kitchen + utility: highest ₹ density; wet-area detailing and appliances.",
            "Bedrooms: wardrobes dominate; study niches and lofts add run length.",
            "Living–dining: TV unit, display, shoe/storage—scale with flat size.",
            "False ceiling & lighting: cove, spots, and dining pendants; depends on height and AC.",
            "Doors & partitions: rare in open plans, but builder door upgrades add up.",
            "Civil touches: niche cutting, packing, and floor protection during site work.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Finish grades in practice">
        <p>
          Essential suits clean modular basics with solid BWP bodies. Executive
          is the common full-home band for Chennai flats that want 3D-approved
          detailing before site. Luxury pushes architectural materials and
          denser hardware—useful when the plan and lifestyle justify it, not as
          a default upgrade.
        </p>
      </GuideSection>

      <GuideSection title="Setting a lakhs band before possession">
        <GuideList
          items={[
            "Start from carpet area and must-have rooms—not Instagram room counts.",
            "Reserve contingency for electrical additions and site surprises.",
            "Decide kitchen + wardrobe scope first; living accents can phase later.",
            "Ask for inclusions in writing: soft-close, loft, false ceiling zones, lighting fixtures.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Chennai timing note">
        <p>
          Pre-possession windows are tight. Lock layout and budget band early so
          3D approval and material ordering don’t collide with handovers at
          Casagrand, Appaswamy, Akshaya, and similar sites.
        </p>
      </GuideSection>
    </GuideArticle>
  );
}
