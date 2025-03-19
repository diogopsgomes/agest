import ClientsMenu from "@/components/client/menu";
import ClientsList from "@/components/client/list";

export default function Clientes() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Clientes</h1>
      <ClientsMenu />
      <ClientsList />
    </>
  );
}
