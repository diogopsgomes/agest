"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getService,
  getServiceRates,
  postService,
  putService,
} from "@/lib/api/services";
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
import { getCategories } from "@/lib/api/categories";

interface ServiceRate {
  service_rate_id: number;
  name: string;
  price: number;
}

interface Category {
  category_id: number;
  name: string;
}

const FormSchema = z.object({
  sku: z
    .string({ required_error: "O SKU do serviço é obrigatório" })
    .nonempty({ message: "O SKU do serviço é obrigatório" }),
  name: z
    .string({ required_error: "O nome do serviço é obrigatório" })
    .nonempty({ message: "O nome do serviço é obrigatório" }),
  hours_default: z
    .string({
      required_error:
        "A quantidade de horas por defeito do serviço é obrigatória",
    })
    .nonempty({
      message: "A quantidade de horas por defeito do serviço é obrigatória",
    }),
  service_rate: z
    .string({ required_error: "A taxa de serviço é obrigatória" })
    .nonempty({ message: "A taxa de serviço é obrigatória" }),
  category: z
    .string({ required_error: "A categoria é obrigatória" })
    .nonempty({ message: "A categoria é obrigatória" }),
});

export function NewServiceForm() {
  const router = useRouter();

  const [serviceRates, setServiceRates] = useState<ServiceRate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getServiceRates()
      .then((res) => setServiceRates(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sku: "",
      name: "",
      hours_default: "",
      service_rate: "",
      category: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const service = {
      sku: data.sku,
      name: data.name,
      hours_default: data.hours_default,
      service_rate: data.service_rate,
      category: data.category,
    };

    postService(service)
      .then(() => {
        toast.success("Serviço criado!");
        router.push("/servicos");
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
                    placeholder="Insira o SKU do serviço"
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
                    placeholder="Insira o nome do serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours_default"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas por defeito</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o número de horas por defeito do serviço"
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
          name="service_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxa de Serviço</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a taxa de serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceRates.map((rate) => (
                    <SelectItem
                      key={rate.service_rate_id}
                      value={String(rate.service_rate_id)}
                    >
                      {rate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.category_id}
                      value={String(category.category_id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar serviço</Button>
      </form>
    </Form>
  );
}

export function EditServiceForm({ serviceId }: { serviceId: string }) {
  const [serviceRates, setServiceRates] = useState<ServiceRate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sku: "",
      name: "",
      hours_default: "",
      service_rate: "",
    },
  });

  useEffect(() => {
    getServiceRates()
      .then((res) => setServiceRates(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getService(serviceId)
      .then((res) => {
        form.reset({
          sku: res.data.sku ? res.data.sku : "",
          name: res.data.name ? res.data.name : "",
          hours_default: res.data.hours_default
            ? String(res.data.hours_default)
            : "",
          service_rate: res.data.service_rate.id
            ? String(res.data.service_rate.id)
            : "",
          category: res.data.category.id ? String(res.data.category.id) : "",
        });
      })
      .catch((err) => toast.error(err.message));
  }, [serviceId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putService(serviceId, data)
      .then(() => toast.success("Serviço atualizado!"))
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
                    placeholder="Insira o SKU do serviço"
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
                    placeholder="Insira o nome do serviço"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours_default"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas por defeito</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o número de horas por defeito do serviço"
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
          name="service_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxa de Serviço</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a taxa de serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceRates.map((rate) => (
                    <SelectItem
                      key={rate.service_rate_id}
                      value={String(rate.service_rate_id)}
                    >
                      {rate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.category_id}
                      value={String(category.category_id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Atualizar serviço</Button>
      </form>
    </Form>
  );
}
