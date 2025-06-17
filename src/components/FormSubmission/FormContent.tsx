import type { Answers, FormFromDB } from "@/types/type";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/services/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

type Props = {
  form: FormFromDB | null;
  answers: Answers;
  errors: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formId?: string;
  isFormValid: boolean;
  submitButton: string;
  editButton: string
};

export const FormContent = ({
  form,
  answers,
  errors,
  setAnswers,
  setErrors,
  onSubmit,
  formId,
  isFormValid,
  submitButton,
  editButton
}: Props) => {
  const getAnswerAsString = (id: string) =>
    typeof answers[id] === "string" ? answers[id] : "";

  const getAnswerAsArray = (id: string) =>
    Array.isArray(answers[id]) ? answers[id] : [];

  if (!form) return;

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-h-[calc(100dvh-320px)]">
      <article className="font-medium text-lg">{form.name}</article>
      <h2 className="text-center">{form.description}</h2>
      {form.tag && (
        <button className="bg-primary py-0.5 px-2 rounded-md text-primary-foreground">
          {form.tag}
        </button>
      )}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-full justify-start items-start gap-5 mb-5 overflow-y-scroll max-h-[calc(100dvh-200px)] px-2 scrollbar scrollbar-thumb-primary"
      >
        {[...form.elements]
          .sort((a, b) => {
            if (a.component === "answer" && b.component !== "answer") return -1;
            if (a.component !== "answer" && b.component === "answer") return 1;
            return 0;
          })
          .map((el, id) => {
            if (el.component === "answer") {
              return (
                <div key={id} className="flex w-full flex-col gap-2">
                  <div className="flex">
                    <Label>{el.label}</Label>
                    {el.required && <span className="text-destructive">*</span>}
                  </div>
                  {el.dataType === "single" ? (
                    <>
                      <Input
                        placeholder="Enter answer"
                        value={getAnswerAsString(el.id)}
                        className={cn(
                          "w-full bg-muted",
                          errors[el.id] && "border-destructive"
                        )}
                        onChange={(e) => {
                          setAnswers((prev) => ({
                            ...prev,
                            [el.id]: e.target.value,
                          }));
                          setErrors((prev) => ({ ...prev, [el.id]: "" }));
                        }}
                      />
                      {errors[el.id] && (
                        <span className="text-destructive">
                          {errors[el.id]}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <Textarea
                        className={cn(
                          "w-full bg-muted",
                          errors[el.id] && "border-destructive"
                        )}
                        placeholder="Enter answer"
                        value={getAnswerAsString(el.id)}
                        onChange={(e) => {
                          setAnswers((prev) => ({
                            ...prev,
                            [el.id]: e.target.value,
                          }));
                          setErrors((prev) => ({ ...prev, [el.id]: "" }));
                        }}
                      />
                      {errors[el.id] && (
                        <span className="text-destructive">
                          {errors[el.id]}
                        </span>
                      )}
                    </>
                  )}
                </div>
              );
            }
            if (el.component === "multipleList") {
              return (
                <div key={id} className="flex flex-col gap-2">
                  <div className="flex">
                    <Label>{el.label}</Label>
                    {el.required && <span className="text-destructive">*</span>}
                  </div>
                  <div className="flex flex-row gap-2">
                    {el.dataType === "single" ? (
                      <RadioGroup
                        className="flex max-sm:flex-col gap-2.5"
                        value={getAnswerAsString(el.id)}
                        onValueChange={(value) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [el.id]: value,
                          }))
                        }
                      >
                        {el.options?.map((option, idx) => (
                          <div key={idx} className="flex gap-1.5">
                            <RadioGroupItem
                              value={option}
                              id={`${id}-${idx}`}
                            />
                            <Label htmlFor={`${id}-${idx}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-row max-sm:flex-col gap-2">
                          {el.options?.map((option, idx) => (
                            <div key={idx} className="flex items-center  gap-2">
                              <Checkbox
                                id={`${id}-${idx}`}
                                checked={getAnswerAsArray(el.id).includes(
                                  option
                                )}
                                onCheckedChange={(checked) => {
                                  setAnswers((prev) => {
                                    const prevArr =
                                      (prev[el.id] as string[]) || [];
                                    const updated = checked
                                      ? [...prevArr, option]
                                      : prevArr.filter((opt) => opt !== option);
                                    return { ...prev, [el.id]: updated };
                                  });
                                  setErrors((prev) => ({
                                    ...prev,
                                    [el.id]: "",
                                  }));
                                }}
                              />
                              <Label htmlFor={`${id}-${idx}`}>{option}</Label>
                            </div>
                          ))}
                        </div>
                        {errors[el.id] && (
                          <span className="text-destructive">
                            {errors[el.id]}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
      </form>
      <Separator />
      <div className="flex gap-5 justify-start items-start w-full">
        <Button
          disabled={!isFormValid}
          onClick={onSubmit}
          className={cn(
            "",
            !isFormValid ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {submitButton}
        </Button>
        <Button asChild className="cursor-pointer" variant="outline">
          <Link to={`/form/${formId}/edit`}>{editButton}</Link>
        </Button>
      </div>
    </div>
  );
};
