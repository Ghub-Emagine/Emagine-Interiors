import ContentItemForm from "../ContentItemForm";
import type { SiteContentSection } from "@/lib/types";

const SECTIONS: SiteContentSection[] = [
  "promise",
  "faq",
  "solution",
  "pricing",
  "offering",
];

type Props = { searchParams: Promise<{ section?: string }> };

export default async function NewContentPage({ searchParams }: Props) {
  const sp = await searchParams;
  const section = (SECTIONS.includes(sp.section as SiteContentSection)
    ? sp.section
    : "promise") as SiteContentSection;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        New · {section}
      </p>
      <h1 className="font-serif text-3xl mb-8">Add content item</h1>
      <ContentItemForm section={section} />
    </div>
  );
}
