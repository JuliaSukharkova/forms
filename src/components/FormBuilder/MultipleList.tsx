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
import type { IFormProps } from "@/types/type";
import { cn } from "@/services/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

export const MultipleList = React.memo(
  ({
    element,
    onDelete,
    onCopyBelow,
    onCopyToEnd,
    onChange,
    requiredField,
    dragHandleProps,
  }: IFormProps) => {
    const [open, setOpen] = useState(false);
    const [openChoice, setOpenChoice] = useState(false);
    const [type, setType] = useState<"single" | "multiple">(element.dataType);
    const [options, setOptions] = useState<string[]>(
      element.options ? element.options : []
    );
    const { t } = useTranslation();

    const handleAddOption = () => {
      setOptions([...options, ""]);
    };

    const handleRemoveOption = (index: number) => {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
      onChange?.({ options: updatedOptions });
    };

    const toggleType = (newType: "single" | "multiple") => {
      setType(newType);
      element.dataType = newType;
      setOpenChoice(false);
    };

    return (
      <div className="flex border border-border bg-card text-card-foreground rounded-md w-full active:border-dashed">
        <div className="flex flex-col gap-2.5 w-full">
          <div className="px-4 pt-2 flex flex-col items-start">
            <Input
              value={element.label}
              placeholder={t("formEditor.multipleList.inputTitle")}
              onChange={(e) => onChange?.({ label: e.target.value })}
              className={cn(
                "bg-muted",
                requiredField && !element.label.trim() && "border-destructive"
              )}
              required
            />
          </div>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2.5 px-4">
              {type === "single" ? (
                <Circle className="w-4 h-4 stroke-primary" />
              ) : (
                <Square className="w-4 h-4 stroke-primary" />
              )}
              <Input
                value={option}
                placeholder={`${t("formEditor.multipleList.inputOption")} ${index + 1}`}
                className={cn(
                  requiredField && !option.trim() && "border-destructive"
                )}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index] = e.target.value;
                  setOptions(updatedOptions);
                  onChange?.({ options: updatedOptions });
                }}
                required
              />
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
                {t("formEditor.multipleList.addButton")}
              </button>
            </div>
            <Popover open={openChoice} onOpenChange={setOpenChoice}>
              <PopoverTrigger asChild>
                <button className="relative flex items-center py-1.5 xl:px-10 lg:px-10 md:px-7 xs:px-2 gap-2 text-primary backdrop-blur-[4px] bg-primary/10 hover:backdrop-blur-[4px] shadow rounded-md cursor-pointer">
                  <span>
                    {type === "single"
                      ? t("formEditor.multipleList.singleChoice")
                      : t("formEditor.multipleList.multipleChoice")}
                  </span>
                  <ChevronDown className="absolute top-2 right-2 w-4 h-4 stroke-primary" />
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
                    {t("formEditor.multipleList.singleChoice")}
                  </button>
                  <button
                    onClick={() => toggleType("multiple")}
                    className="flex items-center gap-2 text-primary hover:backdrop-blur-[4px] bg-muted hover:bg-primary/10 px-2 py-2 rounded-md cursor-pointer"
                  >
                    {t("formEditor.multipleList.multipleChoice")}
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
                {t("formEditor.singleChoiceTitle")}
              </p>
            ) : (
              <p className="flex items-center gap-1.5">
                <SquarePlus className="w-4 h-4" />
                {t("formEditor.multipleChoiceTitle")}
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
                        onCopyBelow?.();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2  text-muted-foreground hover:backdrop-blur-[4px] bg-muted px-2 py-1 rounded-md"
                    >
                      <Copy className="w-4 h-4" />
                      {t("formEditor.multipleList.copyBelowTitle")}
                    </button>
                    <button
                      onClick={() => {
                        onCopyToEnd?.();
                        setOpen(false);
                      }}
                      className="flex items-center gap-2  text-muted-foreground hover:backdrop-blur-[4px] bg-muted px-2 py-1 rounded-md"
                    >
                      <Copy className="w-4 h-4" />
                      {t("formEditor.multipleList.copyToEnd")}
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
                    className="bg-popover text-popover-foreground border border-border shadow-md px-3 py-2 rounded-md"
                  >
                    {t("formEditor.multipleList.requiredTitle")}
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
          className="relative flex items-center cursor-pointer"
          {...dragHandleProps}
        >
          <Separator orientation="vertical" className="h-full" />
          <GripVertical className="w-4 h-4 hover:stroke-primary" />
        </button>
      </div>
    );
  }
);
