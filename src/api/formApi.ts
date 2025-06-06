import { timeLimitSeconds } from "@/hooks/useTime";
import { supabase } from "@/services/supabase";
import type { AnswerElement, FormSettings } from "@/types/type";

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

export const getFormById = async (userId: string, formId: string) => {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching form by ID:", error);
    throw error;
  }

  return data;
};

export const getResponsesForm = async (formId: string) => {
  const { data, error } = await supabase
    .from("form_responses")
    .select("answers, created_at, formId")
    .eq("formId", formId);

  if (error) throw error;

  return data;
};

export const saveAnswerForm = async (
  userId: string,
  formId: string,
  answers: AnswerElement[]
) => {
  const { error } = await supabase.from("form_responses").insert([
    {
      formId,
      submitted_by: userId,
      answers,
    },
  ]);

  if (error) {
    console.error("Error sending answer form:", error);
    throw error;
  }
};

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

export const updateForm = async (formId: string, form: FormSettings) => {
  const { name, description, tag, timeLimit, elements } = form;
  const time = timeLimit ? timeLimitSeconds(timeLimit) : 0;

  const { error } = await supabase
    .from("forms")
    .update({
      name,
      description,
      tag,
      time_limit: time,
      elements: elements,
    })
    .eq("id", formId);

  if (error) throw error;
};

export const getAnswersCount = async (formId: string) => {
  const { count, error } = await supabase
    .from("form_responses")
    .select("*", { count: "exact", head: true })
    .eq("formId", formId);

  if (error) {
    console.error("Error getting answers count:", error);
    return 0;
  }

  return count ?? 0;
};

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

export const checkFormData = async (formId: string) => {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", formId);

  if (error) throw error;
  if (!data || data.length === 0) return null;

  return data[0];
};
