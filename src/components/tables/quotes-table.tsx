'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { RefreshCw, Search } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { getQuotes } from '@/lib/api/quotes';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Quote {
	quote_id: string;
	creation_date: string;
	title: string;
	discount: string;
	total: string;
	client: {
		name: string;
	};
}

export default function QuotesTable() {
	const router = useRouter();

	const [quotes, setQuotes] = useState<Quote[]>([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchQuotes = () => {
		setLoading(true);
		getQuotes()
			.then((res) => setQuotes(res.data))
			.catch((err) => toast.error(err.message, { duration: 12000 }))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	const filteredQuotes = quotes.filter((quote) => [quote.title, quote.client.name].some((field) => field?.toLowerCase().includes(search.toLowerCase())));

	return (
		<>
			<div className="flex justify-between items-center gap-2 mb-4">
				<div className="flex items-center gap-2 flex-1">
					<Search className="w-5" />
					<Input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
					<Button variant="outline" onClick={() => fetchQuotes()}>
						<RefreshCw />
						<span>Atualizar</span>
					</Button>
				</div>
			</div>

			<Table>
				<TableCaption className="sr-only">Lista de Orçamentos</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[25%]">Título</TableHead>
						<TableHead className="w-[25%]">Cliente</TableHead>
						<TableHead>Data de Criação</TableHead>
						<TableHead>Desconto</TableHead>
						<TableHead>Total</TableHead>
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
						: filteredQuotes.map((quote, idx) => (
								<TableRow key={quote.quote_id} onClick={() => router.push(`/orcamentos/${quote.quote_id}`)} className={idx % 2 === 0 ? 'bg-muted/40 hover:bg-muted' : 'bg-muted/0 hover:bg-muted'}>
									<TableCell className="font-medium">{quote.title}</TableCell>
									<TableCell className="font-medium">{quote.client.name}</TableCell>
									<TableCell>{quote.creation_date}</TableCell>
									<TableCell>{quote.discount}</TableCell>
									<TableCell>{quote.total}</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</>
	);
}
