import PageTitle from "@/components/page-title";
import QuotesMenu from "@/components/menus/quotes-menu";
import QuotesTable from "@/components/tables/quotes-table";

export default function Orcamentos() {
  return (
    <>
      <PageTitle title="Orçamentos" />
      <QuotesMenu />
      <QuotesTable />
    </>
  );
}
