import { BackButton } from "@/components/BackButton";
import { Loaders } from "@/components/Loaders";
import { Title } from "@/components/Title";
import { secondsToTime } from "@/hooks/useTime";
import { useAuthUser } from "@/hooks/useAuthUser";
import type { FormElement, FormSettings, SidebarItemType } from "@/types/type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  SidebarForm,
  FormName,
  FormBuilder,
  SidebarItem,
  AnswerForm,
  MultipleList,
  AIAssistantDrawer,
} from "@/components/FormBuilder";
import { checkFormData, createFormToSupabase, updateForm } from "@/api/formApi";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const FormEditorPage = () => {
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
  const [aiOpen, setAIOpen] = useState(false);
  const { t } = useTranslation();

  const handleFormGenerated = (form: FormSettings) => {
    setName(form.name);
    setDesc(form.description);
    setFormElements(form.elements);
  };

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
    if (formElements.length === 0) return;
    if (!user || !formId) return;
    try {
      if (isFormExists) {
        await updateForm(formId, form);
        toast.success(t("formEditor.toastSuccessUpdate"));
      } else {
        const userId = user.uid;
        await createFormToSupabase(userId, form, formId);
        toast.success(t("formEditor.toastSuccessSave"));
        setIsFormExists(true);
      }
    } catch (error) {
      toast.error(t("formEditor.toastError"), { description: String(error) });
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
        <p className="text-lg font-medium">{t("formEditor.mobileTitle")}</p>
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
      <div className="relative m-5">
        <BackButton />
        <Title
          text={t("formEditor.title")}
          className="my-5 text-primary-text"
        />
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
              labelName={t("formEditor.formName")}
              labelDescription={t("formEditor.formDescription")}
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
        <div className="absolute right-0 top-0">
          <Button
            className="cursor-pointer border border-primary/10 focus:border-primary text-primary-text hover:text-primary-text hover:bg-primary/10 focus:bg-primary/10  px-4 py-2"
            onClick={() => setAIOpen(true)}
            variant="outline"
          >
            <span className="animate-pulse">✨</span>
            {t("formEditor.aiButton")}
          </Button>
        </div>
        <AIAssistantDrawer
          open={aiOpen}
          onClose={() => setAIOpen(false)}
          onFormGenerated={handleFormGenerated}
          title={t("formEditor.aiTitle")}
          descriptionOne={t("formEditor.aiDescriptionOne")}
          descriptionSecond={t("formEditor.aiDescriptionSecond")}
          aiButtonSave={t("formEditor.aiButtonSave")}
          aiButtonLoading={t("formEditor.aiButtonLoading")}
          aiButtonClose={t("formEditor.aiButtonClose")}
        />
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
                  dragHandleProps={{}}
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
