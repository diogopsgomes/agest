'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { RefreshCw, Search } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { getCategories } from '@/lib/api/categories';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Category {
	category_id: string;
	name: string;
}

export default function CategoriesTable() {
	const router = useRouter();

	const [categories, setCategories] = useState<Category[]>([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchCategories = () => {
		setLoading(true);
		getCategories()
			.then((res) => setCategories(res.data))
			.catch((err) => toast.error(err.message, { duration: 12000 }))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const filteredCategories = categories.filter((category) => [category.name].some((field) => field?.toLowerCase().includes(search.toLowerCase())));

	return (
		<>
			<div className="flex justify-between items-center gap-2 mb-4">
				<div className="flex items-center gap-2 flex-1">
					<Search className="w-5" />
					<Input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
					<Button variant="outline" onClick={() => fetchCategories()}>
						<RefreshCw />
						<span>Atualizar</span>
					</Button>
				</div>
			</div>

			<Table>
				<TableCaption className="sr-only">Lista de Categorias</TableCaption>
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
						: filteredCategories.map((category, idx) => (
								<TableRow key={category.category_id} onClick={() => router.push(`/servicos/categorias/${category.category_id}`)} className={idx % 2 === 0 ? 'bg-muted/40 hover:bg-muted' : 'bg-muted/0 hover:bg-muted'}>
									<TableCell className="font-medium">{category.name}</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</>
	);
}
