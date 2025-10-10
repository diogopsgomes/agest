"use client";

import { LayoutGrid, Plus, Tags } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectsMenu() {
  return (
    <div className="flex justify-between items-center gap-2 mb-7 py-1.5 overflow-x-auto">
      <div className="flex items-center gap-2">
        <Link href="/portfolio/novo">
          <Button variant="outline">
            <Plus />
            <span>Novo projeto</span>
          </Button>
        </Link>
        <Link href="/categorias">
          <Button variant="outline">
            <LayoutGrid />
            <span>Categorias</span>
          </Button>
        </Link>
        <Link href="/tags">
          <Button variant="outline">
            <Tags />
            <span>Tags</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
