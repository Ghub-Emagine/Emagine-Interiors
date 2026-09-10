import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioProject } from "@/lib/types";
import { deleteProject, setProjectStatus } from "./actions";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = (data ?? []) as PortfolioProject[];

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-gold)] mb-2">
              Portfolio CMS
            </p>
            <h1 className="font-serif text-4xl mb-2">Projects</h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Create, publish, and feature case studies on the public site.
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="btn-primary"
          >
            New project
          </Link>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error.message}</p>}

      <div className="overflow-x-auto border border-[var(--border)] bg-[var(--background)] shadow-[0_12px_40px_rgba(18,17,15,0.04)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] text-xs uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--surface)]/50">
            <tr>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Images</th>
              <th className="p-4 font-semibold">Developer</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Featured</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="align-top hover:bg-[var(--surface)]/40 transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {project.slug}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    {project.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.cover_image_url}
                        alt=""
                        className="h-10 w-14 object-cover border border-[var(--border)]"
                      />
                    ) : (
                      <span className="text-xs text-[var(--text-secondary)]">
                        No cover
                      </span>
                    )}
                    {(project.gallery_urls?.length ?? 0) > 0 && (
                      <span className="text-[10px] uppercase tracking-wider self-center text-[var(--accent-gold)]">
                        +{project.gallery_urls!.length}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-xs">{project.developer || "—"}</td>
                <td className="p-4 text-xs uppercase tracking-wider">
                  {project.status}
                </td>
                <td className="p-4 text-xs">{project.featured ? "Yes" : "No"}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-xs uppercase tracking-widest text-[var(--accent-gold)] hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={setProjectStatus.bind(
                        null,
                        project.id,
                        project.status === "published" ? "draft" : "published",
                      )}
                    >
                      <button
                        type="submit"
                        className="text-xs uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        {project.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>
                    </form>
                    <form action={deleteProject.bind(null, project.id)}>
                      <button
                        type="submit"
                        className="text-xs uppercase tracking-widest text-red-700 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
