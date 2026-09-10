import { getPublishedProjects } from "@/lib/cms";
import PortfolioArchive from "./PortfolioArchive";

export default async function PortfolioPage() {
  const projects = await getPublishedProjects();
  return <PortfolioArchive projects={projects} />;
}
