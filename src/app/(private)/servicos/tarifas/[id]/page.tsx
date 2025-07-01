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
      <h1 className="text-2xl font-semibold mb-8">
        Detalhes de tarifa de serviço
      </h1>
      <ServiceRateMenu serviceRateId={String(resolvedParams.id)} />
      <EditServiceRateForm serviceRateId={String(resolvedParams.id)} />
    </>
  );
}
