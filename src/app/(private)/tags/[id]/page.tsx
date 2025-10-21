import TagMenu from "@/components/menus/tag-menu";
import PageTitle from "@/components/page-title";
import { EditTagForm } from "@/components/forms/tag-forms";

export default async function DetalhesTag({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Detalhes de tag" />
      <TagMenu tagId={String(resolvedParams.id)} />
      <EditTagForm tagId={String(resolvedParams.id)} />
    </>
  );
}
