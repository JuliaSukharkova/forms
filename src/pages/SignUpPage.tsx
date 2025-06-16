import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/services/lib/utils";
import {
  nameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
  repeatPasswordValidation,
} from "@/services/validation/authValidation";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { UserExistsDialog } from "@/components/Dialog/UserExistsDialog";
import type { FormData } from "@/types/type";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const password = watch("password");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, {
        displayName: `${data.name} ${data.lastName}`,
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setUserExists(true);
          toast.error("Account already exists", {
            description:
              " A user with this email is already registered. Try logging in or use another email.",
          });
        } else {
          toast.error("Firebase error:", { description: error.message });
        }
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[420px] p-10 border border-primary-light rounded-xl  backdrop-blur-[4px] bg-muted/40 transition-shadow shadow-[var(--shadow)] max-sm:border-none">
        <h2 className="text-2xl font-semibold mb-6">{t("signUp.title")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className={cn(errors.name && "text-destructive")}
            >
              {t("signUp.labelName")}
            </Label>
            <Input
              id="name"
              type="name"
              placeholder={t("signUp.labelName")}
              {...register("name", nameValidation(t))}
              className={cn(
                "h-10 px-4 mt-0.5 bg-muted",
                errors.name && "border-destructive"
              )}
            />
            {errors.name && (
              <p className="text-destructive mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="lastName"
              className={cn(errors.lastName && "text-destructive")}
            >
              {t("signUp.labelLastName")}
            </Label>
            <Input
              id="lastName"
              type="lastName"
              placeholder={t("signUp.labelLastName")}
              {...register("lastName", lastNameValidation(t))}
              className={cn(
                "h-10 px-4 mt-0.5 bg-muted",
                errors.lastName && "border-destructive"
              )}
            />
            {errors.lastName && (
              <p className="text-destructive  mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className={cn(errors.email && "text-destructive")}
            >
              {t("signUp.labelEmail")}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("signUp.labelEmail")}
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
              className={cn(errors.password && "text-destructive")}
            >
              {t("signUp.labelPassword")}
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
              <p className="text-destructive  mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="repeatPassword"
              className={cn(errors.repeatPassword && "text-destructive")}
            >
              {t("signUp.labelRepeatPassword")}
            </Label>
            <Input
              id="repeatPassword"
              type="password"
              placeholder="••••••••"
              {...register(
                "repeatPassword",
                repeatPasswordValidation(password, t)
              )}
              className={cn(
                "h-10 px-4 mt-0.5 bg-muted",
                errors.repeatPassword && "border-destructive"
              )}
            />
            {errors.repeatPassword && (
              <p className="text-destructive  mt-1">
                {errors.repeatPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full h-10 px-4 cursor-pointer">
            {isLoading && (
              <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
            )}
            {t("signUp.submitButton")}
          </Button>
          <div className=" text-right">
            <span>{t("signUp.haveAccount")}</span>
            <Link to="/signin" className="underline hover:text-primary">
              {t("signUp.signInLink")}
            </Link>
          </div>
        </form>
      </div>
      <UserExistsDialog
        open={userExists}
        onClose={() => setUserExists(false)}
        title={t("signUp.dialogTitle")}
        description={t("signUp.dialogDescription")}
        btn={t("signUp.dialogButton")}
      />
    </div>
  );
};
