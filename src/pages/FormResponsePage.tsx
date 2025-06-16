import { getFormById, getResponsesForm } from "@/api/formApi";
import { BackButton } from "@/components/BackButton";
import { PieChartComponent } from "@/components/PieChart";
import { SortedMenu } from "@/components/SortMenu";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getChartData } from "@/hooks/getChartData";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useExportToCSV } from "@/hooks/useExportToCSV";
import { cn } from "@/services/lib/utils";
import type { FormFromDB, ResponseElements } from "@/types/type";
import { ChartPie, TableIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export const FormResponsePage = () => {
  const user = useAuthUser();
  const { id: formId } = useParams<{ id: string }>();
  const [form, setForm] = useState<FormFromDB>();
  const [answers, setAnswers] = useState<ResponseElements[]>([]);
  const [isAnalitics, setIsAnanlitics] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortType>("new");
  const exportToCSV = useExportToCSV();
  const { t } = useTranslation();

  const sortLabel = {
    new: t("formResponse.sort.new"),
    old: t("formResponse.sort.old"),
  };

  type SortType = keyof typeof sortLabel;
  const sortedAnswers = [...answers].sort((a, b) => {
    switch (sortOrder) {
      case "new":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "old":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      default:
        return 0;
    }
  });
  const allAnswers = sortedAnswers.map((item) => item.answers);

  const handleExport = () => {
    if (!form || !answers.length) return;

    const headers = ["№", ...form.elements.map((el) => el.label), "created_at"];

    const data = answers.map((response) => {
      const row = [
        response.formId,
        ...form.elements.map((question) => {
          const found = response.answers.find(
            (a) => a.label === question.label
          );
          if (!found) return "";
          return Array.isArray(found.value)
            ? found.value.join(", ")
            : found.value;
        }),
        new Date(response.created_at).toLocaleString(),
      ];
      return row;
    });

    exportToCSV({
      filename: `${form.name || "form"}-responses.csv`,
      headers,
      data,
    });
  };

  useEffect(() => {
    const fetchForms = async () => {
      if (!user || !formId) return;
      try {
        const data = await getFormById(user.uid, formId);
        const answers = await getResponsesForm(formId);
        setForm(data);
        setAnswers(answers);
      } catch (err) {
        console.error("Error loading form", err);
      }
    };
    fetchForms();
  }, [formId, user]);

  if (!form) return;

  return (
    <div className="m-5">
      <BackButton />
      <Title
        text={t("formResponse.title")}
        className="my-5 text-primary-text"
      />
      <div className="relative w-full rounded-xl border border-primary-light backdrop-blur-[4px] bg-muted/40 p-6 transition-shadow shadow-[var(--shadow)]">
        <div className="flex flex-col justify-center items-center gap-2.5 mb-2.5">
          <h1 className="text-lg text-primary font-medium">{form.name}</h1>
          <h2 className="text-center">{form.description}</h2>
        </div>
        <div className="flex flex-col gap-1 mb-2.5">
          <div className="flex items-center">
            <button
              aria-selected={!isAnalitics}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all  font-medium cursor-pointer",
                !isAnalitics
                  ? "text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => setIsAnanlitics(false)}
            >
              <TableIcon className="w-4 h-4" />
              {t("formResponse.tableTitle")}
            </button>
            <button
              aria-selected={isAnalitics}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all  font-medium cursor-pointer",
                isAnalitics
                  ? "text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => setIsAnanlitics(true)}
            >
              <ChartPie className="w-4 h-4" />
              {t("formResponse.analyticTitle")}
            </button>
          </div>
          <div className="relative w-full h-0.5 bg-border rounded overflow-hidden">
            <div
              className={cn(
                "absolute top-0 h-full bg-primary transition-all duration-300 rounded-md",
                isAnalitics ? "left-23 w-25 max-sm:left-28 max-sm:w-28" : "left-0 w-20 max-sm:w-25"
              )}
            />
          </div>
        </div>
        <div className="flex justify-between max-sm:flex-col w-full max-sm:gap-2.5">
        <div className="relative w-full">
          <SortedMenu
            value={sortOrder}
            onChange={setSortOrder}
            sortLabel={sortLabel}
            isDisabled={allAnswers.length === 0}
            className="w-full"
          /></div>
          <Button className="px-10 cursor-pointer" onClick={handleExport}>
            Export CSV
          </Button>
        </div>
        <div className="rounded-md overflow-hidden border border-primary/20 mt-2.5">
          {isAnalitics ? (
            allAnswers.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-5 w-full">
                {form.elements.map((question, i) => {
                  const data = getChartData(question.label, answers);
                  if (Object.keys(data).length === 0) return null;
                  return (
                    <PieChartComponent
                      key={i}
                      title={question.label}
                      data={data}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-accent/70 w-full p-4 text-center">
                {t("formResponse.notFoundAnalytic")}
              </div>
            )
          ) : allAnswers.length > 0 ? (
            <Table className="bg-accent/70 w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center border-r border-border">
                    №
                  </TableHead>
                  {form.elements.map((el, id) => (
                    <TableHead
                      className="border-r border-border last:border-r-0 text-center "
                      key={id}
                    >
                      {el.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAnswers.map((answerRow, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center border-r border-border">
                      {index + 1}
                    </TableCell>
                    {form.elements.map((question, colIndex) => {
                      const answer = answerRow.find(
                        (a) => a.label === question.label
                      );
                      return (
                        <TableCell
                          key={colIndex}
                          className="text-center border-r border-border last:border-0 whitespace-pre-wrap break-words"
                        >
                          {answer &&
                          Array.isArray(answer.value) &&
                          answer?.value.length > 0
                            ? answer.value.join(", ")
                            : answer?.value || "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="bg-accent/70 w-full p-4 text-center">
              {t("formResponse.noFound")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
