// src/components/sections/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-[#FBFBFA] overflow-hidden py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Highly Targeted Sales Messaging */}
        <div className="md:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7D6E5D]">
            <span className="w-6 h-px bg-[#7D6E5D]"></span>
            Chennai Residential · Pre-Possession
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.1] tracking-tight">
            Verify Your Layout Potential <br />
            <span className="font-normal italic text-[#7D6E5D]">Before You Commit.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-[#6A6A66] max-w-xl font-normal leading-relaxed">
            Don't rely on generic showroom templates. We evaluate the exact spatial realities 
            and structural flow of your developer floor plan—ensuring your asset handles light, 
            materials, and movement perfectly before a single rupee is spent.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link 
              href="#evaluate" 
              className="bg-[#1A1A1A] text-[#FBFBFA] hover:bg-[#7D6E5D] px-8 py-4 text-xs uppercase tracking-widest font-semibold text-center transition-all shadow-sm"
            >
              Apply For Spatial Analysis
            </Link>
            <Link 
              href="#work" 
              className="border border-[#E2E2DF] text-[#1A1A1A] hover:bg-[#F4F4F2] px-8 py-4 text-xs uppercase tracking-widest font-semibold text-center transition-all"
            >
              Examine Our Standards
            </Link>
          </div>
          
          <p className="text-xs text-[#6A6A66]/70 italic pt-2">
            * Strict qualification criteria applies. Floor plan PDF upload required.
          </p>
        </div>

        {/* Right Column: Premium Spatial Anchor Panel */}
        <div className="md:col-span-5 relative w-full h-[350px] md:h-[550px] bg-[#F4F4F2] border border-[#E2E2DF]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
            alt="Bespoke interior spatial rendering layout"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}