import ClientsMenu from "@/components/menus/clients-menu";
import PageTitle from "@/components/page-title";
import ClientsTable from "@/components/tables/clients-table";

export default function Clientes() {
  return (
    <>
      <PageTitle title="Clientes" />
      <ClientsMenu />
      <ClientsTable />
    </>
  );
}
