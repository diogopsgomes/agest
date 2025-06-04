import CategoryMenu from "@/components/menus/category-menu";
import { EditCategoryForm } from "@/components/forms/category-forms";

export default async function DetalhesCategoria({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Detalhes de categoria</h1>
      <CategoryMenu categoryId={String(params.id)} />
      <EditCategoryForm categoryId={String(params.id)} />
    </>
  );
}
