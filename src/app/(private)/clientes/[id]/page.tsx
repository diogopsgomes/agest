import { EditClientForm } from "@/components/forms/client-forms";
import ClientMenu from "@/components/menus/client-menu";

export default async function PerfilCliente({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Perfil de cliente</h1>
      <ClientMenu clientId={String(params.id)} />
      <EditClientForm clientId={String(params.id)} />
    </>
  );
}
