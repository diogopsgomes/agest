"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { ChevronsUpDown } from "lucide-react";

import { useRouter } from "next/navigation";
import { postQuote } from "@/lib/api/quotes";
import { Input } from "@/components/ui/input";
import { getClients } from "@/lib/api/clients";
import { getTags } from "@/lib/api/tags";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

interface Client {
  client_id: number;
  name: string;
}

interface Tag {
  tag_id: number;
  name: string;
}

interface Service {
  service_id: number;
  name: string;
  hours_default: number;
  service_rate: number;
}

const LineSchema = z.object({
  serviceId: z
    .string()
    .nonempty("Selecione um serviço.")
    .refine((value) => parseInt(value) > 0, "Serviço inválido."),
  hours: z.number().min(0, "Número de horas deve ser maior ou igual a zero."),
  discount: z
    .number()
    .min(0, "Desconto deve ser maior ou igual a zero.")
    .max(100, "Desconto não pode ser maior que 100."),
  subtotal: z.number(),
});

const FormSchema = z.object({
  title: z
    .string({ required_error: "O título do orçamento é obrigatório" })
    .nonempty({ message: "O título do orçamento é obrigatório" }),
  client: z
    .string({
      required_error: "O cliente do orçamento é obrigatório",
    })
    .nonempty({ message: "O cliente do orçamento é obrigatório" }),
  tags: z.array(z.string()).optional(),
  lines: z.array(LineSchema),
});

export function NewQuoteForm() {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [openClient, setOpenClient] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getTags()
      .then((res) => setTags(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      client: "",
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const quote = {
      title: data.title,
      client: data.client,
      tags: (data.tags ?? []).map((tag) => parseInt(tag)),
      user: Cookies.get("id"),
    };

    postQuote(quote)
      .then(() => {
        toast.success("Orçamento criado!");
        router.push("/orcamentos");
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 sm:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Insira o título do orçamento"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cliente</FormLabel>
              <Popover
                open={openClient}
                onOpenChange={setOpenClient}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="font-normal justify-between"
                  >
                    {field.value
                      ? clients.find(
                          (client) =>
                            client.client_id.toString() === field.value
                        )?.name
                      : "Selecione o cliente..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-full"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Pesquisar cliente..." />
                    <CommandList>
                      <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                      {clients.map((client) => (
                        <CommandItem
                          key={client.client_id}
                          value={client.name}
                          onSelect={() => {
                            form.setValue(
                              "client",
                              client.client_id.toString()
                            );
                            setOpenClient(false);
                          }}
                        >
                          {client.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                {tags.length > 0 && (
                  <MultipleSelector
                    defaultOptions={tags.map((tag) => ({
                      label: tag.name,
                      value: tag.tag_id.toString(),
                    }))}
                    placeholder="Selecione as tags..."
                    emptyIndicator={
                      <p className="text-center text-sm text-muted-foreground">
                        Não foram encontradas tags.
                      </p>
                    }
                    className="text-sm"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar orçamento</Button>
      </form>
    </Form>
  );
}
