import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/services/lib/utils";
import { useState } from "react";

type SortLabelMap<T extends string> = Record<T, string>;

interface SortedMenuProps<T extends string> {
  value: T;
  onChange: (type: T) => void;
  sortLabel: SortLabelMap<T>;
  className?: string;
  isDisabled?: boolean;
  menuClassName?: string;
}

export const SortedMenu = <T extends string>({
  value,
  onChange,
  sortLabel,
  className,
  isDisabled,
  menuClassName,
}: SortedMenuProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger
        disabled={isDisabled}
        className={cn(
          "relative px-5 py-1.5 rounded-md border border-border-light text-primary-text focus:ring-0 focus:outline-none cursor-pointer",
          open && "text-primary-text/40 border-accent",
          className
        )}
      >
        <span className="mr-2 max-sm:mr-3">{sortLabel[value]}</span>
        <ChevronDown className="absolute top-[9px] right-2 w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className={cn(
          "mt-1 rounded-md px-2 py-2 text-primary-text z-[100]",
          "max-sm:w-[calc(100vw-4rem)] max-sm:ml-2 max-sm:mr-2",
          menuClassName
        )}
      >
        {(Object.entries(sortLabel) as [T, string][]).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(key as T)}
            className={cn(
              "cursor-pointer !hover:bg-primary/10 focus:bg-primary/10 focus:text-primary-text rounded-sm px-2 my-0.5 py-1",
              value === key && "font-medium bg-primary/10"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
