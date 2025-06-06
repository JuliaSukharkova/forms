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
  const handleDelete = async () => {
    if (!formId) return;
    try {
      await deleteFormById(formId);
      toast.success("Form successfully deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="w-full sticky top-25 px-5 pb-5 self-start max-w-72 mx-auto rounded-xl border border-border backdrop-blur-[4px] bg-muted p-6  transition-shadow shadow-[var(--shadow)] space-y-6">
      <div className="flex items-center justify-between">
        <button
          aria-selected={!isSettings}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all  font-medium cursor-pointer",
            !isSettings
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={() => setIsSettings(false)}
        >
          <House className="w-4 h-4" />
          Constructor
        </button>
        <button
          aria-selected={isSettings}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all  font-medium cursor-pointer",
            isSettings
              ? "bg-primary/10 text-primary"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={() => setIsSettings(true)}
        >
          <Settings className="w-4 h-4" />
          Settings
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
            <span className=" mb-1">Limit</span>
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
              placeholder="Enter tag"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3 flex flex-col items-center justify-center  text-accent-foreground">
          {sidebarItems.map((el) => (
            <SidebarItem key={el.id} item={el} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        <Separator />
        <h2 className="text-center  font-semibold">Actions</h2>
        {updateForm && (
          <Button asChild variant="secondary" className="w-full cursor-pointer">
            <Link to={`/form/${formId}`}>View</Link>
          </Button>
        )}
        <Button onClick={onSave} className="w-full cursor-pointer">
          {isLoading ? (
            <Loader className="w-5 h-5 fill-primary-foreground animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save form
            </>
          )}
        </Button>
        {updateForm && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full cursor-pointer">
                <Trash2 className="w-4 h-4 stroke-destructive" />
                Delete form
              </Button>
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
        )}
      </div>
    </div>
  );
};
