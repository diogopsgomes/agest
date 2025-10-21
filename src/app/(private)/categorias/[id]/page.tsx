import PageTitle from "@/components/page-title";
import CategoryMenu from "@/components/menus/category-menu";
import { EditCategoryForm } from "@/components/forms/category-forms";

export default async function DetalhesCategoria({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Detalhes de categoria" />
      <CategoryMenu categoryId={String(resolvedParams.id)} />
      <EditCategoryForm categoryId={String(resolvedParams.id)} />
    </>
  );
}
