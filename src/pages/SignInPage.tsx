import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/services/lib/utils";
import {
  emailValidation,
  passwordValidation,
} from "@/services/validation/authValidation";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { FirebaseError } from "firebase/app";
import type { FormData } from "@/types/type";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<FormData, "email" | "password">>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const onSubmit = async (data: Pick<FormData, "email" | "password">) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error("Firebase error:", { description: error.message });
      } else {
        toast.error("Unknown error:", { description: String(error) });
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[420px] p-10 border border-primary-light rounded-xl backdrop-blur-[4px] bg-muted/40 transition-shadow shadow-[var(--shadow)] max-sm:border-none">
        <h2 className="text-xl font-semibold mb-6">{t("signIn.title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className={cn("mb-0.5", errors.email && "text-destructive")}
            >
              {t("signIn.labelEmail")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("signIn.labelEmail")}
              {...register("email", emailValidation(t))}
              className={cn(
                "h-10 px-4 mt-0.5 bg-muted",
                errors.email && "border-destructive"
              )}
            />
            {errors.email && (
              <p className="text-destructive  mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className={cn("mb-0.5", errors.password && "text-destructive")}
            >
              {t("signIn.labelPassword")}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", passwordValidation(t))}
              className={cn(
                "h-10 px-4 mt-0.5 bg-muted",
                errors.password && "border-destructive"
              )}
            />
            {errors.password && (
              <p className="text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full h-10 px-4 cursor-pointer">
            {isLoading && (
              <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
            )}
            {t("signIn.submitButton")}
          </Button>
          <div className="text-right">
            <span>{t("signIn.haveAccount")}</span>
            <Link to="/register" className="underline hover:text-primary">
              {t("signIn.signUpLink")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
