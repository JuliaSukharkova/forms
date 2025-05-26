import type {
  DataType,
  FieldType,
  FormElement,
  SidebarItemType,
} from "@/utils/types/type";
import { useRef, useState } from "react";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@radix-ui/react-popover";
import { useDrop } from "react-dnd";
import { DraggableFormItem } from "./DraggableFormItem";
import { cn } from "@/lib/utils";

export const FormBuilder = ({
  formElements,
  setFormElements,
  requiredField,
}: {
  formElements: FormElement[];
  setFormElements: React.Dispatch<React.SetStateAction<FormElement[]>>;
  requiredField: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [, dropRef] = useDrop({
    accept: "FORM_ELEMENT",
    drop: (item: SidebarItemType) => {
      handleAddForm(item.type as FieldType, item.data as DataType);
    },
  });
  dropRef(ref);

  const handleAddForm = (component: FieldType, type: DataType) => {
    const newElement: FormElement = {
      id: nanoid(),
      label: "Question",
      required: false,
      component: component,
      dataType: type,
      options: component === "multipleList" ? [] : [],
    };
    setFormElements((prev) => [...prev, newElement]);
  };
  const handleDelete = (id: string) => {
    setFormElements((prev) => prev.filter((el) => el.id !== id));
  };

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
  const moveItem = (from: number, to: number) => {
    setFormElements((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };
  const handleUpdate = (id: string, updatedFields: Partial<FormElement>) => {
    setFormElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updatedFields } : el))
    );
  };

  return (
    <div
      id="form-builder"
      ref={ref}
      className={cn(
        "min-h-56 flex flex-col gap-4 rounded-xl border border-dashed border-border backdrop-blur-[4px] bg-muted p-6 transition-shadow shadow-[var(--shadow)]",
        requiredField && formElements.length === 0 && "border-destructive justify-center items-center"
      )}
    >
      {requiredField && formElements.length === 0 && (
        <div className="flex items-center gap-1">
          <CircleAlert className="stroke-destructive" />
          <span className="text-destructive">Add at least 1 question.</span>
        </div>
      )}
      {formElements.map((el, index) =>
        el.component === "answer" ? (
          <div key={el.id}>
            <DraggableFormItem index={index} moveItem={moveItem}>
              <AnswerForm
                key={el.id}
                element={el}
                requiredField={requiredField}
                onDelete={() => handleDelete(el.id)}
                onCopyBelow={() => handleCopyBelow(el.id)}
                onCopyToEnd={() => handleCopyToEnd(el.id)}
                onChange={(updatedFields) => handleUpdate(el.id, updatedFields)}
              />
            </DraggableFormItem>
          </div>
        ) : (
          <div key={el.id}>
            <DraggableFormItem key={el.id} index={index} moveItem={moveItem}>
              <MultipleList
                key={el.id}
                element={el}
                requiredField={requiredField}
                onDelete={() => handleDelete(el.id)}
                onCopyBelow={() => handleCopyBelow(el.id)}
                onCopyToEnd={() => handleCopyToEnd(el.id)}
                onChange={(updatedFields) => handleUpdate(el.id, updatedFields)}
              />
            </DraggableFormItem>
          </div>
        )
      )}
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
