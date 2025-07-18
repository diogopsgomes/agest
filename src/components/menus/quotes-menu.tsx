'use client';

import { Plus, Tags } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function QuotesMenu() {
	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Link href="/orcamentos/novo">
					<Button variant="outline">
						<Plus />
						<span>Novo orçamento</span>
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
