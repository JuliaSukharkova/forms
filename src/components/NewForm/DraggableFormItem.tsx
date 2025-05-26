import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableFormItemProps {
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
  children: React.ReactNode;
}

export const DraggableFormItem = ({
  index,
  moveItem,
  children,
}: DraggableFormItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'SORTABLE_FORM_ELEMENT',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: "SORTABLE_FORM_ELEMENT",
    item: { index },
  });

  drag(drop(ref));

  return (
    <div ref={ref}  className="relative w-full group transition-all duration-200">
      {children}
    </div>
  );
};
