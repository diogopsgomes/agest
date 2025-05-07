import { NewServiceForm } from "@/components/forms/service-forms";
import PageTitle from "@/components/page-title";

export default function NovoServico() {
  return (
    <>
      <PageTitle title="Novo Serviço" />
      <NewServiceForm />
    </>
  );
}
