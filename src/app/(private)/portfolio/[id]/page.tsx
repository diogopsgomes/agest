import ProjectMenu from "@/components/menus/project-menu";
import { EditProjectForm } from "@/components/forms/project-forms";

export default async function DetalhesProjeto({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Detalhes de projeto</h1>
      <ProjectMenu projectId={String(params.id)} />
      <EditProjectForm projectId={String(params.id)} />
    </>
  );
}
