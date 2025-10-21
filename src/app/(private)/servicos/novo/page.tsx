import PageTitle from "@/components/page-title";
import { NewServiceForm } from "@/components/forms/service-forms";

export default function NovoServico() {
  return (
    <>
      <PageTitle title="Novo serviço" />
      <NewServiceForm />
    </>
  );
}
