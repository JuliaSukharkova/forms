import { getFormById } from "@/api/formApi";
import type { FormFromDB } from "@/types/type";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useFormData = (formId: string | undefined, user: User | null) => {
  const [form, setForm] = useState<FormFromDB | null>(null);
  const [time, setTime] = useState<number>(0);
  const [isTimeLimit, setIsTimeLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      if (!user || !formId) return;
      try {
        const data = await getFormById(user.uid, formId);
        setForm(data);
        if (typeof data.time_limit === "number") {
          if (data.time_limit > 0) {
            setIsTimeLimit(true);
          }
          setTime(data.time_limit);
        }
      } catch (err) {
        console.error("Error loading form", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchForms();
  }, [formId, user]);

  return { form, time, isTimeLimit, setIsTimeLimit, isLoading };
};
