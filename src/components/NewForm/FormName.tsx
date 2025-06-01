import { useState, type FC } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface FormNameProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  requiredField: boolean;
  updateForm: boolean
}

export const FormName: FC<FormNameProps> = ({
  name,
  setName,
  desc,
  setDesc,
  requiredField,
  updateForm
}) => {
  const [isDescFocused, setIsDescFocused] = useState(false);
  const descHasValue = updateForm && desc.trim() !== "";

  return (
    <div className="rounded-xl border border-border backdrop-blur-[4px] bg-muted/80 p-6  transition-shadow shadow-[var(--shadow)] space-y-3 ">
      <Input
        placeholder="Name"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        className={cn(
          "text-lg font-semibold transition-colors",
          name && "!text-lg",
          requiredField && updateForm &&  !name.trim() && "border-destructive"
        )}
      />
      <Textarea
        placeholder="Description"
        value={desc}
        required
        onChange={(e) => setDesc(e.target.value)}
        onFocus={() => setIsDescFocused(true)}
        onBlur={() => setIsDescFocused(false)}
        className={cn(
          "transition-colors resize-none",
          requiredField  && "border-destructive",
          descHasValue && !isDescFocused
            ? "text-muted-foreground"
            : "text-foreground"
        )}
      />
    </div>
  );
};
