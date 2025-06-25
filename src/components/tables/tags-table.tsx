'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { RefreshCw, Search } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getTags } from '@/lib/api/tags';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Tag {
	tag_id: string;
	name: string;
}

export default function TagsTable() {
	const router = useRouter();

	const [tags, setTags] = useState<Tag[]>([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchTags = () => {
		setLoading(true);
		getTags()
			.then((res) => setTags(res.data))
			.catch((err) => toast.error(err.message, { duration: 12000 }))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchTags();
	}, []);

	const filteredTags = tags.filter((tag) => [tag.name].some((field) => field?.toLowerCase().includes(search.toLowerCase())));

	return (
		<>
			<div className="flex justify-between items-center gap-2 mb-4">
				<div className="flex items-center gap-2 flex-1">
					<Search className="w-5" />
					<Input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
					<Button variant="outline" onClick={() => fetchTags()}>
						<RefreshCw />
						<span>Atualizar</span>
					</Button>
				</div>
			</div>

			<Table>
				<TableCaption className="sr-only">Lista de Tags</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80%]">Nome</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading
						? Array(15)
								.fill(0)
								.map((_, idx) => (
									<TableRow key={idx} className={idx % 2 === 0 ? 'bg-muted/40 hover:bg-muted' : 'bg-muted/0 hover:bg-muted'}>
										<TableCell>
											<Skeleton className="h-5 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-full" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-5 w-full" />
										</TableCell>
									</TableRow>
								))
						: filteredTags.map((tag, idx) => (
								<TableRow key={tag.tag_id} onClick={() => router.push(`/tags/${tag.tag_id}`)} className={idx % 2 === 0 ? 'bg-muted/40 hover:bg-muted' : 'bg-muted/0 hover:bg-muted'}>
									<TableCell className="font-medium">{tag.name}</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</>
	);
}
