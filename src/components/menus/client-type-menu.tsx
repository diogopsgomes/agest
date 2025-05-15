"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { deleteClientType } from "@/lib/api/clients";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ClientTypeMenu({
  clientTypeId,
}: {
  clientTypeId: string;
}) {
  const router = useRouter();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 />
          <span>Eliminar tipo de cliente</span>
        </Button>
        <AlertDialog open={showDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                De certeza que pretende eliminar o tipo de cliente?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser anulada. Isto irá eliminar
                permanentemente o tipo de cliente e remover os seus dados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteClientType(clientTypeId)
                    .then((res) => {
                      toast.success("Tipo de cliente eliminado");
                      router.push("/clientes/tipos");
                    })
                    .catch((err) => toast.error(err.message))
                    .finally(() => setShowDeleteDialog(false))
                }
                className={buttonVariants({ variant: "destructive" })}
              >
                Eliminar tipo de cliente
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
