'use client';

import { Plus } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TagsMenu() {
	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Link href="/tags/nova">
					<Button variant="outline">
						<Plus />
						<span>Nova tag</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
