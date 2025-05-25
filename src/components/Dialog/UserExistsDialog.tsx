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
};

export function UserExistsDialog({ open, onClose }: UserExistsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-xl shadow-xl w-full max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-center">
              Account already exists
            </DialogTitle>
            <DialogDescription className="text-center">
              A user with this email is already registered. Try logging in or
              use another email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center mt-4">
            <Button
              onClick={onClose}
              variant="default"
              className="w-full cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
