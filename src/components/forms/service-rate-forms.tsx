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
  getServiceRate,
  postServiceRate,
  putServiceRate,
} from "@/lib/api/services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  name: z
    .string({ required_error: "O nome da tarifa de serviço é obrigatório" })
    .nonempty({ message: "O nome da tarifa de serviço é obrigatório" }),
  price: z
    .string({
      required_error: "O preço da tarifa de serviço é obrigatório",
    })
    .nonempty({
      message: "O preço da tarifa de serviço é obrigatório",
    }),
});

export function NewServiceRateForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const serviceRate = {
      name: data.name,
      price: data.price,
    };

    postServiceRate(serviceRate)
      .then(() => {
        toast.success("Tarifa de serviço criada!");
        router.push("/servicos/tarifas");
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
            name="name"
            render={({ field }) => (
              <FormItem className="lg:col-span-4">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o nome da tarifa de serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ajuste de preço</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o preço da tarifa de serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Adicionar tarifa de serviço</Button>
      </form>
    </Form>
  );
}

export function EditServiceRateForm({
  serviceRateId,
}: {
  serviceRateId: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  useEffect(() => {
    getServiceRate(serviceRateId)
      .then((res) => {
        form.reset({
          name: res.data.name ? res.data.name : "",
          price: res.data.price ? res.data.price : "",
        });
      })
      .catch((err) => toast.error(err.message));
  }, [serviceRateId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putServiceRate(serviceRateId, data)
      .then(() => toast.success("Tarifa de serviço atualizada!"))
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
            name="name"
            render={({ field }) => (
              <FormItem className="lg:col-span-4">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o nome da tarifa de serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o preço da tarifa de serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Atualizar tarifa de serviço</Button>
      </form>
    </Form>
  );
}
