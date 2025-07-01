import TagMenu from "@/components/menus/tag-menu";
import { EditTagForm } from "@/components/forms/tag-forms";

export default async function DetalhesTag({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Detalhes de tag</h1>
      <TagMenu tagId={String(resolvedParams.id)} />
      <EditTagForm tagId={String(resolvedParams.id)} />
    </>
  );
}
