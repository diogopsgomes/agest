"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { deleteService } from "@/lib/api/services";
import { Button, buttonVariants } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function ServiceMenu({ serviceId }: { serviceId: string }) {
	const router = useRouter();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	return (
		<div className="flex justify-between items-center gap-2 mb-7 py-1.5 overflow-x-auto">
			<div className="flex items-center gap-2">
				<Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
					<Trash2 />
					<span>Eliminar serviço</span>
				</Button>
				<AlertDialog open={showDeleteDialog}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>De certeza que pretende eliminar o serviço?</AlertDialogTitle>
							<AlertDialogDescription>Esta ação não pode ser anulada. Isto irá eliminar permanentemente o serviço e remover os seus dados.</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								onClick={() =>
									deleteService(serviceId)
										.then((res) => {
											toast.success("Serviço eliminado");
											router.push("/servicos");
										})
										.catch((err) => toast.error(err.message))
										.finally(() => setShowDeleteDialog(false))
								}
								className={buttonVariants({ variant: "destructive" })}
							>
								Eliminar serviço
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
