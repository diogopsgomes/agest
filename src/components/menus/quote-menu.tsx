"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { Download, Loader2, Mail, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  deleteQuote,
  generateQuoteDocument,
  getQuote,
  sendQuoteDocument,
} from "@/lib/api/quotes";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

  const [email, setEmail] = useState("");
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    getQuote(quoteId)
      .then((res) => {
        setEmail(res.data.client.email || "");
      })
      .catch((err) => {
        toast.error("Erro ao carregar o email do cliente");
        console.error(err);
      });
  }, [quoteId]);

  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          onClick={() => {
            setLoadingDownload(true);
            generateQuoteDocument(quoteId)
              .then((res) => {
                const blob = new Blob(
                  [
                    Uint8Array.from(atob(res.data.base64), (c) =>
                      c.charCodeAt(0)
                    ),
                  ],
                  { type: "application/pdf" }
                );

                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = res.data.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                URL.revokeObjectURL(url);
              })
              .catch((err) => toast.error(err.message))
              .finally(() => setLoadingDownload(false));
          }}
          disabled={loadingDownload}
        >
          {loadingDownload ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Download />
          )}
          Download ficheiro
        </Button>
        <Button
          variant="default"
          onClick={() => setShowEmailDialog(true)}
        >
          <Mail />
          Enviar ficheiro
        </Button>
        <Dialog
          open={showEmailDialog}
          onOpenChange={setShowEmailDialog}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enviar ficheiro</DialogTitle>
              <DialogDescription>
                Insira o email para o qual pretende enviar o ficheiro.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() =>
                  sendQuoteDocument(quoteId, email)
                    .then((res) => {
                      toast.success("Orçamento enviado");
                    })
                    .catch((err) => toast.error(err.message))
                }
              >
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 />
          <span>Eliminar orçamento</span>
        </Button>
        <AlertDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        >
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
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteQuote(quoteId)
                    .then((res) => {
                      toast.success("Orçamento eliminado");
                      router.push("/quotes");
                    })
                    .catch((err) => toast.error(err.message))
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
