"use client";

import { useState, useEffect } from "react";
import { exportData, type ExportFormat } from "@/lib/exportUtils";
import { Button } from "../UI/button";

const POPULAR_FORMATS: { id: ExportFormat; label: string }[] = [
  { id: "json", label: "JSON" },
  { id: "csv", label: "CSV" },
  { id: "txt", label: "Text" },
  { id: "xlsx", label: "Excel" },
  { id: "pdf", label: "PDF" },
];

const OTHER_FORMATS: { id: ExportFormat; label: string }[] = [
  { id: "xml", label: "XML" },
  { id: "html", label: "HTML" },
];

interface Props {
  data: any[];
  filename?: string;
  onClose: () => void;
}

export default function ExportDialog({
  data,
  filename = "export",
  onClose,
}: Props) {
  const [format, setFormat] = useState<ExportFormat>("json");
  const [setDefault, setSetDefault] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("export-format") as ExportFormat | null;
    if (saved) setFormat(saved);
  }, []);

  const handleExport = () => {
    if (setDefault) localStorage.setItem("export-format", format);
    exportData({ data, format, filename });
    onClose();
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
        bg-black/40 backdrop-blur-[2px] px-3 sm:px-0 pb-3 sm:pb-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full sm:w-95 sm:max-w-[calc(100vw-2rem)]
          overflow-hidden
          p-4 sm:p-5
          rounded-2xl
          border border-border/60
          bg-background
          shadow-[0_-4px_32px_rgba(0,0,0,0.14)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.2)]
          space-y-4
        "
      >
        <h3 className="text-sm font-semibold text-foreground">Export Data</h3>

        {/* Popular formats */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Popular formats
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {POPULAR_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors
                  ${
                    format === f.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced formats */}
        <div className="space-y-1.5">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {showMore ? "Hide advanced formats ↑" : "More formats ↓"}
          </button>
          {showMore && (
            <div className="grid grid-cols-3 gap-1.5">
              {OTHER_FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors
                    ${
                      format === f.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Remember checkbox */}
        <label className="flex items-center gap-2.5 text-xs cursor-pointer select-none">
          <span
            className={`
              relative flex items-center justify-center
              w-4 h-4 rounded shrink-0
              border transition-all duration-200
              ${
                setDefault
                  ? "bg-primary/15 border-primary/50"
                  : "bg-background border-border"
              }
            `}
          >
            <input
              type="checkbox"
              checked={setDefault}
              onChange={() => setSetDefault(!setDefault)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {setDefault && (
              <svg
                className="w-3 h-3 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 011.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          <span className="text-muted-foreground">Remember this format</span>
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-0.5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
