import { checkFormData } from "@/api/checkFormData";
import { createFormToSupabase } from "@/api/createDataForm";
import { updateForm } from "@/api/updateForm";
import { BackButton } from "@/components/BackButton";
import { Loaders } from "@/components/Loaders";
import { FormBuilder } from "@/components/NewForm/FormBuilder";
import { FormName } from "@/components/NewForm/FormName";
import { SidebarForm } from "@/components/NewForm/SidebarForm";
import { Title } from "@/components/Title";
import { secondsToTime } from "@/hooks/useTime";
import { useAuthUser } from "@/hooks/useAuthUse";
import type {
  FormElement,
  FormSettings,
  SidebarItemType,
} from "@/utils/types/type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SidebarItem } from "@/components/NewForm/SidebarItem";
import { AnswerForm } from "@/components/NewForm/AnswerForm";
import { MultipleList } from "@/components/NewForm/MultipleList";

const FormEditorPage = () => {
  const user = useAuthUser();
  const { id: formId } = useParams<{ id: string }>();
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);
  const [isFormExists, setIsFormExists] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);
  const [draggedItem, setDraggedItem] = useState<
    FormElement | SidebarItemType | null
  >(null);

  const fetchFormData = useCallback(async () => {
    if (!formId) return;
    try {
      const data = await checkFormData(formId);
      if (data) {
        setName(data.name);
        setDesc(data.description);
        setTag(data.tag);
        setFormElements(data.elements || []);
        if (data.time_limit !== null && typeof data.time_limit === "number") {
          setTime(secondsToTime(data.time_limit));
        }
        setIsFormExists(true);
      }
    } catch (error) {
      console.error("Error loading form data", error);
    } finally {
      setIsLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  const form: FormSettings = {
    name: name,
    description: desc,
    tag,
    elements: formElements,
    ...(time && { timeLimit: time }),
  };

  const handleSaveForm = async () => {
    setWasSubmitted(true);
    if (!name.trim() && !desc.trim() && formElements.length === 0) {
      return;
    }
    if (!user || !formId) return;
    try {
      if (isFormExists) {
        await updateForm(formId, form);
        toast.success("Form successfully updated");
      } else {
        const userId = user.uid;
        await createFormToSupabase(userId, form, formId);
        toast.success("Form successfully saved");
        setIsFormExists(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWasSubmitted(false);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-center">
        <p className="text-lg font-medium">
          The constructor is not available on mobile devices.
        </p>
      </div>
    );
  }

  if (isLoading) return <Loaders />;

  return (
    <DndContext
      onDragStart={(event) => {
        const data = event.active.data.current;
        if (!data) return;
        if (data.fromSidebar) {
          setDraggedItem({
            id: data.id,
            type: data.type,
            data: data.data,
            fromSidebar: true,
          } as SidebarItemType);
        } else {
          setDraggedItem({
            id: data.id,
            label: data.label,
            required: data.required,
            component: data.component,
            dataType: data.dataType,
            options: data.options ?? [],
          } as FormElement);
        }
      }}
      onDragEnd={() => setDraggedItem(null)}
      onDragCancel={() => setDraggedItem(null)}
    >
      <div className="m-5">
        <BackButton />
        <Title text="Create form" className="my-5 text-primary-text" />
        <div className="flex items-start gap-5 w-full">
          <SidebarForm
            onSave={handleSaveForm}
            tag={tag}
            setTag={setTag}
            time={time}
            setTime={setTime}
            updateForm={isFormExists}
            formId={formId}
            isLoading={isLoading}
          />
          <div className="w-full flex flex-col gap-5">
            <FormName
              name={name}
              setName={setName}
              desc={desc}
              setDesc={setDesc}
              updateForm={isFormExists}
              requiredField={wasSubmitted}
            />
            <FormBuilder
              formElements={formElements}
              setFormElements={setFormElements}
              requiredField={wasSubmitted}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {draggedItem &&
          ("fromSidebar" in draggedItem ? (
            <SidebarItem item={draggedItem as SidebarItemType} />
          ) : (
            (() => {
              const formItem = draggedItem as FormElement;
              return formItem.component === "answer" ? (
                <AnswerForm
                  element={formItem}
                  requiredField={false}
                  dragHandleProps={{}} // можно передать noop или просто пустой объект
                />
              ) : (
                <MultipleList
                  element={formItem}
                  requiredField={false}
                  dragHandleProps={{}}
                />
              );
            })()
          ))}
      </DragOverlay>
    </DndContext>
  );
};

export default FormEditorPage;
