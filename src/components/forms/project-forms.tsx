"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { getTags } from "@/lib/api/tags";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getCategories } from "@/lib/api/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProject, postProject, putProject } from "@/lib/api/projects";
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
import MultipleSelector from "../ui/multiple-selector";

interface Category {
  category_id: number;
  name: string;
}

interface Tag {
  tag_id: number;
  name: string;
}

const FormSchema = z.object({
  name: z
    .string({ required_error: "O nome do projeto é obrigatório" })
    .nonempty({ message: "O nome do projeto é obrigatório" }),
  description: z
    .string({
      required_error: "A descrição do projeto é obrigatória",
    })
    .optional(),
  url: z
    .string({ required_error: "O url do projeto é obrigatório" })
    .optional(),
  image_url: z
    .string({ required_error: "O url da imagem do projeto é obrigatório" })
    .optional(),
  category: z.string({
    required_error: "A categoria do projeto é obrigatória",
  }),
  tags: z.array(z.string()).optional(),
});

export function NewProjectForm() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getTags()
      .then((res) => setTags(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      image_url: "",
      category: "",
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const project = {
      name: data.name,
      description: data.description,
      url: data.url,
      image_url: data.image_url,
      category: data.category,
      tags: (data.tags ?? []).map((tag) => parseInt(tag)),
    };

    postProject(project)
      .then(() => {
        toast.success("Projeto criado!");
        router.push("/portfolio");
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
                  placeholder="Insira o nome do projeto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="text-sm min-h-30"
                  placeholder="Insira a descrição do projeto"
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o URL do projeto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o URL da imagem do projeto"
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
                    <SelectValue placeholder="Selecione a categoria do projeto" />
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
        <Button type="submit">Adicionar projeto</Button>
      </form>
    </Form>
  );
}

export function EditProjectForm({ projectId }: { projectId: string }) {
  const [categories, setCategories] = useState<Category[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      image_url: "",
      category: "",
      tags: [],
    },
  });

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => toast.error(err.message));
    getTags()
      .then((res) => setTags(res.data))
      .catch((err) => toast.error(err.message, { duration: 12000 }));
    getProject(projectId)
      .then((res) => {
        form.reset({
          name: res.data.name ? res.data.name : "",
          description: res.data.description ? res.data.description : "",
          url: res.data.url ? res.data.url : "",
          image_url: res.data.image_url ? res.data.image_url : "",
          category: res.data.category.id ? String(res.data.category.id) : "",
          tags: res.data.tags
            ? res.data.tags.map((tag: any) => tag.tag_id.toString())
            : [],
        });
      })
      .catch((err) => toast.error(err.message));
  }, [projectId, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    putProject(projectId, data)
      .then(() => toast.success("Projeto atualizado!"))
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  className="text-sm min-h-30"
                  placeholder="Insira a descrição do projeto"
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o URL do projeto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="Insira o URL da imagem do projeto"
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
                    <SelectValue placeholder="Selecione a categoria do projeto" />
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
        <Button type="submit">Atualizar projeto</Button>
      </form>
    </Form>
  );
}
