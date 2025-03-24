"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getClientTypes, postClient } from "@/lib/api/clients";
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
  name: z.string(),
  company: z.string(),
  vat: z.string(),
  email: z.string().email({
    message: "Endereço de email inválido.",
  }),
  tlm: z.string(),
  tlf: z.string(),
  type: z.string(),
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
