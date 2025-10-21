import PageTitle from "@/components/page-title";
import ClientMenu from "@/components/menus/client-menu";
import { EditClientForm } from "@/components/forms/client-forms";

export default async function PerfilCliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Perfil de cliente" />
      <ClientMenu clientId={String(resolvedParams.id)} />
      <EditClientForm clientId={String(resolvedParams.id)} />
    </>
  );
}
