import QuoteMenu from "@/components/menus/quote-menu";
import QuoteFrame from "@/components/frames/quote-frame";
import { EditQuoteForm } from "@/components/forms/quote-forms";

export default async function DetalhesOrcamento({
  params,
}: {
  params: { id: string };
}) {
  params = await params;

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Detalhes de orçamento</h1>
      <QuoteMenu quoteId={String(params.id)} />
      <div className="flex flex-col xl:flex-row gap-8">
        <EditQuoteForm quoteId={String(params.id)} />
        <QuoteFrame quoteId={String(params.id)} />
      </div>
    </>
  );
}
