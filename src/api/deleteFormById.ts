import { supabase } from "@/lib/supabase";

export const deleteFormById = async (formId: string) => {
  const { error: answerError } = await supabase
    .from("form_responses")
    .delete()
    .eq("formId", formId);

  if (answerError) throw answerError;

  const { error: formError } = await supabase
    .from("forms")
    .delete()
    .eq("id", formId);

  if (formError) throw formError;
};
