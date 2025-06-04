import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  nameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
  repeatPasswordValidation,
} from "@/utils/validation/authValidation";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/utils/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { UserExistsDialog } from "@/components/Dialog/UserExistsDialog";
import type { FormData } from "@/utils/types/type";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const password = watch("password");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
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
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[420px] p-10 border border-primary-light rounded-xl  backdrop-blur-[4px] bg-muted/40 transition-shadow shadow-[var(--shadow)]">
        <h2 className="text-2xl font-semibold mb-6">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className={cn(errors.name && "text-destructive")}
            >
              Name
            </Label>
            <Input
              id="name"
              type="name"
              placeholder="Name"
              {...register("name", nameValidation)}
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
              Last name
            </Label>
            <Input
              id="lastName"
              type="lastName"
              placeholder="Last Name"
              {...register("lastName", lastNameValidation)}
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
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", emailValidation)}
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
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", passwordValidation)}
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
              Repeat password
            </Label>
            <Input
              id="repeatPassword"
              type="password"
              placeholder="••••••••"
              {...register(
                "repeatPassword",
                repeatPasswordValidation(password)
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
            {isLoading ? (
              <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
          <div className=" text-right">
            <span>Already have an account? </span>
            <Link to="/signin" className="underline hover:text-primary">
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <UserExistsDialog
        open={userExists}
        onClose={() => setUserExists(false)}
      />
    </div>
  );
};
