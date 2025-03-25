"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getClient,
  getClientTypes,
  postClient,
  putClient,
} from "@/lib/api/clients";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ClientType {
  client_type_id: number;
  name: string;
}

const FormSchema = z.object({
  name: z
    .string({ required_error: "O nome do cliente é obrigatório" })
    .nonempty({ message: "O nome do cliente é obrigatório" }),
  company: z
    .string({
      required_error: "A designação da empresa do cliente é obrigatória",
    })
    .nonempty({ message: "A designação da empresa do cliente é obrigatória" }),
  vat: z
    .string({ required_error: "O NIPC do cliente é obrigatório" })
    /* .nonempty({ message: "O NIPC do cliente é obrigatório" }) */
    .optional(),
  email: z
    .string({ required_error: "O email do cliente é obrigatório" })
    /* .nonempty({ message: "O email do cliente é obrigatório" }) */
    /* .email({ message: "Endereço de email inválido." }) */
    .optional(),
  tlm: z
    .string({ required_error: "O telemóvel do cliente é obrigatório" })
    /* .nonempty({ message: "O telemóvel do cliente é obrigatório" }) */
    .optional(),
  tlf: z
    .string({ required_error: "O telefone do cliente é obrigatório" })
    /* .nonempty({ message: "O telefone do cliente é obrigatório" }) */
    .optional(),
  type: z
    .string({ required_error: "O tipo de cliente é obrigatório" })
    /* .nonempty({ message: "O tipo de cliente é obrigatório" }) */
    .optional(),
});

export function NewClientForm() {
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);

  useEffect(() => {
    getClientTypes()
      .then((res) => setClientTypes(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const client = {
      name: data.name,
      vat: data.vat,
      email: data.email,
      tlm: data.tlm,
      tlf: data.tlf,
      client_type: data.type,
    };

    postClient(client);

    redirect("/clientes");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 sm:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Insira o nome do cliente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Insira a designação da empresa do cliente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="vat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIPC</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o NIPC do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o email do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tlm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telemóvel</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o número de telemóvel do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tlf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o número de telefone do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Cliente</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientTypes.map((type) => (
                    <SelectItem
                      key={type.client_type_id}
                      value={String(type.client_type_id)}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar cliente</Button>
      </form>
    </Form>
  );
}

export function EditClientForm({ clientId }: { clientId: string }) {
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    getClientTypes()
      .then((res) => setClientTypes(res.data))
      .catch((err) => toast.error(err.message));
    getClient(clientId)
      .then((res) => {
        form.reset({
          name: res.data.name ? res.data.name : "",
          company: res.data.company ? res.data.company : "",
          vat: res.data.vat ? res.data.vat : "",
          email: res.data.email ? res.data.email : "",
          tlm: res.data.tlm ? res.data.tlm : "",
          tlf: res.data.tlf ? res.data.tlf : "",
          type: String(res.data.client_type_id)
            ? String(res.data.client_type_id)
            : "",
        });
      })
      .catch((err) => toast.error(err.message));
  }, [clientId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putClient(clientId, data)
      .then((res) => {
        toast.success("Cliente atualizado!");
        /* toast.info(JSON.stringify(res)); */
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Nome do cliente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Empresa do cliente"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="vat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIPC</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="NIPC do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Email do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tlm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telemóvel</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Telemóvel do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tlf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Telefone do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Cliente</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clientTypes.map((type) => (
                    <SelectItem
                      key={type.client_type_id}
                      value={String(type.client_type_id)}
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Atualizar cliente</Button>
      </form>
    </Form>
  );
}
