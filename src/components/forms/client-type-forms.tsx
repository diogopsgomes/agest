"use client";

import { useEffect } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getClientType,
  postClientType,
  putClientType,
} from "@/lib/api/clients";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  sku: z
    .string({ required_error: "O SKU do tipo de cliente é obrigatório" })
    .nonempty({ message: "O SKU do tipo de cliente é obrigatório" }),
  name: z
    .string({ required_error: "O nome do tipo de cliente é obrigatório" })
    .nonempty({ message: "O nome do tipo de cliente é obrigatório" }),
  price_adjust: z
    .string({
      required_error: "O ajuste de preço do tipo de cliente é obrigatório",
    })
    .nonempty({
      message: "O ajuste de preço do tipo de cliente é obrigatório",
    }),
});

export function NewClientTypeForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sku: "",
      name: "",
      price_adjust: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const clientType = {
      sku: data.sku,
      name: data.name,
      price_adjust: data.price_adjust,
    };

    postClientType(clientType)
      .then(() => {
        toast.success("Tipo de cliente criado!");
        router.push("/clientes/tipos");
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 sm:w-2/3 space-y-6"
      >
        <div className="grid lg:grid-cols-6 gap-6">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o SKU do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="lg:col-span-4">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o nome do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_adjust"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ajuste de preço</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o ajuste de preço do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Adicionar tipo de cliente</Button>
      </form>
    </Form>
  );
}

export function EditClientTypeForm({ clientTypeId }: { clientTypeId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sku: "",
      name: "",
      price_adjust: "",
    },
  });

  useEffect(() => {
    getClientType(clientTypeId)
      .then((res) => {
        form.reset({
          sku: res.data.sku ? res.data.sku : "",
          name: res.data.name ? res.data.name : "",
          price_adjust: res.data.price_adjust ? res.data.price_adjust : "",
        });
      })
      .catch((err) => toast.error(err.message));
  }, [clientTypeId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putClientType(clientTypeId, data)
      .then(() => toast.success("Tipo de cliente atualizado!"))
      .catch((err) => toast.error(err.message));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 sm:w-2/3 space-y-6"
      >
        <div className="grid lg:grid-cols-6 gap-6">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o SKU do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="lg:col-span-4">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o nome do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_adjust"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ajuste de preço</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o ajuste de preço do tipo de cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Atualizar tipo de cliente</Button>
      </form>
    </Form>
  );
}
