"use client";

import { z } from "zod";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-dropdown-menu";

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
  remember: z.boolean().optional(),
});

export function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const user = {
      email: data.email,
      password: data.password,
    };
    login(user)
      .then((res) => {
        if (data.remember) {
          Cookies.set("token", res.data.token, { path: "/", expires: 30 });
          Cookies.set("id", res.data.user_id, { path: "/", expires: 30 });
          Cookies.set("name", res.data.name, { path: "/", expires: 30 });
          Cookies.set("email", res.data.email, { path: "/", expires: 30 });
        } else {
          Cookies.set("token", res.data.token, { path: "/" });
          Cookies.set("id", res.data.user_id, { path: "/" });
          Cookies.set("name", res.data.name, { path: "/" });
          Cookies.set("email", res.data.email, { path: "/" });
        }

        toast.success("Sessão iniciada com sucesso!");
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
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Lembrar-me</FormLabel>
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
