import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BrandMark from "@/components/layout/BrandMark";

const nav = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/room-designs", label: "Room designs" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/page-images", label: "Page images" },
  { href: "/admin/blogs", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen atmosphere text-[var(--text-primary)]">
      <header className="border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="inline-flex">
              <BrandMark size="admin" withStudio />
            </Link>
            <nav className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-widest font-semibold">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hidden md:inline"
            >
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs uppercase tracking-widest border border-[var(--border)] px-3 py-2 hover:border-[var(--accent-gold)] transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <nav className="sm:hidden flex border-t border-[var(--border)] px-2 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 text-xs uppercase tracking-widest font-semibold text-[var(--text-secondary)] whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10 md:py-12">{children}</main>
    </div>
  );
}
