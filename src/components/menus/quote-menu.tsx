"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Download, Mail, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteQuote, generateQuotePDF } from "@/lib/api/quotes";
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

export default function QuoteMenu({ quoteId }: { quoteId: string }) {
  const router = useRouter();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          onClick={() => {
            generateQuotePDF(quoteId)
              .then((res) => {
                const blob = new Blob(
                  [
                    Uint8Array.from(atob(res.data.buffer), (c) =>
                      c.charCodeAt(0)
                    ),
                  ],
                  { type: "application/pdf" }
                );
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
              })
              .catch((err) => toast.error(err.message));
          }}
        >
          <Download />
          Download ficheiro
        </Button>
        <Button
          variant="default"
          onClick={() => {
            generateQuotePDF(quoteId)
              .then((res) => {
                const blob = new Blob(
                  [
                    Uint8Array.from(atob(res.data.buffer), (c) =>
                      c.charCodeAt(0)
                    ),
                  ],
                  { type: "application/pdf" }
                );
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
              })
              .catch((err) => toast.error(err.message));
          }}
        >
          <Mail />
          Enviar ficheiro
        </Button>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 />
          <span>Eliminar orçamento</span>
        </Button>
        <AlertDialog open={showDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                De certeza que pretende eliminar o orçamento?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser anulada. Isto irá eliminar
                permanentemente o orçamento e remover os seus dados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteQuote(quoteId)
                    .then((res) => {
                      toast.success("Orçamento eliminado");
                      router.push("/quotes");
                    })
                    .catch((err) => toast.error(err.message))
                    .finally(() => setShowDeleteDialog(false))
                }
                className={buttonVariants({ variant: "destructive" })}
              >
                Eliminar orçamento
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
