// src/components/sections/PricingToolSection.tsx
"use client";

import { useState } from 'react';
import { PRICING_TIERS } from '@/lib/constants';

export default function PricingToolSection() {
  const [sqft, setSqft] = useState<number | ''>('');
  const [tier, setTier] = useState<keyof typeof PRICING_TIERS>('executive');
  const [estimate, setEstimate] = useState<{min: string, max: string} | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqft || sqft < 500) return;
    
    const selectedTier = PRICING_TIERS[tier];
    // Convert to Lakhs (₹)
    const minLakhs = ((Number(sqft) * selectedTier.min) / 100000).toFixed(2);
    const maxLakhs = ((Number(sqft) * selectedTier.max) / 100000).toFixed(2);
    
    setEstimate({ min: minLakhs, max: maxLakhs });
  };

  return (
    <section id="evaluate" className="py-24 bg-[#1A1A1A] text-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: The Psychology Hook */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A84C] mb-6">
            <span className="w-6 h-px bg-[#C9A84C]"></span>
            Instant Estimate
          </div>
          <h2 className="text-4xl font-serif mb-6">Stop Guessing Your Interior Investment.</h2>
          <p className="text-[#6A6A66] mb-8 text-sm leading-relaxed">
            Corporate firms hide their pricing until they have you in a showroom. We believe in absolute transparency. Select your tier and enter your floor plan size to see your realistic execution bracket immediately.
          </p>
          
          <ul className="space-y-4 text-sm text-[#E2E2DF]">
            <li className="flex items-start gap-3">
              <span className="text-[#C9A84C]">▸</span> 
              <strong>Essential:</strong> {PRICING_TIERS.essential.desc} (₹{PRICING_TIERS.essential.min}-₹{PRICING_TIERS.essential.max}/sqft)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C9A84C]">▸</span> 
              <strong>Executive:</strong> {PRICING_TIERS.executive.desc} (₹{PRICING_TIERS.executive.min}-₹{PRICING_TIERS.executive.max}/sqft)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#C9A84C]">▸</span> 
              <strong>Luxury:</strong> {PRICING_TIERS.luxury.desc} (₹{PRICING_TIERS.luxury.min}-₹{PRICING_TIERS.luxury.max}/sqft)
            </li>
          </ul>
        </div>

        {/* Right Column: The Calculator Tool */}
        <div className="bg-[#2A2A2A] p-8 border border-[#3A3A3A]">
          {!estimate ? (
            <form onSubmit={calculateEstimate} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Total Square Footage</label>
                <input 
                  type="number" 
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value ? Number(e.target.value) : '')}
                  placeholder="e.g. 1250"
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] text-[#FBFBFA] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  required
                  min="500"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Execution Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(PRICING_TIERS) as Array<keyof typeof PRICING_TIERS>).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`py-3 text-xs uppercase tracking-widest font-semibold border transition-all ${
                        tier === t 
                        ? 'bg-[#C9A84C] text-[#1A1A1A] border-[#C9A84C]' 
                        : 'bg-[#1A1A1A] text-[#6A6A66] border-[#3A3A3A] hover:border-[#6A6A66]'
                      }`}
                    >
                      {PRICING_TIERS[t].name}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FBFBFA] text-[#1A1A1A] hover:bg-[#C9A84C] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all mt-4"
              >
                Calculate Range
              </button>
            </form>
          ) : (
            <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
              <span className="block text-xs uppercase tracking-widest text-[#C9A84C] mb-4 font-semibold">Estimated Investment</span>
              <div className="text-4xl md:text-5xl font-serif text-[#FBFBFA] mb-2">
                ₹{estimate.min} L — ₹{estimate.max} L
              </div>
              <p className="text-[#6A6A66] text-xs uppercase tracking-widest mb-8">Exclusive of 18% GST</p>
              
              {/* The Micro-Commitment Capture */}
              <div className="bg-[#1A1A1A] p-6 border border-[#3A3A3A] text-left">
                <p className="text-sm text-[#E2E2DF] mb-4">Want the exact room-by-room breakdown for this configuration? We will ping you the itemized spreadsheet.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] text-[#FBFBFA] px-4 py-2 text-sm focus:outline-none focus:border-[#C9A84C]"
                  />
                  <button className="bg-[#C9A84C] text-[#1A1A1A] px-6 text-xs uppercase font-semibold tracking-widest hover:bg-[#FBFBFA] transition-colors">
                    Send
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => setEstimate(null)}
                className="mt-6 text-xs text-[#6A6A66] uppercase tracking-widest hover:text-[#E2E2DF] transition-colors underline underline-offset-4"
              >
                Recalculate
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}