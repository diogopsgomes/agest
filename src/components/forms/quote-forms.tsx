"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useFieldArray, useForm } from "react-hook-form";
import { ChevronsUpDown, Minus, Plus } from "lucide-react";

import { getTags } from "@/lib/api/tags";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { getClients } from "@/lib/api/clients";
import { getServices } from "@/lib/api/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { getQuote, postQuote, putQuote } from "@/lib/api/quotes";
import MultipleSelector from "@/components/ui/multiple-selector";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  service_rate: {
    price: number;
  };
}

const LineSchema = z.object({
  line_service: z
    .string({ required_error: "O serviço da linha é obrigatório" })
    .nonempty("O serviço da linha é obrigatório")
    .refine((value) => parseInt(value) > 0, "Serviço inválido"),
  line_title: z
    .string({ required_error: "O título da linha é obrigatório" })
    .nonempty("O título da linha é obrigatório"),
  line_hours: z
    .number()
    .min(0, "Número de horas deve ser maior ou igual a zero"),
  line_subtotal: z.number(),
  line_discount: z
    .number()
    .min(0, "Desconto deve estar compreendido entre 0 e 100")
    .max(100, "Desconto deve estar compreendido entre 0 e 100"),
  line_total: z.number(),
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

  const [services, setServices] = useState<Service[]>([]);
  const [openServices, setOpenServices] = useState<Record<number, boolean>>({});

  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getTags()
      .then((res) => setTags(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      client: "",
      tags: [],
      lines: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
    shouldUnregister: true,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const quote = {
      title: data.title,
      client: data.client,
      user: Cookies.get("id"),
      tags: (data.tags ?? []).map((tag) => parseInt(tag)),
      lines: data.lines.map((line) => ({
        service_id: parseInt(line.line_service),
        title: line.line_title,
        hours: line.line_hours,
        subtotal: line.line_subtotal,
        discount: line.line_discount / 100,
        total: line.line_total,
      })),
    };

    console.log(quote);

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
                    value={
                      field.value
                        ? tags
                            .filter((tag) =>
                              field.value?.includes(tag.tag_id.toString())
                            )
                            .map((tag) => ({
                              label: tag.name,
                              value: tag.tag_id.toString(),
                            }))
                        : []
                    }
                    onChange={(options) => {
                      field.onChange(options.map((option) => option.value));
                    }}
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
        <div className="space-y-4 py-4">
          <h2 className="text-lg font-semibold leading-tight tracking-tight mb-6">
            Linhas do Orçamento
          </h2>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`lines.${index}.line_service`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-3/12">
                    <FormLabel>Serviço</FormLabel>
                    <Popover
                      open={!!openServices[index]}
                      onOpenChange={(isOpen) => {
                        setOpenServices((prev) => ({
                          ...prev,
                          [index]: isOpen,
                        }));
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="font-normal justify-between"
                        >
                          {field.value
                            ? services.find(
                                (service) =>
                                  service.service_id.toString() === field.value
                              )?.name
                            : "Selecione o serviço..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 w-full"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Pesquisar serviço..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum serviço encontrado.
                            </CommandEmpty>
                            {services.map((service) => (
                              <CommandItem
                                key={service.service_id}
                                value={service.name}
                                onSelect={() => {
                                  form.setValue(
                                    `lines.${index}.line_service`,
                                    service.service_id.toString()
                                  );
                                  form.setValue(
                                    `lines.${index}.line_hours`,
                                    service.hours_default
                                  );

                                  const rate = service.service_rate.price || 0;
                                  const hours =
                                    form.getValues(
                                      `lines.${index}.line_hours`
                                    ) || 0;
                                  const discount =
                                    form.getValues(
                                      `lines.${index}.line_discount`
                                    ) || 0;
                                  const subtotal = hours * rate;
                                  const total = subtotal * (1 - discount / 100);

                                  form.setValue(
                                    `lines.${index}.line_subtotal`,
                                    subtotal
                                  );
                                  form.setValue(
                                    `lines.${index}.line_total`,
                                    total
                                  );

                                  setOpenServices((prev) => ({
                                    ...prev,
                                    [index]: false,
                                  }));
                                }}
                              >
                                {service.name}
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
                name={`lines.${index}.line_title`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-5/12">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="text-sm"
                        placeholder="Insira a descrição do serviço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_hours`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Horas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Insira o número de horas"
                        min={0}
                        {...field}
                        onChange={(e) => {
                          let hours = isNaN(e.target.valueAsNumber)
                            ? 0
                            : e.target.valueAsNumber;

                          if (hours < 0) hours = 0;

                          field.onChange(hours);

                          const service = services.find(
                            (service) =>
                              service.service_id.toString() ===
                              form.getValues(`lines.${index}.line_service`)
                          );

                          const rate = service ? service.service_rate.price : 0;
                          const discount =
                            form.getValues(`lines.${index}.line_discount`) || 0;
                          const subtotal = hours * rate;
                          const total = subtotal * (1 - discount / 100);

                          form.setValue(
                            `lines.${index}.line_subtotal`,
                            subtotal
                          );
                          form.setValue(`lines.${index}.line_total`, total);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_subtotal`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Subtotal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Subtotal"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_discount`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Desconto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Insira a percentagem de desconto"
                        min={0}
                        max={100}
                        {...field}
                        onChange={(e) => {
                          let discount = isNaN(e.target.valueAsNumber)
                            ? 0
                            : e.target.valueAsNumber;

                          if (discount < 0) discount = 0;
                          if (discount > 100) discount = 100;

                          field.onChange(discount);

                          const service = services.find(
                            (service) =>
                              service.service_id.toString() ===
                              form.getValues(`lines.${index}.line_service`)
                          );

                          const rate = service ? service.service_rate.price : 0;
                          const hours =
                            form.getValues(`lines.${index}.line_hours`) || 0;
                          const subtotal = hours * rate;
                          const total = subtotal * (1 - discount / 100);

                          form.setValue(
                            `lines.${index}.line_subtotal`,
                            subtotal
                          );
                          form.setValue(`lines.${index}.line_total`, total);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_total`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Total"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="destructive"
                onClick={() => {
                  setShowDeleteDialog(index);
                }}
              >
                <Minus />
              </Button>
              <AlertDialog open={showDeleteDialog === index}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      De certeza que pretende eliminar esta linha de orçamento?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser anulada.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setShowDeleteDialog(null)}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        remove(index);
                        setShowDeleteDialog(null);
                      }}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Eliminar linha de orçamento
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                line_service: "",
                line_title: "",
                line_hours: 0,
                line_subtotal: 0,
                line_discount: 0,
                line_total: 0,
              })
            }
          >
            <Plus />
          </Button>
        </div>
        <Button type="submit">Adicionar orçamento</Button>
      </form>
    </Form>
  );
}

export function EditQuoteForm({ quoteId }: { quoteId: string }) {
  const router = useRouter();

  const [clients, setClients] = useState<Client[]>([]);
  const [openClient, setOpenClient] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);

  const [services, setServices] = useState<Service[]>([]);
  const [openServices, setOpenServices] = useState<Record<number, boolean>>({});

  const [showDeleteDialog, setShowDeleteDialog] = useState<number | null>(null);

  useEffect(() => {
    getClients()
      .then((res) => setClients(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getTags()
      .then((res) => setTags(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getServices()
      .then((res) => setServices(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getQuote(quoteId)
      .then((res) => {
        form.reset({
          title: res.data.title ? res.data.title : "",
          client: res.data.client.id ? res.data.client.id.toString() : "",
          tags: res.data.tags
            ? res.data.tags.map((tag: any) => tag.tag_id.toString())
            : [],
          lines: res.data.lines
            ? res.data.lines.map((line: any) => ({
                line_service: line.service.id.toString(),
                line_title: line.title,
                line_hours: line.hours,
                line_subtotal: line.subtotal,
                line_discount: line.discount * 100,
                line_total: line.total,
              }))
            : [],
        });
      })
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      client: "",
      tags: [],
      lines: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
    shouldUnregister: true,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putQuote(quoteId, data)
      .then(() => toast.success("Orçamento atualizado!"))
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
                    value={
                      field.value
                        ? tags
                            .filter((tag) =>
                              field.value?.includes(tag.tag_id.toString())
                            )
                            .map((tag) => ({
                              label: tag.name,
                              value: tag.tag_id.toString(),
                            }))
                        : []
                    }
                    onChange={(options) => {
                      field.onChange(options.map((option) => option.value));
                    }}
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
        <div className="space-y-4 py-4">
          <h2 className="text-lg font-semibold leading-tight tracking-tight mb-6">
            Linhas do Orçamento
          </h2>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="flex items-end gap-4"
            >
              <FormField
                control={form.control}
                name={`lines.${index}.line_service`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-3/12">
                    <FormLabel>Serviço</FormLabel>
                    <Popover
                      open={!!openServices[index]}
                      onOpenChange={(isOpen) => {
                        setOpenServices((prev) => ({
                          ...prev,
                          [index]: isOpen,
                        }));
                      }}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="font-normal justify-between"
                        >
                          {field.value
                            ? services.find(
                                (service) =>
                                  service.service_id.toString() === field.value
                              )?.name
                            : "Selecione o serviço..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0 w-full"
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Pesquisar serviço..." />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum serviço encontrado.
                            </CommandEmpty>
                            {services.map((service) => (
                              <CommandItem
                                key={service.service_id}
                                value={service.name}
                                onSelect={() => {
                                  form.setValue(
                                    `lines.${index}.line_service`,
                                    service.service_id.toString()
                                  );
                                  form.setValue(
                                    `lines.${index}.line_hours`,
                                    service.hours_default
                                  );

                                  const rate = service.service_rate.price || 0;
                                  const hours =
                                    form.getValues(
                                      `lines.${index}.line_hours`
                                    ) || 0;
                                  const discount =
                                    form.getValues(
                                      `lines.${index}.line_discount`
                                    ) || 0;
                                  const subtotal = hours * rate;
                                  const total = subtotal * (1 - discount / 100);

                                  form.setValue(
                                    `lines.${index}.line_subtotal`,
                                    subtotal
                                  );
                                  form.setValue(
                                    `lines.${index}.line_total`,
                                    total
                                  );

                                  setOpenServices((prev) => ({
                                    ...prev,
                                    [index]: false,
                                  }));
                                }}
                              >
                                {service.name}
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
                name={`lines.${index}.line_title`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-5/12">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="text-sm"
                        placeholder="Insira a descrição do serviço"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_hours`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Horas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Insira o número de horas"
                        min={0}
                        {...field}
                        onChange={(e) => {
                          let hours = isNaN(e.target.valueAsNumber)
                            ? 0
                            : e.target.valueAsNumber;

                          if (hours < 0) hours = 0;

                          field.onChange(hours);

                          const service = services.find(
                            (service) =>
                              service.service_id.toString() ===
                              form.getValues(`lines.${index}.line_service`)
                          );

                          const rate = service ? service.service_rate.price : 0;
                          const discount =
                            form.getValues(`lines.${index}.line_discount`) || 0;
                          const subtotal = hours * rate;
                          const total = subtotal * (1 - discount / 100);

                          form.setValue(
                            `lines.${index}.line_subtotal`,
                            subtotal
                          );
                          form.setValue(`lines.${index}.line_total`, total);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_subtotal`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Subtotal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Subtotal"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_discount`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Desconto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Insira a percentagem de desconto"
                        min={0}
                        max={100}
                        {...field}
                        onChange={(e) => {
                          let discount = isNaN(e.target.valueAsNumber)
                            ? 0
                            : e.target.valueAsNumber;

                          if (discount < 0) discount = 0;
                          if (discount > 100) discount = 100;

                          field.onChange(discount);

                          const service = services.find(
                            (service) =>
                              service.service_id.toString() ===
                              form.getValues(`lines.${index}.line_service`)
                          );

                          const rate = service ? service.service_rate.price : 0;
                          const hours =
                            form.getValues(`lines.${index}.line_hours`) || 0;
                          const subtotal = hours * rate;
                          const total = subtotal * (1 - discount / 100);

                          form.setValue(
                            `lines.${index}.line_subtotal`,
                            subtotal
                          );
                          form.setValue(`lines.${index}.line_total`, total);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`lines.${index}.line_total`}
                render={({ field }) => (
                  <FormItem className="flex-1 basis-1/12">
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="Total"
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="destructive"
                onClick={() => {
                  setShowDeleteDialog(index);
                }}
              >
                <Minus />
              </Button>
              <AlertDialog open={showDeleteDialog === index}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      De certeza que pretende eliminar esta linha de orçamento?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser anulada.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setShowDeleteDialog(null)}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        remove(index);
                        setShowDeleteDialog(null);
                      }}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      Eliminar linha de orçamento
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              append({
                line_service: "",
                line_title: "",
                line_hours: 0,
                line_subtotal: 0,
                line_discount: 0,
                line_total: 0,
              })
            }
          >
            <Plus />
          </Button>
        </div>
        <Button type="submit">Atualizar orçamento</Button>
      </form>
    </Form>
  );
}
