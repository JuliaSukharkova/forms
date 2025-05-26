import { cn } from "@/lib/utils";
import { Clock8, House, Save, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sidebarItems } from "@/utils/types/type";
import { SidebarItem } from "./SidebarItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SidebarFormProps {
  onSave: () => void;
  tag: string;
  setTag: React.Dispatch<React.SetStateAction<string>>;
  time: Date | null;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const SidebarForm = ({
  onSave,
  tag,
  setTag,
  time,
  setTime,
}: SidebarFormProps) => {
  const [isSettings, setIsSettings] = useState<boolean>(false);

  return (
    <div className="w-full sticky top-2 px-5 pb-5 self-start max-w-72 mx-auto rounded-xl border border-border backdrop-blur-[4px] bg-muted p-6  transition-shadow shadow-[var(--shadow)] space-y-6">
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
            <DatePicker
              selected={time}
              onChange={(date) => setTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="HH:mm:ss"
              className="h-9 px-3 cursor-pointer !w-full border border-border rounded-md"
            />
            <Clock8 className="absolute right-3 top-9 w-4 h-4 text-muted-foreground pointer-events-none" />
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
      <div className="pt-4 border-t border-border space-y-3">
        <h2 className="text-center  font-semibold">Actions</h2>
        <Button onClick={onSave} className="w-full cursor-pointer">
          <Save className="w-4 h-4 mr-1" />
          Save form
        </Button>
      </div>
    </div>
  );
};
