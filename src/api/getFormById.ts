import { supabase } from "@/lib/supabase";

export const getFormById = async (userId: string, formId: string) => {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)
    .eq("user_id", userId)
    .single()

  if (error) {
    console.error("Error fetching form by ID:", error);
    throw error;
  }

  return data;
};
