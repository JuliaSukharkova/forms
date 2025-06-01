import { supabase } from "@/lib/supabase";
import type { AnswerElement } from "@/utils/types/type";

export const saveAnswerForm = async (
  userId: string,
  formId: string,
  answers: AnswerElement[]
) => {
  const { error,  } = await supabase
    .from("form_responses")
    .insert([
      { 
        formId,
        submitted_by: userId,
        answers,
      },
    ])

  if (error) {
    console.error("Error sending answer form:", error);
    throw error;
  }
};