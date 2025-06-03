import PageTitle from "@/components/page-title";
import UsersMenu from "@/components/menus/users-menu";
import UsersTable from "@/components/tables/users-table";

export default function Utilizadores() {
  return (
    <>
      <PageTitle title="Utilizadores" />
      <UsersMenu />
      <UsersTable />
    </>
  );
}
