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
      <h1 className="text-2xl font-semibold mb-8">Detalhes de categoria</h1>
      <CategoryMenu categoryId={String(resolvedParams.id)} />
      <EditCategoryForm categoryId={String(resolvedParams.id)} />
    </>
  );
}
