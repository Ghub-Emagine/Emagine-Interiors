// src/components/sections/MaterialSection.tsx
export default function MaterialSection() {
  const specs = [
    { feature: "Carcass Material", eds: "BWR Grade Gurjan Ply", competitor: "Prelam MDF-R", winner: "eds" },
    { feature: "Hardware Brand", eds: "Hettich / Häfele", competitor: "Budget Generic", winner: "eds" },
    { feature: "Visualization", eds: "Your Actual Flat (Pre-Build)", competitor: "Generic Showroom", winner: "eds" },
    { feature: "Warranty", eds: "1-Year Workmanship", competitor: "1-Year Limited", winner: "draw" },
  ];

  return (
    <section className="py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">Material Intelligence</h2>
          <p className="text-[#6A6A66] max-w-xl">What your corporate interior quote doesn't tell you. We've stripped back the marketing gloss to compare the actual structural components.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E2E2DF]">
                <th className="py-4 text-xs uppercase tracking-widest text-[#6A6A66] font-semibold">Specification</th>
                <th className="py-4 text-xs uppercase tracking-widest text-[#7D6E5D] font-semibold">Emagine Design Studio</th>
                <th className="py-4 text-xs uppercase tracking-widest text-[#6A6A66] font-semibold">Corporate Competitors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E2DF]">
              {specs.map((row, i) => (
                <tr key={i}>
                  <td className="py-6 font-medium text-[#1A1A1A]">{row.feature}</td>
                  <td className="py-6 text-[#1A1A1A] font-semibold">{row.eds}</td>
                  <td className="py-6 text-[#6A6A66]">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="mt-8 text-xs text-[#6A6A66] italic">Note: Specifications derived from standard public quotation documents for Chennai residential projects (2025-2026).</p>
      </div>
    </section>
  );
}