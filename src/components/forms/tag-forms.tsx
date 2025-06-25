'use client';

import { useEffect } from 'react';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { getTag, postTag, putTag } from '@/lib/api/tags';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
	name: z.string({ required_error: 'O nome da tag é obrigatório' }).nonempty({ message: 'O nome da tag é obrigatório' }),
});

export function NewTagForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const tag = {
			name: data.name,
		};

		postTag(tag)
			.then(() => {
				toast.success('Tag criada!');
				router.push('/tags');
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
							<FormItem className="lg:col-span-4">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o nome da tag" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Adicionar tag</Button>
			</form>
		</Form>
	);
}

export function EditTagForm({ tagId }: { tagId: string }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
		},
	});

	useEffect(() => {
		getTag(tagId)
			.then((res) => {
				form.reset({
					name: res.data.name ? res.data.name : '',
				});
			})
			.catch((err) => toast.error(err.message));
	}, [tagId, form]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		putTag(tagId, data)
			.then(() => toast.success('Tag atualizada!'))
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
							<FormItem className="lg:col-span-4">
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input className="text-sm" placeholder="Insira o nome da tag" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Atualizar tag</Button>
			</form>
		</Form>
	);
}
