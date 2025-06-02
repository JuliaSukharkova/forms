import type { ResponseElements } from "@/utils/types/type";

export const getChartData = (
    questionLabel: string,
    answers: ResponseElements[]
  ): Record<string, number> => {
    const counts: Record<string, number> = {};
  
    answers.forEach((response) => {
      const answer = response.answers.find((a) => a.label === questionLabel);
      if (!answer) return;
  
      const values = Array.isArray(answer.value)
        ? answer.value
        : [answer.value];
  
      values.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
    });
  
    return counts;
  };
  