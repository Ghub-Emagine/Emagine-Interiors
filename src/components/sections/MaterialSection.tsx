import type { PageCopyItem } from "@/lib/page-copy-slots";
import { copyField, copyMeta } from "@/lib/page-copy-slots";

const rowKeys = [
  "material_1",
  "material_2",
  "material_3",
  "material_4",
  "material_5",
] as const;

export default function MaterialSection({
  copy,
}: {
  copy: Record<string, PageCopyItem>;
}) {
  const eyebrow = copyMeta(
    copy,
    "material_section",
    "eyebrow",
    "What quotes hide",
  );
  const title = copyField(
    copy,
    "material_section",
    "title",
    "Materials, not marketing.",
  );
  const body = copyField(
    copy,
    "material_section",
    "body",
    "Corporate quotes often look similar on paper. The difference is what sits inside the cabinets, whose hinges you get, and whether the 3D matches what is built on site.",
  );

  const specs = rowKeys.map((key) => ({
    feature: copyField(copy, key, "title", "Spec"),
    eds: copyMeta(copy, key, "eds", "—"),
    competitor: copyMeta(copy, key, "competitor", "—"),
  }));

  return (
    <section
      id="material"
      className="py-24 md:py-28 bg-[var(--text-primary)] text-[var(--background)] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold-bright)] mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-serif mb-4">{title}</h2>
          <p className="text-white/65 leading-relaxed">{body}</p>
        </div>

        <div className="overflow-x-auto border border-white/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/15">
                <th className="py-4 px-4 md:px-6 text-xs uppercase tracking-widest text-white/45 font-semibold">
                  Spec
                </th>
                <th className="py-4 px-4 md:px-6 text-xs uppercase tracking-widest text-[var(--accent-gold-bright)] font-semibold">
                  Emagine
                </th>
                <th className="py-4 px-4 md:px-6 text-xs uppercase tracking-widest text-white/45 font-semibold">
                  Typical firm
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {specs.map((row) => (
                <tr
                  key={row.feature}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-6 px-4 md:px-6 font-medium">{row.feature}</td>
                  <td className="py-6 px-4 md:px-6 font-semibold">{row.eds}</td>
                  <td className="py-6 px-4 md:px-6 text-white/50">
                    {row.competitor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-xs text-white/40">
          Based on common Chennai residential quotation patterns (2025–2026). Ask
          us for the full room-by-room sheet after your estimate.
        </p>
      </div>
    </section>
  );
}
