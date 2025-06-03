"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cookies } from "next/headers";

const FormSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório" })
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "O email deve ser um endereço de email válido" }),
  password: z
    .string({ required_error: "A password é obrigatória" })
    .nonempty({ message: "A password é obrigatória" })
    .min(12, { message: "A password deve ter pelo menos 12 caracteres" })
    .regex(/[a-z]/, {
      message: "A password deve conter pelo menos uma letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "A password deve conter pelo menos uma letra maiúscula",
    })
    .regex(/\d/, { message: "A password deve conter pelo menos um número" }),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const user = {
      email: data.email,
      password: data.password,
    };
    login(user)
      .then((res) => {
        document.cookie = `token=${res.data.token}; path=/`;
        document.cookie = `name=${res.data.name}; path=/`;

        toast.success("Autenticação efetuada com sucesso!");
        router.push("/");
      })
      .catch((err) => toast.error(err.message));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Insira o seu email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="text-sm"
                  placeholder="Insira a sua password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
