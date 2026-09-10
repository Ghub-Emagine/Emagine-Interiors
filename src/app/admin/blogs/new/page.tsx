import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
        New
      </p>
      <h1 className="font-serif text-3xl mb-8">Write a blog post</h1>
      <BlogForm />
    </div>
  );
}
