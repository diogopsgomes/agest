"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getClientTypes } from "@/lib/api/clients";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClientType {
  client_type_id: string;
  sku: string;
  name: string;
  price_adjust: number;
}

export default function ClientTypesTable() {
  const router = useRouter();

  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchClientTypes = () => {
    setLoading(true);
    getClientTypes()
      .then((res) => setClientTypes(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClientTypes();
  }, []);

  const filteredClientTypes = clientTypes.filter((clientType) =>
    [clientType.sku, clientType.name].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-5" />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <Button
            variant="outline"
            onClick={() => fetchClientTypes()}
          >
            <RefreshCw />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption className="sr-only">
          Lista de Tipos de Cliente
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">SKU</TableHead>
            <TableHead className="w-[80%]">Nome</TableHead>
            <TableHead className="w-[10%]">Ajuste</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array(15)
                .fill(0)
                .map((_, idx) => (
                  <TableRow
                    key={idx}
                    className={
                      idx % 2 === 0
                        ? "bg-muted/40 hover:bg-muted"
                        : "bg-muted/0 hover:bg-muted"
                    }
                  >
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))
            : filteredClientTypes.map((clientType, idx) => (
                <TableRow
                  key={clientType.client_type_id}
                  onClick={() =>
                    router.push(`/clientes/tipos/${clientType.client_type_id}`)
                  }
                  className={
                    idx % 2 === 0
                      ? "bg-muted/40 hover:bg-muted"
                      : "bg-muted/0 hover:bg-muted"
                  }
                >
                  <TableCell className="font-medium">
                    {clientType.sku}
                  </TableCell>
                  <TableCell className="font-medium">
                    {clientType.name}
                  </TableCell>
                  <TableCell>{clientType.price_adjust}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
