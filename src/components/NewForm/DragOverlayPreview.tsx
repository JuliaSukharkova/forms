import type { FormElement } from "@/utils/types/type";
import { AnswerForm } from "./AnswerForm";
import { MultipleList } from "./MultipleList";

export const DragOverlayPreview = ({
  element,
}: {
  element: FormElement;
}) => {
  return (
    <div className="opacity-80 scale-95 pointer-events-none">
      {element.component === "answer" ? (
        <AnswerForm isPreview element={element} />
      ) : (
        <MultipleList isPreview element={element}  />
      )}
    </div>
  );
};
