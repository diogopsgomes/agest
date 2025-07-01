import ClientTypeMenu from "@/components/menus/client-type-menu";
import { EditClientTypeForm } from "@/components/forms/client-type-forms";

export default async function DetalhesTipoCliente({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">
        Detalhes de tipo de cliente
      </h1>
      <ClientTypeMenu clientTypeId={String(resolvedParams.id)} />
      <EditClientTypeForm clientTypeId={String(resolvedParams.id)} />
    </>
  );
}
