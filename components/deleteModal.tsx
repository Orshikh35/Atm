// components/ui/deleteModal.tsx
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  type DeleteDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  };
  
  export function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Та итгэлтэй байна уу?</DialogTitle>
            <DialogDescription>
              Энэ мэдээлэл уствал сэргээгдэхгүй.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Үгүй
            </Button>
            <Button variant="destructive" onClick={onConfirm} className="bg-red-600">
              Тийм, устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  