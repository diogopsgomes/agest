"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { deleteCategory } from "@/lib/api/categories";
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

export default function CategoryMenu({ categoryId }: { categoryId: string }) {
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
          <span>Eliminar categoria</span>
        </Button>
        <AlertDialog open={showDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                De certeza que pretende eliminar a categoria?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser anulada. Isto irá eliminar
                permanentemente a categoria e remover os seus dados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteCategory(categoryId)
                    .then((res) => {
                      toast.success("Categoria eliminada");
                      router.push("/categorias");
                    })
                    .catch((err) => toast.error(err.message))
                    .finally(() => setShowDeleteDialog(false))
                }
                className={buttonVariants({ variant: "destructive" })}
              >
                Eliminar categoria
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
