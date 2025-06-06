import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/services/lib/utils";

type SortLabelMap<T extends string> = Record<T, string>;

interface SortedMenuProps<T extends string> {
  value: T;
  onChange: (type: T) => void;
  sortLabel: SortLabelMap<T>;
  className?: string;
  isDisabled?: boolean;
}

export const SortedMenu = <T extends string>({
  value,
  onChange,
  sortLabel,
  className,
  isDisabled,
}: SortedMenuProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isDisabled}
        className={cn(
          "focus:outline-none focus:ring-0 flex items-center justify-between gap-2 relative text-primary bg-primary/10 hover:bg-primary/20 px-5 py-1.5 max-sm:px-2 max-sm:py-1 rounded-md backdrop-blur-[4px] transition-shadow shadow cursor-pointer",
          isDisabled &&
            "cursor-not-allowed bg-transparent border border-primary hover:bg-transparent",
          className
        )}
      >
        <span>{sortLabel[value]}</span>
        <ChevronDown className="w-4 h-4 stroke-primary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1  bg-primary-light px-2 py-2 rounded-md mt-1 z-50">
        {(Object.entries(sortLabel) as [T, string][]).map(([key, label]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => onChange(key as T)}
            className="text-primary cursor-pointer hover:bg-primary/10 rounded-sm px-2 py-1"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
