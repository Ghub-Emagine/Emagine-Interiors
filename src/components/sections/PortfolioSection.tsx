// src/components/sections/PortfolioSection.tsx
export default function PortfolioSection() {
  // Placeholder data for the structural shell
  const projects = [
    { id: 1, title: "Casagrand Mabelle", location: "ECR, Chennai", type: "Executive Tier" },
    { id: 2, title: "Appaswamy Azure", location: "Theosophical Society", type: "Luxury Tier" },
    { id: 3, title: "Akshaya Metropolis", location: "OMR, Chennai", type: "Essential Tier" },
  ];

  return (
    <section id="work" className="py-24 bg-[#F4F4F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">Spatial Case Studies</h2>
            <p className="text-[#6A6A66] max-w-xl">
              We do not rely on generic showroom displays. We visualize actual developer layouts in exact detail before a single day of site execution begins.
            </p>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 text-xs font-semibold uppercase tracking-widest text-[#6A6A66] whitespace-nowrap">
            <button className="text-[#1A1A1A] border-b border-[#1A1A1A] pb-1">All Projects</button>
            <button className="hover:text-[#1A1A1A] pb-1 transition-colors">Casagrand</button>
            <button className="hover:text-[#1A1A1A] pb-1 transition-colors">Appaswamy</button>
            <button className="hover:text-[#1A1A1A] pb-1 transition-colors">Akshaya</button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              {/* Image Placeholder Block */}
              <div className="aspect-[4/3] bg-[#E2E2DF] relative overflow-hidden mb-4 border border-[#E2E2DF]">
                <div className="absolute inset-0 flex items-center justify-center text-[#6A6A66] text-xs uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                  [ Render Placeholder ]
                </div>
              </div>
              
              {/* Project Meta Data */}
              <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#7D6E5D] transition-colors">{project.title}</h3>
              <div className="flex justify-between items-center mt-2 text-xs text-[#6A6A66]">
                <span>{project.location}</span>
                <span className="uppercase tracking-widest">{project.type}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Expansion CTA */}
        <div className="mt-16 text-center">
           <button className="border border-[#E2E2DF] bg-[#FBFBFA] text-[#1A1A1A] hover:bg-[#E2E2DF] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all">
              View Full Archive
           </button>
        </div>

      </div>
    </section>
  );
}