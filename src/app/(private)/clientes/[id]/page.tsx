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
      <h1 className="text-2xl font-semibold mb-8">Perfil de cliente</h1>
      <ClientMenu clientId={String(resolvedParams.id)} />
      <EditClientForm clientId={String(resolvedParams.id)} />
    </>
  );
}
