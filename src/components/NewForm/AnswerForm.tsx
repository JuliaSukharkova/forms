import { Copy, GripVertical, SquarePen, Text, X } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import React, { useState } from "react";
import type { IFormProps } from "@/utils/types/type";
import { cn } from "@/lib/utils";

export const AnswerForm = React.memo(
  ({
    element,
    onDelete,
    onCopyBelow,
    onCopyToEnd,
    onChange,
    requiredField,
    dragHandleProps
  }: IFormProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const type: "single" | "multiple" = element.dataType;
    
    return (
      <div className="flex border bg-card rounded-md w-full active:border-dashed">
        <div className="flex flex-col w-full">
          <div className="px-4 py-2 flex flex-col items-start">
            <Input
              value={element.label}
              placeholder="Enter question"
              onChange={(e) => onChange?.({ label: e.target.value })}
              className={cn(
                "bg-muted",
                requiredField && !element.label.trim() && "border-destructive"
              )}
              required
            />
          </div>
          <Separator />
          <div className="flex justify-between px-4 py-2">
            {type === "single" ? (
              <p className="flex items-center gap-1.5">
                <SquarePen className="w-4 h-4" />
                Single line answer
              </p>
            ) : (
              <p className="flex items-center gap-1.5">
                <Text className="w-4 h-4" />
                Multiple line answer
              </p>
            )}
            <div className="flex items-center gap-2.5">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2">
                    <Copy className="w-[w-4 h-4 cursor-pointer" />
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
                        onCopyBelow?.();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
                    >
                      <Copy className="w-4 h-4 hover:fill-primary/80" />
                      Create copy below
                    </button>
                    <button
                      onClick={() => {
                        onCopyToEnd?.();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
                    >
                      <Copy className="w-4 h-4 hover:fill-primary/80" />
                      Create copy to end
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span role="presentation" className="inline-flex">
                      <Switch
                        id="requiredField"
                        className="cursor-pointer"
                        checked={element.required}
                        onCheckedChange={(checked) =>
                          onChange?.({ required: checked })
                        }
                      />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-white text-black border shadow-md px-3 py-2 rounded-md"
                  >
                    Required field
                    <TooltipArrow className="fill-white" />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <button
                className="cursor-pointer [&_svg]:shrink-0 hover:bg-accent rounded-md p-2"
                onClick={onDelete}
              >
                <X className="w-[w-4 h-4 stroke-destructive" />
              </button>
            </div>
          </div>
        </div>
        <button className="relative flex items-center cursor-pointer" {...dragHandleProps}>
          <Separator orientation="vertical" className="h-full" />
          <GripVertical className="w-4 h-4 hover:stroke-primary" />
        </button>
      </div>
    );
  }
);
