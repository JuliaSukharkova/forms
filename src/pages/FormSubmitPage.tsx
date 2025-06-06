import { Loaders } from "@/components/Loaders";
import { secondsToTime } from "@/hooks/useTime";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useFormData } from "@/hooks/useFormData";
import type { AnswerElement, Answers, FormFromDB } from "@/types/type";
import {
  validateForm,
  isFormValid as checkFormValid,
} from "@/services/validation/validateForm";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SuccessMessage, TimeWarning, FormContent, Timer } from "@/components/FormSubmission";
import { saveAnswerForm } from "@/api/formApi";

export const FormSubmitPage = () => {
  const user = useAuthUser();
  const { id: formId } = useParams<{ id: string }>();
  const { form, time, isTimeLimit, setIsTimeLimit, isLoading } = useFormData(
    formId,
    user
  );
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const getAnswerElements = (
    form: FormFromDB,
    answers: Answers
  ): AnswerElement[] =>
    form.elements.map((el) => ({
      id: el.id,
      label: el.label,
      value: answers[el.id] ?? (el.dataType === "single" ? "" : []),
    }));

  if (isLoading) return <Loaders />;
  if (!form) return;

  const isFormValid = checkFormValid(form, answers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSuccess) return;
    const answerElements = getAnswerElements(form, answers);
    const isValid = validateForm(form, answers, setErrors);
    if (!isValid || !user || !form) return;

    setIsSubmitting(true);

    try {
      await saveAnswerForm(user.uid, form.id, answerElements);
      setIsSuccess(true);
    } catch (error) {
      console.log("Error sending answer form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start w-full m-5 h-auto">
      <div className="rounded-md p-10 relative w-full backdrop-blur-[4px] bg-muted/40 shadow border">
        {isSuccess ? (
          <SuccessMessage />
        ) : isTimeLimit && time ? (
          <TimeWarning
            time={secondsToTime(time)}
            onStart={() => setIsTimeLimit(false)}
          />
        ) : (
          <>
            <FormContent
              form={form}
              answers={answers}
              errors={errors}
              setAnswers={setAnswers}
              setErrors={setErrors}
              isFormValid={isFormValid}
              onSubmit={handleSubmit}
              formId={formId}
            />
          </>
        )}
      </div>
      {!isSuccess && !isTimeLimit && time > 0 && (
        <Timer
          timeLimit={time}
          onTimeEnd={() => {
            if (!isSuccess && !isSubmitting) {
              handleSubmit(new Event("submit") as unknown as React.FormEvent);
            }
          }}
        />
      )}
    </div>
  );
};
