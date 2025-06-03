import PageTitle from "@/components/page-title";
import ClientTypesMenu from "@/components/menus/client-types-menu";
import ClientTypesTable from "@/components/tables/client-types-table";

export default function TiposCliente() {
  return (
    <>
      <PageTitle title="Tipos de Cliente" />
      <ClientTypesMenu />
      <ClientTypesTable />
    </>
  );
}
