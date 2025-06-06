import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { CircleX, Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/services/lib/utils";
import { passwordValidation } from "@/services/validation/authValidation";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  type User,
} from "firebase/auth";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { FirebaseError } from "firebase/app";
import { toast } from "sonner";

type PasswordData = {
  newPassword: string;
  currentPassword: string;
};

export const ProfilePassword = () => {
  const user = useAuthUser();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PasswordData>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePasswordChange = async (user: User, data: PasswordData) => {
    try {
      setIsLoading(true);
      const credential = EmailAuthProvider.credential(
        user.email!,
        data.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      toast.success("Password successfully changed");
    } catch (error: unknown) {
      if ((error as FirebaseError).code === "auth/wrong-password") {
        toast.error("Wrong current password");
      } else {
        toast.error("Error updating password");
      }
    } finally {
      reset();
      setIsLoading(true);
    }
  };

  const onSubmit = async (data: PasswordData) => {
    if (!user) return;
    if (data.currentPassword === data.newPassword) {
      toast.error("New password must be different from current password");
      return;
    }
    await handlePasswordChange(user, data);
  };

  return (
    <div className="flex-col rounded-xl border border-primary-light backdrop-blur-[4px] bg-muted/40 p-6 w-full  transition-shadow shadow-[var(--shadow)] space-y-4">
      <h1
        onClick={() => setIsVisible((prev) => !prev)}
        className="flex justify-center items-center text-lg font-medium text-foreground cursor-pointer hover:text-primary"
      >
        Change password
      </h1>

      {isVisible && (
        <>
          <div className="space-y-4">
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="Current password"
                {...register("currentPassword", {
                  required: "Enter current password",
                })}
                className={cn(
                  "h-10 px-4 bg-muted",
                  errors.currentPassword && "border-destructive"
                )}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                onClick={() => setShowCurrent((prev) => !prev)}
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.currentPassword && (
                <p className="text-destructive  mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                placeholder="New password"
                {...register("newPassword", passwordValidation)}
                className={cn(
                  "h-10 px-4 bg-muted",
                  errors.newPassword && "border-destructive"
                )}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                onClick={() => setShowNew((prev) => !prev)}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
              {errors.newPassword && (
                <p className="text-destructive  mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-4 bg-primary hover:bg-primary/80 cursor-pointer"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
            ) : (
              "Save password"
            )}
          </Button>

          <Button
            onClick={() => setIsVisible((prev) => !prev)}
            variant="destructive"
            className="w-full cursor-pointer"
          >
            <CircleX className="stroke-destructive mr-1" />
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};
