import { useCallback } from "react";

interface ExportToCSVProps {
  filename?: string;
  headers: string[];
  data: (string | number)[][];
}

export const useExportToCSV = () => {
  const exportToCSV = useCallback(({ filename = "export.csv", headers, data }: ExportToCSVProps) => {
    const csvContent =
      [headers, ...data]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return exportToCSV;
};
