import PageTitle from "@/components/page-title";
import ServiceMenu from "@/components/menus/service-menu";
import { EditServiceForm } from "@/components/forms/service-forms";

export default async function DetalhesServico({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <PageTitle title="Detalhes de serviço" />
      <ServiceMenu serviceId={String(params.id)} />
      <EditServiceForm serviceId={String(params.id)} />
    </>
  );
}
