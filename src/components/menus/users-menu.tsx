'use client';

import { Plus } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UsersMenu() {
	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Link href="/utilizadores/novo">
					<Button variant="outline">
						<Plus />
						<span>Novo utilizador</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
