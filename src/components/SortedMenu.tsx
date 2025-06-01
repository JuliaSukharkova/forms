import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type SortLabelMap<T extends string> = Record<T, string>;

interface SortedMenuProps<T extends string> {
  value: T;
  onChange: (type: T) => void;
  sortLabel: SortLabelMap<T>;
}

export const SortedMenu = <T extends string>({
  value,
  onChange,
  sortLabel,
}: SortedMenuProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-2 relative text-primary bg-primary/10 hover:bg-primary/20 px-5 py-1.5 rounded-md backdrop-blur-[4px] transition-shadow shadow cursor-pointer">
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
