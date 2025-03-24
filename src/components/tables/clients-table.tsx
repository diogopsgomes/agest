"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { getClients } from "@/lib/api/clients";
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

interface Client {
  client_id: string;
  name: string;
  company: string;
  vat: string;
  email: string;
  tlm: string;
  tlf: string;
}

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  }, []);

  const filteredClients = clients.filter((client) =>
    [
      client.name,
      client.company,
      client.vat,
      client.email,
      client.tlm,
      client.tlf,
    ].some((field) => field?.toLowerCase().includes(search.toLowerCase()))
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
        </div>
      </div>

      <Table>
        <TableCaption className="sr-only">Lista de Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Nome</TableHead>
            <TableHead className="w-[25%]">Empresa</TableHead>
            <TableHead>NIPC</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telemóvel</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array(15)
                .fill(0)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
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
            : filteredClients.map((client) => (
                <TableRow key={client.client_id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="font-medium">
                    {client.company}
                  </TableCell>
                  <TableCell>{client.vat}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.tlm}</TableCell>
                  <TableCell>{client.tlf}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
