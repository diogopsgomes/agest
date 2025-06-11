import PageTitle from "@/components/page-title";
import QuotesMenu from "@/components/menus/quotes-menu";
import QuotesGrid from "@/components/grids/quotes-grid";

export default function Orcamentos() {
  return (
    <>
      <PageTitle title="Orçamentos" />
      <QuotesMenu />
      <QuotesGrid />
    </>
  );
}
