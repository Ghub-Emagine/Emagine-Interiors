import type { Metadata } from "next";
import GuideArticle, { GuideList, GuideSection } from "../GuideArticle";
import { getPillar } from "../pillars";

const pillar = getPillar("wardrobe-size-guide-2-3-bhk")!;

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
};

export default function WardrobeSizeGuidePage() {
  return (
    <GuideArticle
      pillar={pillar}
      ctaHeadline="Size wardrobes to your bedroom plan"
      ctaBody="Share your flat’s floor plan. We’ll suggest wardrobe runs and sliding vs hinged choices that fit real Chennai bedroom widths."
    >
      <GuideSection title="How much wardrobe do 2 & 3 BHKs need?">
        <p>
          For most Chennai 2 BHKs, plan a continuous run in the primary bedroom
          plus a shorter run or loft strategy in the second. A 3 BHK usually
          needs clear primary storage, a usable second bedroom wardrobe, and
          honest third-bedroom use—guest, WFH, or kids—not three identical full
          walls if the rooms can’t take it.
        </p>
        <p>
          Count linear feet of hanging + shelves, not just “full wall.” A 7–8 ft
          well-planned unit often beats a 10 ft shallow one with wasted depth.
        </p>
      </GuideSection>

      <GuideSection title="Depth, height, and clearances">
        <GuideList
          items={[
            "Hanging depth: roughly 550–600 mm internal is the comfort band for shirts/sarees.",
            "Sliding systems need track depth and handle clearance—measure door swings opposite.",
            "Hinged doors need aisle space; don’t place the bed where doors can’t open fully.",
            "Floor-to-beam height caps loft usefulness; Chennai flats often have duct drops.",
            "Leave breathing room at AC and window—don’t seal the only light source.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Sliding vs hinged in tight bedrooms">
        <p>
          Sliding helps when the bed sits close to the wardrobe wall. Hinged is
          simpler and often cheaper when you have clear swing space and want
          full-width access without overlapping shutters.
        </p>
        <p>
          Mixed elevations work well: hinged on a short return, sliding on the
          long run. Match hardware grade to daily use—kids’ rooms punish weak
          channels.
        </p>
      </GuideSection>

      <GuideSection title="Internal planning that actually gets used">
        <GuideList
          items={[
            "Long hanging for kurtas/sarees; short hanging + shelves for folded stacks.",
            "Dedicated linen and suitcase zones so guest bedding doesn’t invade daily drawers.",
            "Jewellery/watch drawers at standing height—not floor-level afterthoughts.",
            "Loft for seasonal bags only if access is safe; don’t store weekly wear up there.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Plan before ply">
        <p>
          Wardrobe size is a floor-plan decision. Confirm bed position, door
          swings, and window light on the builder PDF before you approve a 3D
          elevation—especially in compact Appaswamy and similar bedroom stacks.
        </p>
      </GuideSection>
    </GuideArticle>
  );
}
