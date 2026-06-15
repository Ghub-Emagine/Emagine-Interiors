// src/components/layout/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E2E2DF] z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl tracking-tight text-[#1A1A1A]">EMAGINE</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#6A6A66] font-medium">Design Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6A6A66]">
          <Link href="#work" className="hover:text-[#1A1A1A] transition-colors">Our Work</Link>
          <Link href="#process" className="hover:text-[#1A1A1A] transition-colors">Why EDS</Link>
          <Link href="#material" className="hover:text-[#1A1A1A] transition-colors">Materials</Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="#apply" 
            className="hidden md:inline-flex items-center justify-center border border-[#7D6E5D] text-[#7D6E5D] hover:bg-[#7D6E5D] hover:text-white px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all"
          >
            Spatial Pre-Evaluation
          </Link>
          
          {/* Mobile Menu Icon (Placeholder) */}
          <button className="md:hidden text-[#1A1A1A]">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}