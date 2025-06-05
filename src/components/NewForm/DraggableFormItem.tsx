import type { FormElement } from "@/utils/types/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableFormItemProps {
  id: string;
  element: FormElement;
  children: (props: {
    dragHandleProps: React.HTMLAttributes<HTMLElement>;
  }) => React.ReactNode;
}

export const DraggableFormItem: React.FC<DraggableFormItemProps> = ({
  id,
  element,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      ...element,
      fromSidebar: false,
    },
  });

  const style = {
    opacity: isDragging ? 0.2 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ dragHandleProps: { ...attributes, ...listeners } })}
    </div>
  );
};
