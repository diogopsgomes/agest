import PageTitle from "@/components/page-title";
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
      <PageTitle title="Detalhes de tipo de cliente" />
      <ClientTypeMenu clientTypeId={String(resolvedParams.id)} />
      <EditClientTypeForm clientTypeId={String(resolvedParams.id)} />
    </>
  );
}
