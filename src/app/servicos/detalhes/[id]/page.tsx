import { EditServiceForm } from "@/components/forms/service-forms";
import ServiceMenu from "@/components/menus/service-menu";
import PageTitle from "@/components/page-title";

export default async function DetalhesServico({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <PageTitle title="Serviço" />
      <ServiceMenu serviceId={String(params.id)} />
      <EditServiceForm serviceId={String(params.id)} />
    </>
  );
}
