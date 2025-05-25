import { BackButton } from "@/components/BackButton";
import { FormBuilder } from "@/components/NewForm/FormBuilder";
import { FormName } from "@/components/NewForm/FormName";
import { SidebarForm } from "@/components/NewForm/SidebarForm";
import { Title } from "@/components/Title";

const NewFormPage = () => {
  return (
    <div className="m-5">
      <BackButton />
      <Title text="Create form" className="my-5" />
      
      <div className="flex items-start gap-5 w-full">
        <div className="w-1/3">
          <SidebarForm />
        </div>
        <div className="w-2/3 flex flex-col gap-5">
          <FormName />
          <FormBuilder />
        </div>
      </div>
    </div>
  );
};

export default NewFormPage;
