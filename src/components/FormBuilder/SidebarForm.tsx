import { cn } from "@/services/lib/utils";
import { House, Loader, Save, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sidebarItems } from "@/types/type";
import { SidebarItem } from "./SidebarItem";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Separator } from "../ui/separator";
import { TimePickerInput } from "./TimePickerInput";
import { deleteFormById } from "@/api/formApi";
import { useTranslation } from "react-i18next";

interface SidebarFormProps {
  onSave: () => void;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  updateForm: boolean;
  formId?: string;
  isLoading: boolean;
}

export const SidebarForm = ({
  onSave,
  tag,
  setTag,
  time,
  setTime,
  updateForm,
  formId,
  isLoading,
}: SidebarFormProps) => {
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleDelete = async () => {
    if (!formId) return;
    try {
      await deleteFormById(formId);
      toast.success(t("formEditor.sidebarSuccess"));
      navigate("/");
    } catch (error) {
      toast.error(t("formEditor.sidebarSuccess"), {
        description: String(error),
      });
    }
  };

  return (
    <div className="w-full sticky top-25 px-5 pb-5 self-start max-w-80 mx-auto rounded-xl border border-border backdrop-blur-[4px] bg-muted p-6  transition-shadow shadow-[var(--shadow)] space-y-3">
      <div className="flex items-center justify-between">
        <button
          aria-selected={!isSettings}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-all font-medium cursor-pointer",
            !isSettings
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent/50 hover:text-accent-foreground"
          )}
          onClick={() => setIsSettings(false)}
        >
          <House className="w-4 h-4" />
          {t("formEditor.sidebarTitlePrimary")}
        </button>
        <button
          aria-selected={isSettings}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-all font-medium cursor-pointer",
            isSettings
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent/50 hover:text-accent-foreground"
          )}
          onClick={() => setIsSettings(true)}
        >
          <Settings className="w-4 h-4" />
          {t("formEditor.sidebarTitleSecond")}
        </button>
      </div>
      <div className="relative w-full h-1 bg-border rounded overflow-hidden">
        <div
          className={cn(
            "absolute top-0 h-full bg-primary transition-all duration-300",
            isSettings ? "right-0" : "left-0",
            "w-1/2"
          )}
        />
      </div>

      {isSettings ? (
        <div className="space-y-4  text-muted-foreground">
          <div className="relative w-full flex flex-col">
            <span className=" mb-1">{t("formEditor.sidebarTimeLimit")}</span>
            <TimePickerInput
              value={/^\d{2}:\d{2}:\d{2}$/.test(time) ? time : "00:00:00"}
              onChange={(time) => setTime(time)}
            />
          </div>
          <div>
            <label className="block mb-1">Tags</label>
            <Input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder={t("formEditor.sidebarInput")}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3 flex flex-col items-center justify-center text-accent-foreground">
          {sidebarItems.map((el) => (
            <SidebarItem key={el.id} item={el} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Separator />
        <h2 className="text-center  font-semibold">
          {t("formEditor.sidebarActionTitle")}
        </h2>
        {updateForm && (
          <Button asChild variant="secondary" className="w-full cursor-pointer">
            <Link to={`/form/${formId}`}>
              {t("formEditor.sidebarViewTitle")}
            </Link>
          </Button>
        )}
        <Button onClick={onSave} className="w-full cursor-pointer">
          {isLoading ? (
            <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              {t("formEditor.sidebarViewTitle")}
            </>
          )}
        </Button>
        {updateForm && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full cursor-pointer">
                <Trash2 className="w-4 h-4 stroke-destructive" />
                {t("mainPage.deleteFormTitle")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("mainPage.deleteFormTitle")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t("mainPage.deleteFormDescription")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  {t("mainPage.cancelButton")}
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer bg-destructive hover:bg-destructive/80"
                  onClick={handleDelete}
                >
                  {t("mainPage.deleteButton")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
