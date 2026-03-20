"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Download } from "lucide-react";
import ExportDialog from "@/components/List/ExportDialog";

interface RecordToolbarProps {
  model: string;
  id: string;
  onDelete?: () => void;
  data?: Record<string, unknown>;
}

export function RecordToolbar({
  model,
  id,
  onDelete,
  data = {},
}: RecordToolbarProps) {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-20 backdrop-blur-sm"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "color-mix(in srgb, var(--background) 85%, transparent)",
        }}
      >
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            className="cursor-pointer capitalize transition-colors hover:underline"
            onClick={() => router.push(`/dashboard/${model}`)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            {model}
          </span>

          <span>/</span>

          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {(data as any)?.title ||
              (data as any)?.name ||
              (data as any)?.label ||
              `#${id}`}
          </span>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-1 p-1 rounded-2xl border border-white/10"
          style={{ background: "var(--muted)" }}
        >
          {/* Export */}
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

          {/* Edit */}
          <button
            onClick={() => router.push(`/dashboard/${model}/update/${id}`)}
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
            <PencilSquareIcon className="w-4 h-4" />
            <span className="hidden md:inline">Edit</span>
          </button>

          {/* Delete */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
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
          ) : (
            <div className="flex items-center gap-1.5 px-2">
              <span
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Sure?
              </span>
              <button
                onClick={() => {
                  onDelete?.();
                  setShowDeleteConfirm(false);
                }}
                className="px-3 py-1.5 text-xs rounded-lg transition-all"
                style={{
                  color: "var(--brand-danger)",
                  background:
                    "color-mix(in srgb, var(--brand-danger) 15%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--brand-danger) 30%, transparent)",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-xs rounded-lg transition-all"
                style={{
                  color: "var(--muted-foreground)",
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {showExport && (
        <ExportDialog
          data={[data]}
          filename={`${model}-${id}`}
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}
