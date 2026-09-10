import { BRAND_INFO } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | Emagine Design Studio",
  description: "How Emagine Design Studio handles enquiry and contact data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-3">
          Legal
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Privacy policy</h1>
        <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
          <p>
            {BRAND_INFO.name} (“we”) collects information you submit through our
            website forms—typically name, WhatsApp number, email, project
            location, budget band, and optional floor-plan files—so we can
            respond to layout reviews and interior enquiries.
          </p>
          <p>
            We use this data to contact you about your request, improve our
            services, and keep internal records of leads. We do not sell your
            personal information.
          </p>
          <p>
            Floor plans and messages are stored securely with our service
            providers (including hosting and email). Access is limited to studio
            staff who need it to serve you.
          </p>
          <p>
            You may ask us to update or delete your enquiry details by emailing{" "}
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
