import { useDraggable } from "@dnd-kit/core";
import type { SidebarItemType } from "@/utils/types/type";
import { BookPlus, CircleCheck, SquarePen, Text } from "lucide-react";

export const SidebarItem = ({ item }: { item: SidebarItemType }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: {
      id: item.id,
      type: item.type,
      data: item.data,
      fromSidebar: true,
    },
  });

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
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-pointer flex items-center gap-1 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {icon}
      {label}
    </div>
  );
};
