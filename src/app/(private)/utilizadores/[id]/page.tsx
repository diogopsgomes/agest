import PageTitle from "@/components/page-title";
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
      <PageTitle title="Perfil de utilizador" />
      <UserMenu userId={String(resolvedParams.id)} />
      <EditUserForm userId={String(resolvedParams.id)} />
    </>
  );
}
