import { nanoid } from "nanoid";

export type FormData = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  repeatPassword: string;
};

export interface IFormProps {
  element: FormElement;
  onDelete?: () => void;
  isPreview?: boolean;
  onCopyBelow: () => void;
  onCopyToEnd: () => void;
  onChange: (updatedFields: Partial<FormElement>) => void;
  requiredField: boolean;
}

export type IChoiceForm = {
  name: string;
  onDelete: () => void;
  onCopyBelow: () => void;
  onCopyToEnd: () => void;
};

export type FieldType = "answer" | "multipleList";
export type DataType = "single" | "multiple";

export type SidebarItemType = {
  id: string;
  type: "answer" | "multipleList";
  data: "single" | "multiple";
};

export interface FormElement {
  id: string;
  label: string;
  required: boolean;
  component: FieldType;
  dataType: DataType;
  options?: string[];
}

export type DroppedData =
  | {
      type: "sidebar";
      component: FormElement["component"];
      dataType: FormElement["dataType"];
    }
  | {
      type: "reorder";
      id: string;
    };

export const sidebarItems: SidebarItemType[] = [
  { id: nanoid(), type: "answer", data: "single" },
  { id: nanoid(), type: "answer", data: "multiple" },
  { id: nanoid(), type: "multipleList", data: "single" },
  { id: nanoid(), type: "multipleList", data: "multiple" },
];

export type FormSettings = {
  name: string;
  description: string;
  timeLimit?: string;
  tag?: string;
  elements: FormElement[];
};

export type FormFromDB = {
  id: string;
  name: string;
  description: string;
  time_limit: string;
  tag?: string;
  user_id: string;
  elements: FormElement[];
  created_at: Date;
};

export type AnswerElement = {
  id: string;
  label: string;
  value: string | string[];
};

export type Answers = Record<string, string | string[]>;

export type ResponseElements = {
  created_at: Date;
  answers: AnswerElement[]
}