import PageTitle from "@/components/page-title";
import { NewServiceRateForm } from "@/components/forms/service-rate-forms";

export default function NovaTarifaServico() {
  return (
    <>
      <PageTitle title="Nova tarifa de serviço" />
      <NewServiceRateForm />
    </>
  );
}
