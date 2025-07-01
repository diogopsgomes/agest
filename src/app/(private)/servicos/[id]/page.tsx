import PageTitle from "@/components/page-title";
import ServiceMenu from "@/components/menus/service-menu";
import { EditServiceForm } from "@/components/forms/service-forms";

export default async function DetalhesServico({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <>
      <PageTitle title="Detalhes de serviço" />
      <ServiceMenu serviceId={String(resolvedParams.id)} />
      <EditServiceForm serviceId={String(resolvedParams.id)} />
    </>
  );
}
