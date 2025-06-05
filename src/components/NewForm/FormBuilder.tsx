import type {
  DataType,
  FieldType,
  FormElement,
} from "@/utils/types/type";
import {
  useCallback,
  useState,
} from "react";
import { AnswerForm } from "./AnswerForm";
import { MultipleList } from "./MultipleList";
import { nanoid } from "nanoid";
import {
  BookPlus,
  CircleAlert,
  CircleCheck,
  CirclePlus,
  SquarePen,
  Text,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableFormItem } from "./DraggableFormItem";

export const FormBuilder = ({
  formElements,
  setFormElements,
  requiredField,
}: {
  formElements: FormElement[];
  setFormElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
  requiredField: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setNodeRef } = useDroppable({ id: "form-dropzone" });

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!active || !over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeIndex = formElements.findIndex((el) => el.id === activeId);
      const overIndex = formElements.findIndex((el) => el.id === overId);

      if (active.data?.current?.fromSidebar) {
        const newElement: FormElement = {
          id: nanoid(),
          label: "",
          required: false,
          component: active.data.current.type as FieldType,
          dataType: active.data.current.data as DataType,
          options: active.data.current.type === "multipleList" ? [""] : [],
        };
        setFormElements((prev) => [...prev, newElement]);
        return;
      }

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setFormElements((prev) => arrayMove(prev, activeIndex, overIndex));
      }
    },
  });

  const handleAddForm = (component: FieldType, type: DataType) => {
    const newElement: FormElement = {
      id: nanoid(),
      label: "",
      required: false,
      component: component,
      dataType: type,
      options: component === "multipleList" ? [""] : [],
    };
    setFormElements((prev) => [...prev, newElement]);
  };
  const handleDelete = useCallback(
    (id: string) => {
      setFormElements((prev) => prev.filter((el) => el.id !== id));
    },
    [setFormElements]
  );

  const handleCopyBelow = (id: string) => {
    const idx = formElements.findIndex((el) => el.id === id);
    const original = formElements[idx];
    const copy = { ...original, id: nanoid() };
    const updated = [...formElements];
    updated.splice(idx + 1, 0, copy);
    setFormElements(updated);
  };

  const handleCopyToEnd = (id: string) => {
    const idx = formElements.findIndex((el) => el.id === id);
    const original = formElements[idx];
    if (original) {
      const copy = { ...original, id: nanoid() };
      setFormElements((prev) => [...prev, copy]);
    }
  };

  const handleUpdate = (id: string, updatedFields: Partial<FormElement>) => {
    setFormElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updatedFields } : el))
    );
  };

  return (
    <div
      id="form-builder"
      ref={setNodeRef}
      className={cn(
        "min-h-56 flex flex-col gap-4 rounded-xl border border-dashed border-primary/50 bg-muted/40 p-6",
        requiredField &&
          formElements.length === 0 &&
          "border-destructive justify-center items-center"
      )}
    >
      {requiredField && formElements.length === 0 && (
        <div className="flex items-center gap-1">
          <CircleAlert className="stroke-destructive" />
          <span className="text-destructive">Add at least 1 question.</span>
        </div>
      )}
      <SortableContext
        items={formElements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        {formElements.map((el) => (
          <DraggableFormItem key={el.id} id={el.id} element={el}>
            {({ dragHandleProps }) =>
              el.component === "answer" ? (
                <AnswerForm
                  element={el}
                  requiredField={requiredField}
                  onDelete={() => handleDelete(el.id)}
                  onCopyBelow={() => handleCopyBelow(el.id)}
                  onCopyToEnd={() => handleCopyToEnd(el.id)}
                  onChange={(updatedFields) =>
                    handleUpdate(el.id, updatedFields)
                  }
                  dragHandleProps={dragHandleProps}
                />
              ) : (
                <MultipleList
                  element={el}
                  requiredField={requiredField}
                  onDelete={() => handleDelete(el.id)}
                  onCopyBelow={() => handleCopyBelow(el.id)}
                  onCopyToEnd={() => handleCopyToEnd(el.id)}
                  onChange={(updatedFields) =>
                    handleUpdate(el.id, updatedFields)
                  }
                  dragHandleProps={dragHandleProps}
                />
              )
            }
          </DraggableFormItem>
        ))}
      </SortableContext>
      {formElements.length >= 1 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="flex justify-center items-center" asChild>
            <button className="cursor-pointer [&_svg]:shrink-0 rounded-md p-2">
              <CirclePlus className="stroke-primary/70 hover:stroke-primary/90 cursor-pointer" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="center"
            sideOffset={4}
            className="w-fit p-1.5 bg-popover rounded-md  transition-shadow shadow-[var(--shadow)]"
          >
            <PopoverArrow className="fill-popover" />
            <div className="flex justify-center items-center flex-col gap-1">
              <button
                onClick={() => {
                  setOpen(false);
                  handleAddForm("answer", "single");
                }}
                className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
              >
                <SquarePen className="w-4 h-4 hover:fill-primary/80" />
                Single line answer
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  handleAddForm("answer", "multiple");
                }}
                className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
              >
                <Text className="w-4 h-4 hover:fill-primary/80" />
                Multiple line answer
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  handleAddForm("multipleList", "single");
                }}
                className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
              >
                <CircleCheck className="w-4 h-4 hover:fill-primary/80" />
                Single choice list
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  handleAddForm("multipleList", "multiple");
                }}
                className="flex items-center gap-2 hover:bg-accent hover:text-primary/80 px-2 py-1 rounded-md cursor-pointer"
              >
                <BookPlus className="w-4 h-4 hover:fill-primary/80" />
                Multiple choice list
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
