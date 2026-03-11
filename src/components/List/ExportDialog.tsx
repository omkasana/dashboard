"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { exportData, type ExportFormat } from "@/lib/exportUtils";

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

    if (saved) {
      setFormat(saved);
    }
  }, []);

  const handleExport = () => {
    if (setDefault) {
      localStorage.setItem("export-format", format);
    }

    exportData({
      data,
      format,
      filename,
    });

    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/25 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
  relative
  w-[420px]
  p-6
  rounded-2xl
  border border-white/10
  bg-gradient-to-b from-white/[0.08] to-white/[0.02]
  backdrop-blur-sm
  shadow-[0_20px_60px_rgba(0,0,0,0.55)]
  space-y-5
"
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none
  bg-gradient-to-b from-white/[0.06] via-transparent to-transparent"
        />
        <h3 className="text-lg font-semibold">Export Data</h3>

        {/* Popular formats */}

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Popular formats
          </p>

          <div className="grid grid-cols-3 gap-2">
            {POPULAR_FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`rounded-lg border px-3 py-2 text-sm transition
                ${
                  format === f.id
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced formats */}

        <div className="space-y-2">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {showMore ? "Hide advanced formats" : "More formats"}
          </button>

          {showMore && (
            <div className="grid grid-cols-3 gap-2">
              {OTHER_FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`rounded-lg border px-3 py-2 text-sm transition
                  ${
                    format === f.id
                      ? "border-primary bg-primary/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Default checkbox */}

        <label className="flex items-center gap-3 text-sm cursor-pointer select-none">
          <span
            className={`
      relative flex items-center justify-center
      w-5 h-5 rounded-md
      border border-white/15
      bg-white/[0.04]
      backdrop-blur-sm
      transition-all duration-200
      ${setDefault ? "bg-primary/20 border-primary/40" : ""}
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
                className="w-3.5 h-3.5 text-primary"
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

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>
    </div>
  );
}
