import PageTitle from '@/components/page-title';
import ProjectsMenu from '@/components/menus/portfolio-menu';
import PortfolioGrid from '@/components/grids/portfolio-grid';

export default function Portfolio() {
	return (
		<>
			<PageTitle title="Portfólio" />
			<ProjectsMenu />
			<PortfolioGrid />
		</>
	);
}
