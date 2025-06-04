import UserMenu from "@/components/menus/user-menu";
import { EditUserForm } from "@/components/forms/user-forms";

export default async function PerfilUtilizador({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Perfil de utilizador</h1>
      <UserMenu userId={String(params.id)} />
      <EditUserForm userId={String(params.id)} />
    </>
  );
}
