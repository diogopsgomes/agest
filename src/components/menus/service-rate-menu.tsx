'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { deleteServiceRate } from '@/lib/api/services';
import { Button, buttonVariants } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function ServiceRateMenu({ serviceRateId }: { serviceRateId: string }) {
	const router = useRouter();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<div className="flex justify-between items-center gap-2 mb-8">
			<div className="flex items-center gap-2">
				<Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
					<Trash2 />
					<span>Eliminar tarifa de serviço</span>
				</Button>
				<AlertDialog open={showDeleteDialog}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>De certeza que pretende eliminar a tarifa de serviço?</AlertDialogTitle>
							<AlertDialogDescription>Esta ação não pode ser anulada. Isto irá eliminar permanentemente a tarifa de serviço e remover os seus dados.</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									deleteServiceRate(serviceRateId)
										.then((res) => {
											toast.success('Tarifa de serviço eliminada');
											router.push('/servicos/tarifas');
										})
										.catch((err) => toast.error(err.message))
										.finally(() => setShowDeleteDialog(false))
								}
								className={buttonVariants({ variant: 'destructive' })}
							>
								Eliminar tarifa de serviço
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
