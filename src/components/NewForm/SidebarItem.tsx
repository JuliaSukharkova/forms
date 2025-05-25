import type { SidebarItemType } from "@/utils/types/type";
import { useDraggable } from "@dnd-kit/core";
import { BookPlus, CircleCheck, SquarePen, Text } from "lucide-react";

export const SidebarItem = ({
  item,
}: {
  item: SidebarItemType;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${item.id}`,
    data: {
      from: "sidebar",
      component: item.type,
      dataType: item.data,
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-move flex items-center gap-2"
    >
      {item.type === "answer" &&  item.data === "single" ? (
        <>
          <SquarePen className="w-4 h-4" />
          Single line answer
        </>
      ) : item.data === "multiple" && item.type === "answer" ? (
        <>
          <Text className="w-4 h-4" /> Multiple line answer
        </>
      ) : item.type === "multipleList" && item.data === "multiple" ? (
        <>
          <CircleCheck className="w-4 h-4" /> Single choice list
        </>
      ) : (
        <>
          <BookPlus className="w-4 h-4" /> Multiple choice list
        </>
      )}
    </div>
  );
};
