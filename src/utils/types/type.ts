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
  // onDragStart: (e: React.DragEvent) => void;
  // onDragEnd: (e: React.DragEvent) => void;
}

export type IChoiceForm = {
  name: string;
  onDelete: () => void;
  onCopyBelow: () => void;
  onCopyToEnd: () => void;
};

export type FieldType = "answer" | "multipleList";
export type DataType = "single" | "multiple";

export type SidebarItemType={
  id: string;
  type: string;
  data: string;
}

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


export const sidebarItems = [
  { id: nanoid(), type: 'answer', data: 'single' },
  { id: nanoid(), type: 'answer', data: 'multiple' },
  { id: nanoid(), type: 'multipleList', data: 'single' },
  { id: nanoid(), type: 'multipleList', data: 'multiple'  },
];
