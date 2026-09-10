import { getFeaturedProjects } from "@/lib/cms";
import PortfolioSectionClient from "./PortfolioSectionClient";

export default async function PortfolioSection() {
  const projects = await getFeaturedProjects(6);
  return <PortfolioSectionClient projects={projects} />;
}
