import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type UserExistsDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  btn: string;
};

export function UserExistsDialog({ open, onClose, title, description, btn }: UserExistsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-xl shadow-xl w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-center">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center">
            {description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center mt-4">
            <Button
              onClick={onClose}
              variant="default"
              className="w-full cursor-pointer"
            >
              {btn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
