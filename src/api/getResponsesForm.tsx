import { supabase } from "@/lib/supabase";

export const getResponsesForm = async (formId: string) => {
  const { data, error } = await supabase
    .from("form_responses")
    .select("answers, created_at, formId")
    .eq("formId", formId);

  if (error) throw error;

  return data;
};
