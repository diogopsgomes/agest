"use client";

import { Plus } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceRatesMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Link href="/servicos/tarifas/nova">
          <Button variant="outline">
            <Plus />
            <span>Nova tarifa de serviço</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
