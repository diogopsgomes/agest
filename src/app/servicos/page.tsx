import PageTitle from '@/components/page-title';
import ServicesMenu from '@/components/menus/services-menu';
import ServicesTable from '@/components/tables/services-table';

export default function Servicos() {
	return (
		<>
			<PageTitle title="Serviços" />
			<ServicesMenu />
			<ServicesTable />
		</>
	);
}
