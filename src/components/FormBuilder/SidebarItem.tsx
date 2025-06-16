import { useDraggable } from "@dnd-kit/core";
import type { SidebarItemType } from "@/types/type";
import { BookPlus, CircleCheck, SquarePen, Text } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  let icon;
  let label;

  switch (true) {
    case item.type === "answer" && item.data === "single":
      icon = <SquarePen className="w-4 h-4" />;
      label = t("formEditor.singleAnswerTitle");
      break;

    case item.type === "answer" && item.data === "multiple":
      icon = <Text className="w-4 h-4" />;
      label = t("formEditor.multipleAnswerTitle");
      break;

    case item.type === "multipleList" && item.data === "single":
      icon = <CircleCheck className="w-4 h-4" />;
      label = t("formEditor.singleChoiceTitle");
      break;
    case item.type === "multipleList" && item.data === "multiple":
      icon = <BookPlus className="w-4 h-4" />;
      label = t("formEditor.multipleChoiceTitle");
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
      className={`cursor-pointer flex items-center hover:bg-accent/50 p-0.5 rounded-xs gap-1 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {icon}
      {label}
    </div>
  );
};
