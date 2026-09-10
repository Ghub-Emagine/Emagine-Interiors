"use client";

import { useState } from "react";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";

const navLinks = [
  { href: "/portfolio", label: "Our Work" },
  { href: "/#designs", label: "Designs" },
  { href: "/#services", label: "Services" },
  { href: "/why-us", label: "Why EDS" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 w-full bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 min-h-[5.5rem] md:min-h-[6rem] flex items-center justify-between py-3">
        <Link href="/" className="inline-flex items-center" onClick={closeMenu}>
          <BrandMark size="nav" withStudio priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#evaluate"
            className="hidden md:inline-flex items-center justify-center bg-[var(--accent-gold-bright)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--background)] px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all"
          >
            Free Estimate
          </Link>

          <button
            type="button"
            className="md:hidden text-[var(--text-primary)] p-1"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 text-sm font-medium text-[var(--text-secondary)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="py-2 hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#evaluate"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center bg-[var(--accent-gold-bright)] text-[var(--text-primary)] px-5 py-3 text-xs uppercase tracking-widest font-semibold"
            >
              Free Estimate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
