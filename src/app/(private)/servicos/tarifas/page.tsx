import PageTitle from "@/components/page-title";
import ServiceRatesMenu from "@/components/menus/service-rates-menu";
import ServiceRatesTable from "@/components/tables/service-rates-table";

export default function TarifasServico() {
  return (
    <>
      <PageTitle title="Tarifas de Serviço" />
      <ServiceRatesMenu />
      <ServiceRatesTable />
    </>
  );
}
