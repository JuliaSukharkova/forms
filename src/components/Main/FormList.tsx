import { MessagesSquare, Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
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
import type { FormFromDB } from "@/types/type";
import { toast } from "sonner";
import { deleteFormById, getAnswersCount } from "@/api/formApi";
import { useTranslation } from "react-i18next";

interface IFormList {
  formName: string;
  formDesc: string;
  formId: string;
  setFormElements: React.Dispatch<React.SetStateAction<FormFromDB[]>>;
}

export const FormList: FC<IFormList> = ({
  formName,
  formDesc,
  formId,
  setFormElements,
}) => {
  const [answersCount, setAnswersCount] = useState<number>(0);
  const {t} =  useTranslation()
  const handleDelete = async () => {
    try {
      await deleteFormById(formId);
      setFormElements((prev) => prev.filter((form) => form.id !== formId));
      toast.success("Form successfully deleted");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };
  useEffect(() => {
    const fetchCount = async () => {
      const count = await getAnswersCount(formId);
      setAnswersCount(count);
    };
    fetchCount();
  }, [formId]);

  return (
    <div className="flex flex-col justify-between bg-card border shadow rounded-md w-full max-w-[300px] max-sm:w-full max-sm:max-w-full h-[180px] max-sm:h-full overflow-hidden">
      <div className="flex flex-col justify-center items-center flex-1 py-2">
        <Link
          to={`/form/${formId}`}
          className="px-4 my-2 hover:text-primary font-medium line-clamp-1 text-center text-lg"
        >
          {formName}
        </Link>
        <Separator className="w-full" />
        <div className="flex items-center justify-center px-4 my-2 h-[60px] max-sm:h-fit">
          <h2 className="text-center line-clamp-3  max-sm:line-clamp-none">{formDesc}</h2>
        </div>
        <Separator className="w-full" />
        <div className="flex-1"></div>
        <div className="flex w-full p-2">
          <Link
            to={`/form/${formId}/responses`}
            className="flex flex-1 justify-center p-2 rounded-md cursor-pointer hover:bg-accent"
          >
            <div className="relative"><MessagesSquare className="w-4 h-4" />
            <p className="absolute left-2.5 top-[-9px] flex items-center justify-center w-4 h-4 text-[10px] bg-destructive rounded-full text-primary-foreground">
              {answersCount}
            </p></div>
          </Link>
          <Separator orientation="vertical" className="mx-1 max-sm:data-[orientation=vertical]:h-auto" />
          <Link
            to={`/form/${formId}/edit`}
            className="flex flex-1 justify-center p-2 rounded-md cursor-pointer hover:bg-accent"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <Separator orientation="vertical" className="mx-1 max-sm:data-[orientation=vertical]:h-auto" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex flex-1 justify-center p-2 rounded-md w-full cursor-pointer hover:bg-destructive-bright">
                <Trash2 className="w-4 h-4 stroke-destructive" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("mainPage.deleteFormTitle")}</AlertDialogTitle>
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
        </div>
      </div>
    </div>
  );
};
