"use client";

import { Plus } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoriesMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-7 py-1.5 overflow-x-auto">
      <div className="flex items-center gap-2">
        <Link href="/categorias/nova">
          <Button variant="outline">
            <Plus />
            <span>Nova categoria</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
