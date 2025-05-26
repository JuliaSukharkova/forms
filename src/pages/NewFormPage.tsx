import { saveFormToSupabase } from "@/api/saveDataForm";
import { BackButton } from "@/components/BackButton";
import { FormBuilder } from "@/components/NewForm/FormBuilder";
import { FormName } from "@/components/NewForm/FormName";
import { SidebarForm } from "@/components/NewForm/SidebarForm";
import { Title } from "@/components/Title";
import { useAuthUser } from "@/hooks/useAuthUse";
import type { FormElement, FormSettings } from "@/utils/types/type";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const NewFormPage = () => {
  const user = useAuthUser();
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState<string>("");
  const [time, setTime] = useState<Date | null>(null);
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  const form: FormSettings = {
    name: name,
    description: desc,
    ...(time && { timeLimit: time }),
    ...(tag && { tag }),
    elements: formElements,
  };
  const handleSaveForm = async () => {
    setWasSubmitted(true);
    if (!name.trim() && !desc.trim() && formElements.length === 0) {
      return;
    }
    try {
      if (!user) return null;
      const userId = user.uid;
      await saveFormToSupabase(userId, form);
    } catch (error) {
      console.error(error);
    } finally {
      setWasSubmitted(false);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="m-5">
        <BackButton />
        <Title text="Create form" className="my-5" />
        <div className="flex items-start gap-5 w-full">
          <SidebarForm
            onSave={handleSaveForm}
            tag={tag}
            setTag={setTag}
            time={time}
            setTime={setTime}
          />
          <div className="w-full flex flex-col gap-5">
            <FormName
              name={name}
              setName={setName}
              desc={desc}
              setDesc={setDesc}
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
    </DndProvider>
  );
};

export default NewFormPage;
