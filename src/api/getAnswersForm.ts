import { supabase } from "@/lib/supabase";

export const getAnswersCount = async (formId: string) => {
    const { count, error } = await supabase
      .from('form_responses')
      .select('*', { count: 'exact', head: true })
      .eq('formId', formId);
  
    if (error) {
      console.error("Error getting answers count:", error);
      return 0;
    }
  
    return count ?? 0;
  };
  