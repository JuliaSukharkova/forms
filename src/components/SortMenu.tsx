import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/services/lib/utils";

type SortLabelMap<T extends string> = Record<T, string>;

interface SortedMenuProps<T extends string> {
  value: T;
  onChange: (type: T) => void;
  sortLabel: SortLabelMap<T>;
  className?: string;
  menuClassName?: string;
  isDisabled?: boolean;
}

export const SortedMenu = <T extends string>({
  value,
  onChange,
  sortLabel,
  className,
  isDisabled,
}: SortedMenuProps<T>) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative w-full", className)}>
      <button
        disabled={isDisabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full flex justify-between items-center px-4 py-2 border border-border-light rounded-md bg-muted text-primary-text cursor-pointer",
          "hover:border-primary focus:outline-none focus:border-primary",
          open && "text-primary-text/40 border-accent focus:border-accent",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="text-center w-full">{sortLabel[value]}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-full rounded-md shadow-md bg-popover z-50 text-primary-text overflow-hidden">
          {(Object.entries(sortLabel) as [T, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                onChange(key as T);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-1 hover:bg-primary/10 cursor-pointer",
                value === key && "font-medium bg-primary/10"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
