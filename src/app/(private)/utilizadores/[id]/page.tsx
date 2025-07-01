import UserMenu from "@/components/menus/user-menu";
import { EditUserForm } from "@/components/forms/user-forms";

export default async function PerfilUtilizador({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Perfil de utilizador</h1>
      <UserMenu userId={String(resolvedParams.id)} />
      <EditUserForm userId={String(resolvedParams.id)} />
    </>
  );
}
