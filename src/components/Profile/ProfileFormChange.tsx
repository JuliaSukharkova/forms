import { uploadAvatartToStorage } from "@/hooks/uploadAvatarToStorage";
import { useAuthUser } from "@/hooks/useAuthUser";
import { updateUserProfile } from "@/hooks/useUpdateProfile";
import { cn } from "@/services/lib/utils";
import {
  nameValidation,
  lastNameValidation,
} from "@/services/validation/authValidation";
import { formatDate } from "@/services/validation/fomatDate";
import { Mail, CalendarDays, CircleX, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loaders } from "../Loaders";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { FormData } from "@/types/type";
import { toast } from "sonner";
import { Label } from "../ui/label";
import ProfileAvatarUploader from "./ProfileAvatarUploader";
import { useTranslation } from "react-i18next";

const DEFAULT_AVATAR = "/forms/avatar.png";

export const ProfileFormChange = () => {
  const user = useAuthUser();
  const [change, setChange] = useState(false);
  const [photo, setPhoto] = useState(user?.photoURL || DEFAULT_AVATAR || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Pick<FormData, "name" | "lastName">>({
    mode: "onChange",
    defaultValues: {
      name: user?.displayName?.split(" ")[0] ?? "",
      lastName: user?.displayName?.split(" ")[1] ?? "",
    },
  });
  const watchedName = watch("name");
  const watchedLastName = watch("lastName");
  const hasChanges =
    watchedName.trim() !== (user?.displayName?.split(" ")[0] ?? "") ||
    watchedLastName.trim() !== (user?.displayName?.split(" ")[1] ?? "") ||
    photo !== (user?.photoURL || DEFAULT_AVATAR);
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      const [name = "", lastName = ""] = user.displayName?.split(" ") ?? [];
      reset({ name, lastName });
      setPhoto(user.photoURL || DEFAULT_AVATAR || "");
    }
  }, [user, reset]);

  const onSubmit = async (data: Pick<FormData, "name" | "lastName">) => {
    if (!user) return;

    try {
      setLoading(true);
      await updateUserProfile(
        user,
        `${data.name.trim()} ${data.lastName.trim()}`,
        photo
      );
      setChange(false);
    } catch (error) {
      toast.error("Failed to update profile", { description: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);
      const url = await uploadAvatartToStorage(file, user.uid);
      setPhoto(url);
    } catch (err) {
      console.log("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      const [name = "", lastName = ""] = user.displayName?.split(" ") ?? [];
      reset({ name, lastName });
      setPhoto(user.photoURL || DEFAULT_AVATAR || "");
    }
    setChange(false);
  };

  if (!user) return <Loaders />;

  return (
    <div className="w-full flex-col backdrop-blur-[4px] bg-muted/40 border border-primary-light rounded-md  transition-shadow shadow-[var(--shadow)] p-5 gap-6">
      <ProfileAvatarUploader
        photo={photo}
        onUploadClick={() => fileInputRef.current?.click()}
        onFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        change={change}
        setChange={setChange}
        handleSubmit={handleSubmit(onSubmit)}
        loading={loading}
        hasChanges={hasChanges}
      />
      {change ? (
        <>
          <div className="relative flex flex-col  mb-3.5 gap-0.5">
            <Label
              htmlFor="name"
              className={cn(errors.name && "text-destructive")}
            >
              {t("profile.labelName")}
            </Label>
            <Input
              id="name"
              {...register("name", nameValidation(t))}
              className={cn(
                "h-10 pr-4 pl-8 bg-muted",
                errors.name && "border-destructive"
              )}
            />
            <div className="absolute top-[30px] left-[10px]">
              <User className="w-4 h-4 fill-accent-foreground stroke-accent-foreground" />
            </div>
            {errors.name && (
              <p className="text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="relative flex flex-col  mb-3.5 gap-0.5">
            <Label
              htmlFor="lastName"
              className={cn(errors.lastName && "text-destructive")}
            >
              {t("profile.labelLastName")}
            </Label>
            <Input
              id="lastName"
              {...register("lastName", lastNameValidation(t))}
              className={cn(
                "h-10 pr-4 pl-8 bg-muted",
                errors.lastName && "border-destructive"
              )}
            />
            <div className="absolute top-[30px] left-[10px]">
              <User className="w-4 h-4 fill-accent-foreground stroke-accent-foreground" />
            </div>
            {errors.lastName && (
              <p className="text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </>
      ) : (
        <h2 className="text-lg font-semibold mb-3.5">{user?.displayName}</h2>
      )}
      <div className="flex items-center gap-1.5 mb-3.5 text-lg font-semibold">
        <Mail className="w-5 h-5" />
        {user?.email}
      </div>
      <div className="flex items-center gap-1.5 mb-3.5">
        <CalendarDays className="w-4 h-4" />
        <h2>{t("profile.dateTitle")}</h2>
        <span>{formatDate(user?.metadata.creationTime)}</span>
      </div>

      {change && (
        <Button
          onClick={handleCancel}
          variant="destructive"
          className="cursor-pointer w-full  mb-3.5"
        >
          <CircleX className="stroke-destructive mr-1" />
          {t("profile.cancelButton")}
        </Button>
      )}
    </div>
  );
};
