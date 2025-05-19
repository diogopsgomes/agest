import PageTitle from '@/components/page-title';
import CategoriesMenu from '@/components/menus/categories-menu';
import CategoriesTable from '@/components/tables/categories-table';

export default function Categorias() {
	return (
		<>
			<PageTitle title="Categorias" />
			<CategoriesMenu />
			<CategoriesTable />
		</>
	);
}
