import { cn } from "@/lib/utils";
import {
  BookPlus,
  CircleCheck,
  Clock8,
  House,
  Save,
  Settings,
  SquarePen,
  Text,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SidebarForm = () => {
  const drag = (
    component: "answer" | "multipleList",
    dataType: "single" | "multiple"
  ) => {
    return (e: React.DragEvent) => {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({type:'sidebar', component, dataType })
      );
      e.dataTransfer.effectAllowed = "move";
    };
  };
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");

  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-border backdrop-blur-[4px] bg-muted p-6  transition-shadow shadow-[var(--shadow)] space-y-6">
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
          <div className="relative">
            <label className="block mb-1">Limit</label>
            <Input
              type="time"
              className="pl-3 pr-10"
              aria-invalid="false"
              autoComplete="off"
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
          <div
            draggable
            onDragStart={drag("answer", "single")}
            className="cursor-pointer flex items-center gap-2"
          >
            <SquarePen className="w-4 h-4" /> Single line answer
          </div>
          <div
            draggable
            onDragStart={drag("answer", "multiple")}
            className="cursor-pointer flex items-center gap-2"
          >
            <Text className="w-4 h-4" /> Multiple line answer
          </div>
          <div
            draggable
            onDragStart={drag("multipleList", "single")}
            className="cursor-pointer flex items-center gap-2"
          >
            <CircleCheck className="w-4 h-4" /> Single choice list
          </div>
          <div
            draggable
            onDragStart={drag("multipleList", "multiple")}
            className="cursor-pointer flex items-center gap-2"
          >
            <BookPlus className="w-4 h-4" /> Multiple choice list
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border space-y-3">
        <h2 className="text-center  font-semibold">Actions</h2>
        <Button className="w-full cursor-pointer">
          <Save className="w-4 h-4 mr-1" />
          Save form
        </Button>
      </div>
    </div>
  );
};
