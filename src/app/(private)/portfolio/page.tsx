import PageTitle from "@/components/page-title";
import ProjectsMenu from "@/components/menus/projects-menu";
import ProjectsGrid from "@/components/grids/projects-grid";

export default function Portfolio() {
  return (
    <>
      <PageTitle title="Portfólio" />
      <ProjectsMenu />
      <ProjectsGrid />
    </>
  );
}
