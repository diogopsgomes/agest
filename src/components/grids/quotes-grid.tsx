"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Calendar, RefreshCw, Search, User } from "lucide-react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getQuotes } from "@/lib/api/quotes";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export default function QuotesGrid() {
  const router = useRouter();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredQuotes = quotes.filter((quote) =>
    [quote.title].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-8">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-5" />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
          />
          <Button
            variant="outline"
            onClick={() => fetchQuotes()}
          >
            <RefreshCw />
            <span>Atualizar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, idx) => (
              <Card
                key={idx}
                className={idx % 2 === 0 ? "bg-muted/40" : "bg-muted/0"}
              >
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="h-4 w-2/4" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
        ) : filteredQuotes.length > 0 ? (
          filteredQuotes.map((quote) => (
            <Card
              key={quote.quote_id}
              className="justify-between"
            >
              <CardHeader>
                <CardTitle>{quote.title}</CardTitle>
                <CardDescription>
                  <div className="flex gap-1 text-sm text-muted-foreground">
                    <User className="w-[1em] h-[fit-content] mt-[0.2em] shrink-0" />
                    {quote.client.name}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 text-muted-foreground text-xs">
                    <Calendar className="w-[1em] h-[fit-content] mt-[0.1em] shrink-0" />
                    {new Date(quote.creation_date).toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                  <p className="text-sm">
                    <strong>Total:</strong> {quote.total}€
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  onClick={() => router.push(`/orcamentos/${quote.quote_id}`)}
                  className="w-full"
                >
                  Ver orçamento
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhum orçamento encontrado</p>
          </div>
        )}
      </div>
    </>
  );
}
