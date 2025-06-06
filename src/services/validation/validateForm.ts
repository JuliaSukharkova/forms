import type { Answers, FormFromDB } from "../../types/type";

export const validateForm = (
  form: FormFromDB,
  answers: Answers,
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  const newErrors: Record<string, string> = {};

  form.elements.forEach((el) => {
    if (!el.required) return;

    const value = answers[el.id];
    const isEmpty =
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      newErrors[el.id] = "This field is required";
    }
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const isFormValid = (form: FormFromDB, answers: Answers): boolean => {
  return form.elements.every((el) => {
    if (!el.required) return true;

    const value = answers[el.id];
    const isEmpty =
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0) ||
      value === undefined;

    return !isEmpty;
  });
};
