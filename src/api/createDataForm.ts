import { timeLimitSeconds } from "@/hooks/useTime";
import { supabase } from "@/lib/supabase";
import type { FormSettings } from "@/utils/types/type";

export const createFormToSupabase = async (
  userId: string,
  form: FormSettings,
  formId: string
) => {
  const { name, description, tag, timeLimit, elements } = form;
  const time = timeLimit ? timeLimitSeconds(timeLimit) : 0;

  const { error, data } = await supabase
    .from("forms")
    .insert([
      {
        id: formId,
        name,
        description,
        tag,
        time_limit: time,
        user_id: userId,
        elements: elements,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error saving form:", error);
    throw error;
  }

  return data.id;
};
