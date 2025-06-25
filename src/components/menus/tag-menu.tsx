"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { deleteTag } from "@/lib/api/tags";
import { useRouter } from "next/navigation";
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

export default function TagMenu({ tagId }: { tagId: string }) {
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
          <span>Eliminar tag</span>
        </Button>
        <AlertDialog open={showDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                De certeza que pretende eliminar a tag?
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
                  deleteTag(tagId)
                    .then((res) => {
                      toast.success("Tag eliminada");
                      router.push("/tags");
                    })
                    .catch((err) => toast.error(err.message))
                    .finally(() => setShowDeleteDialog(false))
                }
                className={buttonVariants({ variant: "destructive" })}
              >
                Eliminar tag
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
