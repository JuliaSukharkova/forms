import { supabase } from "@/lib/supabase";

export const getUserForms = async (userId: string) => {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getting forms:", error);
    throw error;
  }

  return data;
};
