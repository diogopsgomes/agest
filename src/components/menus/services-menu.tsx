"use client";

import { Plus } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Link href="/servicos/novo">
          <Button variant="outline">
            <Plus />
            <span>Novo serviço</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
