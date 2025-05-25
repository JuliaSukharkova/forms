import type {
  DataType,
  DroppedData,
  FieldType,
  FormElement,
} from "@/utils/types/type";
import { useState } from "react";
import { AnswerForm } from "./AnswerForm";
import { MultipleList } from "./MultipleList";
import { nanoid } from "nanoid";
import {
  BookPlus,
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

export const FormBuilder = () => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleAddForm = (component: FieldType, type: DataType) => {
    const newElement: FormElement = {
      id: nanoid(),
      label: "Question",
      required: false,
      component: component,
      dataType: type,
      options: component === "multipleList" ? ["Option 1", "Option 2"] : [],
    };
    setFormElements((prev) => [...prev, newElement]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;
    const data = JSON.parse(raw) as DroppedData;

    if (data.type === "sidebar") {
      const newElement: FormElement = {
        id: nanoid(),
        label: "Question",
        required: false,
        component: data.component,
        dataType: data.dataType,
        options:
          data.component === "multipleList" ? ["Option 1", "Option 2"] : [],
      };
      setFormElements((prev) => [...prev, newElement]);
    }

    if (data.type === "reorder" && data.id && draggedId) {
      const targetId = data.id;
      if (draggedId === targetId) return;
      const draggedIdX = formElements.findIndex((el) => el.id === draggedId);
      const targetIdX = formElements.findIndex((el) => el.id === targetId);
      if (draggedIdX === -1 || targetIdX === -1) return;
      const updated = [...formElements];
      const [draggedEl] = updated.splice(draggedIdX, 1);
      updated.splice(targetIdX, 0, draggedEl);
      setFormElements(updated);
      setDraggedId(null);
    }
  };
  const handleDelete = (id: string) => {
    setFormElements((prev) => prev.filter((el) => el.id !== id));
  };

  // const handleDragStart = (e: React.DragEvent, id: string) => {
  //   setDraggedId(id);
  //   const payload = JSON.stringify({ type: "reorder", id });
  //   e.dataTransfer.setData("application/json", payload);
  // };

  // const handleDragEnd = (e: React.DragEvent) => {
  //   const builder = document.getElementById("form-builder");
  //   const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
  //   if (!builder?.contains(dropTarget)) {
  //     setFormElements((prev) => prev.filter((el) => el.id !== draggedId));
  //   }
  //   setDraggedId(null);
  // };

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
  

  return (
    <div
      id="form-builder"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={handleDrop}
      className="min-h-56 flex flex-col gap-4 rounded-xl border border-dashed border-border backdrop-blur-[4px] bg-muted p-6 transition-shadow shadow-[var(--shadow)]"
    >
      {formElements.map((el) =>
        el.component === "answer" ? (
          <AnswerForm
            key={el.id}
            element={el}
            onDelete={() => handleDelete(el.id)}
            onCopyBelow={() => handleCopyBelow(el.id)}
            onCopyToEnd={() => handleCopyToEnd(el.id)}
            // onDragStart={(e) => handleDragStart(e, el.id)}
            // onDragEnd={handleDragEnd}
          />
        ) : (
          <MultipleList
            key={el.id}
            element={el}
            onDelete={() => handleDelete(el.id)}
            onCopyBelow={() => handleCopyBelow(el.id)}
            onCopyToEnd={() => handleCopyToEnd(el.id)}
            // onDragStart={(e) => handleDragStart(e, el.id)}
            // onDragEnd={handleDragEnd}
          />
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
