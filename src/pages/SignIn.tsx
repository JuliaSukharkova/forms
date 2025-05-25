import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  emailValidation,
  passwordValidation,
} from "@/utils/validation/authValidation";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase/firebase";
import { FirebaseError } from "firebase/app";
import type { FormData } from "@/utils/types/type";
import { toast } from "sonner";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<FormData, "email" | "password">>();
  const navigate = useNavigate();

  const onSubmit = async (data: Pick<FormData, "email" | "password">) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toast.error("Firebase error:", { description: error.message });
      } else {
        toast.error("Unknown error:", { description: String(error) });
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[420px] p-10 border rounded-xl backdrop-blur-[4px] bg-muted transition-shadow shadow-[var(--shadow)]">
        <h2 className="text-xl font-semibold mb-6">Sign in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                "h-10 px-4 mt-0.5",
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
                "h-10 px-4 mt-0.5",
                errors.password && "border-destructive"
              )}
            />
            {errors.password && (
              <p className="text-destructive mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-10 px-4 cursor-pointer"
          >
            Sign in
          </Button>
          <div className="text-right">
            <span>Don’t have an account? </span>
            <Link to="/register" className="underline hover:text-accent">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
