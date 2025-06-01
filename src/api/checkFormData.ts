import { supabase } from "@/lib/supabase";

export const checkFormData = async (formId: string) => {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)

    if(error) throw error
    if(!data || data.length ===0) return null

    return data[0]
};
