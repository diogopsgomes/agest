'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { RefreshCw, Search } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { getServiceRates } from '@/lib/api/services';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ServiceRate {
	service_rate_id: string;
	name: string;
	price: number;
}

export default function ServiceRatesTable() {
	const router = useRouter();

	const [serviceRates, setServiceRates] = useState<ServiceRate[]>([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchServiceRates = () => {
		setLoading(true);
		getServiceRates()
			.then((res) => setServiceRates(res.data))
			.catch((err) => toast.error(err.message, { duration: 12000 }))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchServiceRates();
	}, []);

	const filteredServiceRates = serviceRates.filter((serviceRate) => [serviceRate.name].some((field) => field?.toLowerCase().includes(search.toLowerCase())));

	return (
		<>
			<div className="flex justify-between items-center gap-2 mb-4">
				<div className="flex items-center gap-2 flex-1">
					<Search className="w-5" />
					<Input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-md" />
					<Button variant="outline" onClick={() => fetchServiceRates()}>
						<RefreshCw />
						<span>Atualizar</span>
					</Button>
				</div>
			</div>

			<Table>
				<TableCaption className="sr-only">Lista de Tarifas de Serviço</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80%]">Nome</TableHead>
						<TableHead className="w-[10%]">Preço</TableHead>
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
						: filteredServiceRates.map((serviceRate, idx) => (
								<TableRow key={serviceRate.service_rate_id} onClick={() => router.push(`/servicos/tarifas/${serviceRate.service_rate_id}`)} className={idx % 2 === 0 ? 'bg-muted/40 hover:bg-muted' : 'bg-muted/0 hover:bg-muted'}>
									<TableCell className="font-medium">{serviceRate.name}</TableCell>
									<TableCell>{serviceRate.price}</TableCell>
								</TableRow>
						  ))}
				</TableBody>
			</Table>
		</>
	);
}
