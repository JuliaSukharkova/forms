import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/services/lib/utils";
import { useEffect, useRef, useState } from "react";

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
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry?.contentRect?.width) {
        setTriggerWidth(entry.contentRect.width);
      }
    });

    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger
        ref={triggerRef}
        disabled={isDisabled}
        className={cn(
          "relative px-5 py-1.5 rounded-md border border-border-light text-primary-text focus:ring-0 focus:outline-none",
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
        style={{
          width: triggerWidth && window.innerWidth < 600 ? `${triggerWidth}px` : undefined,
        }}
        className={cn(
          "z-[90] mt-1 rounded-md px-2 py-2 text-primary-text",
          "max-sm:w-full",
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
