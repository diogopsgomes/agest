'use client';

import { useEffect, useState } from 'react';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUser, postUser, putUser } from '@/lib/api/users';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormSchemaNew = z.object({
	email: z.string({ required_error: 'O email é obrigatório' }).email({ message: 'Email inválido' }),
	name: z.string({ required_error: 'O nome do utilizador é obrigatório' }).nonempty({ message: 'O nome do utilizador é obrigatório' }),
	password: z.string({ required_error: 'A password é obrigatória' }).nonempty({ message: 'A password é obrigatória' }),
});

const FormSchemaEdit = z.object({
	email: z.string({ required_error: 'O email é obrigatório' }).email({ message: 'Email inválido' }),
	name: z.string({ required_error: 'O nome do utilizador é obrigatório' }).nonempty({ message: 'O nome do utilizador é obrigatório' }),
});

export function NewUserForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchemaNew>>({
		resolver: zodResolver(FormSchemaNew),
		defaultValues: {
			email: '',
			name: '',
			password: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchemaNew>) {
		const user = {
			email: data.email,
			name: data.name,
			password: data.password,
		};

		postUser(user)
			.then(() => {
				toast.success('Utilizador criado!');
				router.push('/utilizadores');
			})
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<div className="grid lg:grid-cols-6 gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o nome do utilizador" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="lg:col-span-4">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira a password do utilizador" type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="lg:col-span-4">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o email do utilizador" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Adicionar utilizador</Button>
			</form>
		</Form>
	);
}

export function EditUserForm({ userId }: { userId: string }) {
	const form = useForm<z.infer<typeof FormSchemaEdit>>({
		resolver: zodResolver(FormSchemaEdit),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	useEffect(() => {
		getUser(userId)
			.then((res) => {
				form.reset({
					name: res.data.name ? res.data.name : '',
					email: res.data.email ? res.data.email : '',
				});
			})
			.catch((err) => toast.error(err.message));
	}, [userId, form]);

	function onSubmit(data: z.infer<typeof FormSchemaEdit>) {
		putUser(userId, data)
			.then(() => toast.success('Utilizador atualizado!'))
			.catch((err) => toast.error(err.message));
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 sm:w-2/3 space-y-6">
				<div className="grid lg:grid-cols-6 gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o nome do utilizador" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="lg:col-span-4">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o email do utilizador" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Atualizar utilizador</Button>
			</form>
		</Form>
	);
}
