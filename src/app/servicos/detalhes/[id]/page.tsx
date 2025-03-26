import { EditClientForm } from "@/components/forms/client-forms";
import ClientMenu from "@/components/menus/client-menu";

export default async function DetalhesServico({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Serviço</h1>
      <ClientMenu clientId={String(params.id)} />
      <EditClientForm clientId={String(params.id)} />
    </>
  );
}
