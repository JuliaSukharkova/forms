import { cn } from "@/lib/utils";
import { CircleX, Clock8 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const range = (start: number, end: number, step = 1) =>
  Array.from({ length: Math.floor((end - start + step) / step) }, (_, i) =>
    String(start + i * step).padStart(2, "0")
  );

const hours = range(0, 23);
const minutes = range(0, 59);
const seconds = range(0, 45, 15);

export const TimePickerInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(value || "00:00:00");
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const [h = "00", m = "00", s = "00"] = (selected ?? "00:00:00").split(":");

  const handleSelect = (newH: string, newM: string, newS: string) => {
    const formatted = `${newH}:${newM}:${newS}`;
    setSelected(formatted);
    onChange(formatted);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-block w-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <input
        readOnly
        value={selected}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer px-3 py-2 border rounded-md bg-background w-full"
      />

      {hovering ? (
        <CircleX
          onClick={(e) => {
            e.stopPropagation();
            setSelected("00:00:00");
            onChange("00:00:00");
          }}
          className="absolute right-3 top-2/4 -translate-y-1/2 w-4 h-4 text-accent cursor-pointer hover:text-destructive"
        />
      ) : (
        <Clock8 className="absolute right-3 top-2/4 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      )}
      {open && (
        <div className="absolute z-50 mt-2 flex bg-popover border rounded-md  shadow-lg p-3 space-x-3">
          {[hours, minutes, seconds].map((list, i) => (
            <div
              key={i}
              className="h-[200px] overflow-y-scroll w-12 scrollbar-thin scrollbar-thumb-primary-foreground"
            >
              {list.map((val) => {
                const selectedVal = i === 0 ? h : i === 1 ? m : s;
                const newVal: [string, string, string] = [
                  i === 0 ? val : h,
                  i === 1 ? val : m,
                  i === 2 ? val : s,
                ];

                return (
                  <div
                    key={val}
                    onClick={() => handleSelect(...newVal)}
                    className={cn(
                      "px-2 py-1 text-center cursor-pointer rounded-md hover:bg-muted",
                      selectedVal === val &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          ))}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer mt-auto bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1 rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
