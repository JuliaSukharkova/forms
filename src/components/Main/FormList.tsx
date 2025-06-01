import { MessagesSquare, Pencil, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import { deleteFormById } from "@/api/deleteFormById";
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
import type { FormFromDB } from "@/utils/types/type";
import { toast } from "sonner";
import { getAnswersCount } from "@/api/getAnswersForm";

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
    <div className="flex flex-col justify-between bg-card border shadow rounded-md w-full max-w-[300px] h-[180px] overflow-hidden">
      <div className="flex flex-col justify-center items-center flex-1 py-2">
        <Link
          to={`/form/${formId}`}
          className="px-4 my-2 hover:text-primary font-medium line-clamp-1 text-center text-lg"
        >
          {formName}
        </Link>
        <Separator className="w-full" />
        <div className="flex items-center justify-center px-4 my-2 h-[60px]">
          <h2 className="text-center line-clamp-3">{formDesc}</h2>
        </div>
        <Separator className="w-full" />
        <div className="flex-1"></div>
        <div className="flex w-full p-2">
          <Link to={`/form/${formId}/responses`} className="relative flex flex-1 justify-center p-2 rounded-md cursor-pointer hover:bg-accent">
            <MessagesSquare className="w-4 h-4" />
            <p className="absolute top-0 right-7 flex items-center justify-center w-4 h-4 text-[10px] bg-destructive rounded-full text-primary-foreground">
              {answersCount}
            </p>
          </Link>
          <Separator orientation="vertical" className="mx-1" />
          <Link
            to={`/form/${formId}/edit`}
            className="flex flex-1 justify-center p-2 rounded-md cursor-pointer hover:bg-accent"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <Separator orientation="vertical" className="mx-1" />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex flex-1 justify-center p-2 rounded-md w-full cursor-pointer hover:bg-destructive-bright">
                <Trash2 className="w-4 h-4 stroke-destructive" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Form</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this form?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer bg-destructive hover:bg-destructive/80"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
