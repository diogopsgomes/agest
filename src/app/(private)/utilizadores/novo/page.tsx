import PageTitle from "@/components/page-title";
import { NewUserForm } from "@/components/forms/user-forms";

export default function NovoUtilizador() {
  return (
    <>
      <PageTitle title="Novo utilizador" />
      <NewUserForm />
    </>
  );
}
