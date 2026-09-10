import HeroSlideForm from "../HeroSlideForm";

export default function NewHeroSlidePage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        New
      </p>
      <h1 className="font-serif text-3xl mb-8">Add hero slide</h1>
      <HeroSlideForm />
    </div>
  );
}
