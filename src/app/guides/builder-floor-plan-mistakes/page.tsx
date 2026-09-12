import type { Metadata } from "next";
import GuideArticle, { GuideList, GuideSection } from "../GuideArticle";
import { getPillar } from "../pillars";

const pillar = getPillar("builder-floor-plan-mistakes")!;

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
};

export default function BuilderFloorPlanMistakesPage() {
  return (
    <GuideArticle
      pillar={pillar}
      ctaHeadline="Catch plan issues before modular starts"
      ctaBody="Send your builder floor plan. We’ll WhatsApp the flow, light, and storage issues worth fixing on a Chennai flat layout."
    >
      <GuideSection title="Why builder plans need a second look">
        <p>
          Marketing floor plans for Chennai developments are drawn for sales,
          not for how you cook, store, or host. Casagrand, Appaswamy, Akshaya,
          and peer layouts can look generous on paper and feel tight once
          wardrobes, fridge swing, and dining chairs are in place.
        </p>
        <p>
          A free layout review exists to catch those conflicts before carcass is
          cut—not after the second site visit argument.
        </p>
      </GuideSection>

      <GuideSection title="Mistakes we see often">
        <GuideList
          items={[
            "Kitchen triangle broken: hob far from sink, fridge blocking the only aisle.",
            "Bedroom wardrobes on the wrong wall—door clash or no clear dressing space.",
            "Dining squeezed by column or beam drops; chairs never pull out cleanly.",
            "Balcony or utility doors swinging into the only work counter.",
            "Dead corridors that eat carpet but add no storage or light.",
            "TV wall chosen for symmetry, not for glare from west-facing glass.",
            "AC indoor unit fighting false-ceiling plans or wardrobe height.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Light and ventilation checks">
        <p>
          Chennai flats often stack bedrooms deep from the façade. If the only
          window sits behind a planned wardrobe run, you’ll choose between
          storage and daylight. Flag that on the plan—don’t discover it when
          ply arrives.
        </p>
        <p>
          Cross-ventilation assumptions from the brochure rarely survive
          neighbour towers and closed kitchen shutters. Plan chimney exhaust and
          wash-area drying with the real elevation, not the sales render.
        </p>
      </GuideSection>

      <GuideSection title="What to mark on your PDF before calling vendors">
        <GuideList
          items={[
            "North arrow / façade direction if you know it.",
            "Fridge, washing machine, and RO preferred spots.",
            "Must-keep builder furniture walls vs walls you can rework.",
            "Beam and duct locations if the site team has shared them.",
            "Who cooks daily and whether two people share the kitchen aisle.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Fix on paper first">
        <p>
          Moving a wardrobe wall on a drawing costs nothing. Moving it after
          flooring and electrical is expensive. Treat the builder plan as a
          starting brief—not a finished interiors layout.
        </p>
      </GuideSection>
    </GuideArticle>
  );
}
