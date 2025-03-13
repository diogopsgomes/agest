import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Clientes() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Nome</TableHead>
          <TableHead>NIPC</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telemóvel</TableHead>
          <TableHead>Telefone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            Mesurestock Unipessoal Lda
          </TableCell>
          <TableCell>510958672</TableCell>
          <TableCell>info@addup.pt</TableCell>
          <TableCell>912345678</TableCell>
          <TableCell>252123456</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
