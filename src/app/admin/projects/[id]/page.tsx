import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { PortfolioProject } from "@/lib/types";
import ProjectForm from "../ProjectForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Edit project</h1>
      <ProjectForm project={data as PortfolioProject} />
    </div>
  );
}
