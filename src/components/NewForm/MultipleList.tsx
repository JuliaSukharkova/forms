import {
  Circle,
  CircleCheck,
  CircleMinus,
  Copy,
  GripVertical,
  Square,
  SquarePlus,
  X,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import type { IFormProps } from "@/utils/types/type";
import { cn } from "@/lib/utils";

export const MultipleList = ({
  element,
  onDelete,
  isPreview,
  onCopyBelow,
  onCopyToEnd,
  // onDragStart,
  // onDragEnd,
}: IFormProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(["Option 1"]);
  const [type, setType] = useState<"single" | "multiple">(element.dataType);

  const handleAddOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const toggleType = (newType: "single" | "multiple") => {
    setType(newType);
  };

  return (
    <div
      className={cn(
        "flex border border-border bg-card text-card-foreground rounded-md w-full  transition-shadow shadow-[var(--shadow)]",
        isPreview ? "opacity-50" : ""
      )}
    >
      <div className="flex flex-col gap-2.5 w-full">
        <div className="px-4 pt-2 flex flex-col items-start">
          <Input defaultValue={element.label} placeholder="Question" />
        </div>

        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2.5 px-4">
            {type === "single" ? (
              <Circle className="w-4 h-4 stroke-primary" />
            ) : (
              <Square className="w-4 h-4 stroke-primary" />
            )}
            <Input placeholder={option} />
            {options.length > 1 && (
              <CircleMinus
                onClick={() => handleRemoveOption(index)}
                className="w-4 h-4 stroke-destructive cursor-pointer"
              />
            )}
          </div>
        ))}

        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            {type === "single" ? (
              <Circle className="w-4 h-4 cursor-not-allowed stroke-primary" />
            ) : (
              <Square className="w-4 h-4 stroke-primary" />
            )}
            <button
              onClick={handleAddOption}
              className="cursor-pointer py-1.5 px-10 text-primary backdrop-blur-[4px] bg-primary/10 hover:backdrop-blur-[4px] rounded-md"
            >
              Add
            </button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <button className="relative flex py-1.5 px-16 text-primary backdrop-blur-[4px] bg-primary/10 hover:backdrop-blur-[4px] shadow rounded-md cursor-pointer">
                {type === "single" ? "Single choice" : "Multiple choice"}
                <ChevronDown className="absolute top-2 right-2 w-5 h-5 stroke-primary" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="center"
              sideOffset={4}
              className="p-1"
            >
              <PopoverArrow className="fill-popover" />
              <div className="flex flex-col">
                <button
                  onClick={() => toggleType("single")}
                  className="flex items-center gap-2 text-primary hover:backdrop-blur-[4px] bg-muted hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer"
                >
                  Single choice
                </button>
                <button
                  onClick={() => toggleType("multiple")}
                  className="flex items-center gap-2 text-primary hover:backdrop-blur-[4px] bg-muted hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer"
                >
                  Multiple choice
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator />

        <div className="flex justify-between px-4 py-2">
          {type === "single" ? (
            <p className="flex items-center gap-1.5">
              <CircleCheck className="w-4 h-4" />
              Single choice list
            </p>
          ) : (
            <p className="flex items-center gap-1.5">
              <SquarePlus className="w-4 h-4" />
              Multiple choice list
            </p>
          )}

          <div className="flex items-center gap-2.5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2">
                  <Copy className="w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="center"
                sideOffset={4}
                className="w-fit p-1.5"
              >
                <PopoverArrow className="fill-popover" />
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      onCopyBelow();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2  text-muted-foreground hover:backdrop-blur-[4px] bg-muted px-2 py-1 rounded-md"
                  >
                    <Copy className="w-4 h-4" />
                    Create copy below
                  </button>
                  <button
                    onClick={() => {
                      onCopyToEnd();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2  text-muted-foreground hover:backdrop-blur-[4px] bg-muted px-2 py-1 rounded-md"
                  >
                    <Copy className="w-4 h-4" />
                    Create copy to end
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span role="presentation" className="inline-flex">
                    <Switch id="requiredField" className="cursor-pointer" />
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-popover text-popover-foreground border border-border shadow-md px-3 py-2 rounded-md"
                >
                  Required field
                  <TooltipArrow className="fill-popover" />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <button
              className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2"
              onClick={onDelete}
            >
              <X className="w-4 h-4 stroke-destructive" />
            </button>
          </div>
        </div>
      </div>

      <button
        draggable="true"
        onDragStart={(e) => {
          // onDragStart(e);
          e.dataTransfer.setData(
            "aplication/json",
            JSON.stringify({ type: "reorder", id: element.id })
          );
        }}
        // onDragEnd={onDragEnd}
        className="relative flex items-center cursor-pointer"
      >
        <Separator orientation="vertical" className="h-full" />
        <GripVertical className="w-4 h-4 hover:stroke-primary" />
      </button>
    </div>
  );
};
