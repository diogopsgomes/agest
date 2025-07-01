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
      <h1 className="text-2xl font-semibold mb-8">Detalhes de projeto</h1>
      <ProjectMenu projectId={String(resolvedParams.id)} />
      <EditProjectForm projectId={String(resolvedParams.id)} />
    </>
  );
}
