import { timeLimitSeconds } from "@/hooks/time";
import { supabase } from "@/lib/supabase";
import type { FormSettings } from "@/utils/types/type";

export const updateForm = async (formId: string, form: FormSettings) => {
  const { name, description, tag, timeLimit, elements } = form;
  const time = timeLimit ? timeLimitSeconds(timeLimit) : 0;;

  const { error } = await supabase.from("forms").update({
    name,
    description,
    tag,
    time_limit: time,
    elements: elements,
  })
  .eq("id", formId)

  if (error) throw error;
};
