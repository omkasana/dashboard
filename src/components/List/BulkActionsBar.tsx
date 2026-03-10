"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Download, X } from "lucide-react";
import ExportDialog from "./ExportDialog";

interface Props {
  selectedIds: string[];
  data: any[];
  onClear: () => void;
}

export default function BulkActionsBar({ selectedIds, data, onClear }: Props) {
  const [showExport, setShowExport] = useState(false);

  if (!selectedIds.length) return null;

  const selectedData = data.filter((d) => selectedIds.includes(String(d.id)));

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2 mb-3 rounded-xl"
        style={{
          border: "1px solid var(--border)",
          background: "color-mix(in srgb, var(--muted) 60%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          className="text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {selectedIds.length} selected
        </span>

        {/* ACTION GROUP */}
        <div
          className="flex items-center gap-1 p-1 rounded-2xl border border-white/10"
          style={{ background: "var(--muted)" }}
        >
          {/* EXPORT */}
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--foreground)";
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--muted) 80%, transparent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted-foreground)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <Download size={15} />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* DELETE */}
          <button
            onClick={() => alert("delete")}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              color: "var(--brand-danger)",
              background:
                "color-mix(in srgb, var(--brand-danger) 10%, transparent)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--brand-danger) 18%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--brand-danger) 10%, transparent)")
            }
          >
            <TrashIcon className="w-4 h-4" />
            <span className="hidden md:inline">Delete</span>
          </button>

          {/* CLEAR */}
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--foreground)";
              e.currentTarget.style.background =
                "color-mix(in srgb, var(--muted) 80%, transparent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted-foreground)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <X size={15} />
            <span className="hidden md:inline">Clear</span>
          </button>
        </div>
      </div>

      {showExport && (
        <ExportDialog
          data={selectedData}
          filename="records"
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}
