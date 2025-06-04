"use client";

import { useEffect } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategory, postCategory, putCategory } from "@/lib/api/categories";
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
    .string({ required_error: "O nome da categoria é obrigatório" })
    .nonempty({ message: "O nome da categoria é obrigatório" }),
});

export function NewCategoryForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const category = {
      name: data.name,
    };

    postCategory(category)
      .then(() => {
        toast.success("Categoria criada!");
        router.push("/categorias");
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
                    placeholder="Insira o nome da categoria"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Adicionar categoria</Button>
      </form>
    </Form>
  );
}

export function EditCategoryForm({ categoryId }: { categoryId: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    getCategory(categoryId)
      .then((res) => {
        form.reset({
          name: res.data.name ? res.data.name : "",
        });
      })
      .catch((err) => toast.error(err.message));
  }, [categoryId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putCategory(categoryId, data)
      .then(() => toast.success("Categoria atualizada!"))
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
                    placeholder="Insira o nome da categoria"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Atualizar categoria</Button>
      </form>
    </Form>
  );
}
