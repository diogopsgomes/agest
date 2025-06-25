import TagMenu from "@/components/menus/tag-menu";
import { EditTagForm } from "@/components/forms/tag-forms";

export default async function DetalhesTag({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Detalhes de tag</h1>
      <TagMenu tagId={String(params.id)} />
      <EditTagForm tagId={String(params.id)} />
    </>
  );
}
