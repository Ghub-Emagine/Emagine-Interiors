// src/components/layout/Footer.tsx
import { BRAND_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FBFBFA] py-12 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-8">
        
        <div className="max-w-xs">
          <h3 className="font-serif text-2xl mb-2">{BRAND_INFO.name}</h3>
          <p className="text-[#6A6A66] text-sm mb-6">{BRAND_INFO.tagline}</p>
          <p className="text-sm text-[#E2E2DF]">{BRAND_INFO.contact.location}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-[#E2E2DF]">
          <span className="text-[#6A6A66] uppercase tracking-widest text-xs mb-2 font-semibold">Connect</span>
          <a href={`mailto:${BRAND_INFO.contact.email}`} className="hover:text-[#C9A84C] transition-colors">{BRAND_INFO.contact.email}</a>
          <span className="hover:text-[#C9A84C] transition-colors cursor-pointer">WhatsApp Us</span>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-[#2A2A2A] text-xs text-[#6A6A66] flex justify-between">
        <span>© {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.</span>
        <span>MSME Registered Studio</span>
      </div>
    </footer>
  );
}