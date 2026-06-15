// src/components/sections/EvaluationFormSection.tsx
"use client";

export default function EvaluationFormSection() {
  return (
    <section id="apply" className="py-24 bg-[#FBFBFA] border-t border-[#E2E2DF]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7D6E5D] mb-4">
            <span className="w-6 h-px bg-[#7D6E5D]"></span>
            Final Step
            <span className="w-6 h-px bg-[#7D6E5D]"></span>
          </div>
          <h2 className="text-4xl font-serif text-[#1A1A1A] mb-4">Apply For Spatial Analysis.</h2>
          <p className="text-[#6A6A66] max-w-2xl mx-auto">
            We take on a limited number of residential projects per quarter to ensure our founders remain directly involved in every visualization and site execution. Submit your layout for review.
          </p>
        </div>

        <div className="bg-[#F4F4F2] p-8 md:p-12 border border-[#E2E2DF]">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Full Name *</label>
                <input 
                  type="text" 
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">WhatsApp Number *</label>
                <input 
                  type="tel" 
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Developer & Location *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Casagrand Mabelle, ECR"
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Target Budget Tier *</label>
                <select 
                  className="w-full bg-[#FBFBFA] border border-[#E2E2DF] text-[#1A1A1A] px-4 py-3 text-sm focus:outline-none focus:border-[#7D6E5D] appearance-none" 
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select an investment bracket...</option>
                  <option value="essential">Essential (₹800-₹1100/sqft)</option>
                  <option value="executive">Executive (₹1100-₹1500/sqft)</option>
                  <option value="luxury">Luxury (₹1500-₹1900/sqft)</option>
                </select>
              </div>
            </div>

            {/* The Friction Point: File Upload */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#6A6A66] mb-2 font-semibold">Upload Builder Floor Plan (PDF/Image) *</label>
              <div className="border-2 border-dashed border-[#E2E2DF] bg-[#FBFBFA] p-8 text-center hover:border-[#7D6E5D] transition-colors cursor-pointer relative">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required accept=".pdf,.png,.jpg,.jpeg"/>
                <span className="text-[#1A1A1A] font-medium block mb-1">Click to upload or drag and drop</span>
                <span className="text-xs text-[#6A6A66]">Maximum file size: 10MB</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#1A1A1A] text-[#FBFBFA] hover:bg-[#7D6E5D] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all mt-4"
            >
              Submit Layout For Evaluation
            </button>
            <p className="text-center text-xs text-[#6A6A66] italic mt-4">
              Your data is completely confidential. We will review your layout and respond within 24 hours.
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}