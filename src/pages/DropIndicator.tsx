
import { cn } from "@/lib/utils";
import type { FormElement } from "@/utils/types/type";
import { useDroppable } from "@dnd-kit/core";
import type { FC } from "react";

type DropIndicatorProps = {
  overId: string | null;
  currentId: string;
  formElements: FormElement[];
};

export const DropIndicator: FC<DropIndicatorProps> = ({
  overId,
  currentId,
  formElements,
}) => {
  const { setNodeRef } = useDroppable({
    id: `${currentId}-indicator`,
  });

  if (!overId) return null;

  const overIndex = formElements.findIndex((el) => el.id === overId);
  const currentIndex = formElements.findIndex((el) => el.id === currentId);

  const isBefore = overIndex === currentIndex;

  if (!isBefore) return null;
  console.log(overId, currentId, 'id')

  return (
    <div
      ref={setNodeRef}
      className={cn("h-1.5 bg-orange-500 w-full my-2 rounded-md")}
    />
  );
};
