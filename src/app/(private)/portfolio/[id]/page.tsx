import PageTitle from "@/components/page-title";
import ProjectMenu from "@/components/menus/project-menu";
import { EditProjectForm } from "@/components/forms/project-forms";

export default async function DetalhesProjeto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Detalhes de projeto" />
      <ProjectMenu projectId={String(resolvedParams.id)} />
      <EditProjectForm projectId={String(resolvedParams.id)} />
    </>
  );
}
