import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        Portfolio
      </p>
      <h1 className="font-serif text-3xl mb-2">New project</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-xl">
        Cover image = grid thumbnail. Gallery = extra rooms on the project
        detail page. Site hero is separate (marketing pages).
      </p>
      <ProjectForm />
    </div>
  );
}
