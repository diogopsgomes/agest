import { EditServiceRateForm } from '@/components/forms/service-rate-forms';
import ServiceRateMenu from '@/components/menus/service-rate-menu';

export default async function DetalhesTarifaServico({ params }: { params: { id: string } }) {
	params = await params;

	return (
		<>
			<h1 className="text-2xl font-semibold mb-8">Detalhes de tarifa de serviço</h1>
			<ServiceRateMenu serviceRateId={String(params.id)} />
			<EditServiceRateForm serviceRateId={String(params.id)} />
		</>
	);
}
