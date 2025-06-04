"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { RefreshCw, Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/api/services";
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

interface Service {
  service_id: string;
  sku: string;
  name: string;
  hours_default: string;
}

export default function ServicesTable() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    setLoading(true);
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    [service.sku, service.name].some((field) =>
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
            onClick={() => fetchServices()}
          >
            <RefreshCw />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption className="sr-only">Lista de Serviços</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">SKU</TableHead>
            <TableHead className="w-[90%]">Nome</TableHead>
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
                  </TableRow>
                ))
            : filteredServices.map((service, idx) => (
                <TableRow
                  key={service.service_id}
                  onClick={() => router.push(`/servicos/${service.service_id}`)}
                  className={
                    idx % 2 === 0
                      ? "bg-muted/40 hover:bg-muted"
                      : "bg-muted/0 hover:bg-muted"
                  }
                >
                  <TableCell className="font-medium">{service.sku}</TableCell>
                  <TableCell className="font-medium">{service.name}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
