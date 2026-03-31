import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

export const EXPORT_FORMATS = [
  "json",
  "csv",
  "txt",
  "xlsx",
  "pdf",
  "xml",
  "html",
] as const;

export type ExportFormat = (typeof EXPORT_FORMATS)[number];

export async function exportData({
  data,
  format = "json",
  filename = "export",
}: {
  data: any[];
  format?: ExportFormat;
  filename?: string;
}) {
  if (!data?.length) return;

  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");

  const finalName = `${filename}-${timestamp}.${format}`;

  if (format === "json") {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    downloadBlob(blob, finalName);
  } else if (format === "csv") {
    const headers = Object.keys(data[0]);

    const csv = [
      headers.join(","),

      ...data.map((row) =>
        headers
          .map((field) => `"${String(row[field] ?? "").replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    downloadBlob(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
      finalName,
    );
  } else if (format === "txt") {
    const txt = data.map((row) => JSON.stringify(row)).join("\n");

    downloadBlob(new Blob([txt], { type: "text/plain" }), finalName);
  } else if (format === "xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, finalName);
  } else if (format === "pdf") {
    const doc = new jsPDF();

    const headers = Object.keys(data[0]);

    let y = 10;

    doc.text(headers.join(" | "), 10, y);
    y += 8;

    data.forEach((row) => {
      const line = headers.map((h) => String(row[h] ?? "")).join(" | ");

      doc.text(line, 10, y);
      y += 8;
    });

    doc.save(finalName);
  } else if (format === "xml") {
    const xml =
      "<rows>\n" +
      data
        .map(
          (row) =>
            "  <row>" +
            Object.entries(row)
              .map(([k, v]) => `<${k}>${v}</${k}>`)
              .join("") +
            "</row>",
        )
        .join("\n") +
      "\n</rows>";

    downloadBlob(new Blob([xml], { type: "application/xml" }), finalName);
  } else if (format === "html") {
    const headers = Object.keys(data[0]);

    const html = `
<table border="1">
<thead>
<tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
</thead>
<tbody>
${data
  .map(
    (row) =>
      `<tr>${headers.map((h) => `<td>${row[h] ?? ""}</td>`).join("")}</tr>`,
  )
  .join("")}
</tbody>
</table>
`;

    downloadBlob(new Blob([html], { type: "text/html" }), finalName);
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}
