import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export const FormName = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isDescFocused, setIsDescFocused] = useState(false);
  const descHasValue = desc.trim() !== "";

  return (
    <div className="rounded-xl border border-border backdrop-blur-[4px] bg-muted/80 p-6  transition-shadow shadow-[var(--shadow)] space-y-3 ">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={cn(
          "text-lg font-semibold transition-colors",
          name && "!text-xl"
        )}
      />
      <Textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onFocus={() => setIsDescFocused(true)}
        onBlur={() => setIsDescFocused(false)}
        className={cn(
          "transition-colors resize-none",
          descHasValue && !isDescFocused
            ? "text-muted-foreground"
            : "text-foreground"
        )}
      />
    </div>
  );
};
