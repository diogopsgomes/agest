"use client";

import { Plus } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientsMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Link href="/clientes/novo">
          <Button variant="outline">
            <Plus /> Novo cliente
          </Button>
        </Link>
      </div>
    </div>
  );
}
