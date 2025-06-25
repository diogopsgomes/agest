import PageTitle from "@/components/page-title";
import TagsMenu from "@/components/menus/tags-menu";
import TagsTable from "@/components/tables/tags-table";

export default function Tags() {
  return (
    <>
      <PageTitle title="Tags" />
      <TagsMenu />
      <TagsTable />
    </>
  );
}
