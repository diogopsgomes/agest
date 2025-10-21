import PageTitle from "@/components/page-title";
import { NewClientForm } from "@/components/forms/client-forms";

export default function NovoCliente() {
  return (
    <>
      <PageTitle title="Novo cliente" />
      <NewClientForm />
    </>
  );
}
