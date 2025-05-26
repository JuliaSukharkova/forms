import { cn } from "@/lib/utils";
import type { SidebarItemType } from "@/utils/types/type";
import { BookPlus, CircleCheck, SquarePen, Text } from "lucide-react";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export const SidebarItem = ({ item }: { item: SidebarItemType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'FORM_ELEMENT',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  dragRef(ref);
  let icon;
  let label;

  switch (true) {
    case item.type === "answer" && item.data === "single":
      icon = <SquarePen className="w-4 h-4" />;
      label = "Single line answer";
      break;

    case item.type === "answer" && item.data === "multiple":
      icon = <Text className="w-4 h-4" />;
      label = "Multiple line answer";
      break;

    case item.type === "multipleList" && item.data === "single":
      icon = <CircleCheck className="w-4 h-4" />;
      label = "Single choice list";
      break;
    case item.type === "multipleList" && item.data === "multiple":
      icon = <BookPlus className="w-4 h-4" />;
      label = "Multiple choice list";
      break;
    default:
      return null;
  }

  if (!item) return null;
  return (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer flex items-center gap-2",
        isDragging ? "opacity-50" : ""
      )}
    >
      {icon}
      {label}
    </div>
  );
};
