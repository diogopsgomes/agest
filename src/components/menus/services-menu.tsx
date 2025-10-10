"use client";

import { LayoutGrid, Percent, Plus } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesMenu() {
	return (
		<div className="flex justify-between items-center gap-2 mb-7 py-1.5 overflow-x-auto">
			<div className="flex items-center gap-2">
				<Link href="/servicos/novo">
					<Button variant="outline">
						<Plus />
						<span>Novo serviço</span>
					</Button>
				</Link>
				<Link href="/servicos/tarifas">
					<Button variant="outline">
						<Percent />
						<span>Tarifas de serviço</span>
					</Button>
				</Link>
				<Link href="/categorias">
					<Button variant="outline">
						<LayoutGrid />
						<span>Categorias</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
