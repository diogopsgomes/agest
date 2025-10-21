import PageTitle from "@/components/page-title";
import { NewClientTypeForm } from "@/components/forms/client-type-forms";

export default function NovoTipoCliente() {
  return (
    <>
      <PageTitle title="Novo tipo de cliente" />
      <NewClientTypeForm />
    </>
  );
}
