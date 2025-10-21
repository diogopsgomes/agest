import PageTitle from "@/components/page-title";
import ServiceRateMenu from "@/components/menus/service-rate-menu";
import { EditServiceRateForm } from "@/components/forms/service-rate-forms";

export default async function DetalhesTarifaServico({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Detalhes de tarifa de serviço" />
      <ServiceRateMenu serviceRateId={String(resolvedParams.id)} />
      <EditServiceRateForm serviceRateId={String(resolvedParams.id)} />
    </>
  );
}
