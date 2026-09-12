import type { Metadata } from "next";
import GuideArticle, { GuideList, GuideSection } from "../GuideArticle";
import { getPillar } from "../pillars";

const pillar = getPillar("pre-possession-interiors-checklist")!;

export const metadata: Metadata = {
  title: pillar.title,
  description: pillar.description,
};

export default function PrePossessionChecklistPage() {
  return (
    <GuideArticle
      pillar={pillar}
      ctaHeadline="Start the checklist with a layout review"
      ctaBody="Before keys, send your builder plan. We’ll WhatsApp layout notes and a budget band so possession-week decisions stay calm."
    >
      <GuideSection title="Why pre-possession timing matters in Chennai">
        <p>
          Handover windows at Casagrand, Appaswamy, Akshaya, and peer sites
          compress design, material lead times, and civil access. Homeowners who
          wait for keys to “think about interiors” often rush modular decisions
          or live with temporary furniture longer than planned.
        </p>
        <p>
          Use the pre-possession months to lock layout, budget band, and
          electrical intent—even if site cutting starts after keys.
        </p>
      </GuideSection>

      <GuideSection title="Checklist: decisions before keys">
        <GuideList
          items={[
            "Get a layout review of the final builder plan (not an early brochure PDF).",
            "Set a total lakhs band and which rooms are phase 1 vs later.",
            "List kitchen appliances and utility machines with sizes.",
            "Decide wardrobe runs per bedroom—primary first.",
            "Note AC indoor positions and whether false ceiling will wrap them.",
            "Confirm paint / flooring scope: builder finish keep vs redo.",
            "Ask the association/builder about interior work hours and material lift rules.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Checklist: MEP & site readiness">
        <GuideList
          items={[
            "Extra points for hob, chimney, RO, washing machine, work desk, TV.",
            "Exhaust path for chimney—duct length and false-ceiling clash.",
            "Water inlet/outlet for utility; check drainage slope assumptions.",
            "Internet / TV conduit if you care about clean living walls.",
            "Photograph beams, shafts, and packing spaces on your first site walk.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Checklist: vendor & paperwork">
        <GuideList
          items={[
            "One studio vs split kitchen/wardrobe vendors—know who owns the schedule.",
            "Written inclusions: soft-close, loft, sink, lighting fixtures, debris removal.",
            "3D approval gate before site cutting—no vague “we’ll adjust on site.”",
            "Payment milestones tied to design lock, material dispatch, and installation.",
            "Warranty terms on hardware and carcass in coastal Chennai humidity.",
          ]}
        />
      </GuideSection>

      <GuideSection title="Week-of-possession focus">
        <p>
          Keep the week of keys for snags, metering, and access—not for first-
          principles layout debates. If the plan review and budget band are
          already done, modular drawings can move while you sort society
          formalities.
        </p>
      </GuideSection>
    </GuideArticle>
  );
}
