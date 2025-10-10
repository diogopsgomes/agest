"use client";

import { Plus, UserCog } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientsMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-7 py-1.5 overflow-x-auto">
      <div className="flex items-center gap-2">
        <Link href="/clientes/novo">
          <Button variant="outline">
            <Plus />
            <span>Novo cliente</span>
          </Button>
        </Link>
        <Link href="/clientes/tipos">
          <Button variant="outline">
            <UserCog />
            <span>Tipos de cliente</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
