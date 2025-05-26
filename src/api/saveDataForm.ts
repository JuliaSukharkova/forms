import { supabase} from "@/lib/supabase";
import type { FormSettings } from "@/utils/types/type";

export const saveFormToSupabase = async (
  userId: string,
  form: FormSettings
) => {
  const { name, description, tag, timeLimit, elements } = form;
  const timeLimitSeconds = timeLimit
  ? timeLimit.getHours() * 3600 + timeLimit.getMinutes() * 60 + timeLimit.getSeconds()
  : null; 
  
  const { error, data } = await supabase
    .from("forms")
    .insert([
      {
        name,
        description,
        tag,
        time_limit: timeLimitSeconds,
        user_id: userId,
        form_elements: elements,
      },
    ])
    .select();

  if (error) {
    console.error("Error saving form:", error);
    throw error;
  }

  return data;
};
