import { BRAND_INFO } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions | Emagine Design Studio",
  description: "Website and enquiry terms for Emagine Design Studio.",
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">
          Terms &amp; conditions
        </h1>
        <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
          <p>
            By using {BRAND_INFO.name}’s website and submitting an enquiry, you
            agree that information you provide is accurate and that we may
            contact you via WhatsApp, phone, or email about your request.
          </p>
          <p>
            Free layout reviews and online estimates are indicative. They are
            not a binding quotation, construction contract, or guarantee of
            final cost. Formal proposals follow a studio discussion and agreed
            scope.
          </p>
          <p>
            Project images, copy, and brand marks on this site belong to{" "}
            {BRAND_INFO.name} or respective rights holders. Do not reuse without
            permission.
          </p>
          <p>
            ₹/sqft ranges published on the site are guidance bands and may vary
            with site conditions, materials, and client selections.
          </p>
          <p>
            Questions:{" "}
            <a
              href={`mailto:${BRAND_INFO.contact.email}`}
              className="text-[var(--accent-gold)] hover:underline"
            >
              {BRAND_INFO.contact.email}
            </a>
            .
          </p>
          <p className="text-xs text-[var(--text-secondary)]/80">
            Last updated: March 2026 · {BRAND_INFO.contact.location}
          </p>
        </div>
      </article>
    </div>
  );
}
