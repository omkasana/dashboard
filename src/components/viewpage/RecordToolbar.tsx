"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Download } from "lucide-react";
import ExportDialog from "@/components/List/ExportDialog";
import BackButton from "../UI/BackButton";

/* ================= TYPES ================= */

interface RecordToolbarProps<T = object> {
  model: string;
  id: string;
  onDelete?: () => Promise<void> | void;
  data?: T;
}

/* ================= COMPONENT ================= */

export function RecordToolbar<T extends object>({
  model,
  id,
  onDelete,
  data,
}: RecordToolbarProps<T>) {
  const router = useRouter();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= HELPERS ================= */

  const getTitle = () => {
    if (!data) return `#${id}`;

    const record = data as Record<string, unknown>;

    if ("title" in record && record.title) return String(record.title);

    if ("name" in record && record.name) return String(record.name);

    if ("label" in record && record.label) return String(record.label);

    return `#${id}`;
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (onDelete) {
        await onDelete();
      } else {
        await fetch(`/api/${model}/${id}`, {
          method: "DELETE",
        });
      }

      router.push(`/dashboard/${model}`);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete record");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <div
        className="
          flex items-center justify-between px-4 py-3
          sticky top-0 z-20 backdrop-blur-sm
          border-b border-[var(--border)]
          bg-[color-mix(in_srgb,var(--background)_85%,transparent)]
        "
      >
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <BackButton variant="icon" />

          <span
            className="cursor-pointer capitalize hover:underline"
            onClick={() => router.push(`/dashboard/${model}`)}
          >
            {model}
          </span>

          <span>/</span>

          <span className="font-medium text-foreground">{getTitle()}</span>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border border-white/10 bg-muted">
          {/* EXPORT */}
          <button
            onClick={() => setShowExport(true)}
            className="
              flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium
              text-muted-foreground hover:text-foreground
              hover:bg-muted/80 transition
            "
          >
            <Download size={15} />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* EDIT */}
          <button
            onClick={() => router.push(`/dashboard/${model}/update/${id}`)}
            className="
              flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium
              text-muted-foreground hover:text-foreground
              hover:bg-muted/80 transition
            "
          >
            <PencilSquareIcon className="w-4 h-4" />
            <span className="hidden md:inline">Edit</span>
          </button>

          {/* DELETE */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="
                flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium
                text-red-500 bg-red-500/10 hover:bg-red-500/20 transition
              "
            >
              <TrashIcon className="w-4 h-4" />
              <span className="hidden md:inline">Delete</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs text-muted-foreground">Confirm?</span>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="
                  px-3 py-1.5 text-xs rounded-lg
                  text-red-500 bg-red-500/10 border border-red-500/30
                  hover:bg-red-500/20 transition disabled:opacity-50
                "
              >
                {loading ? "Deleting..." : "Yes"}
              </button>

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="
                  px-3 py-1.5 text-xs rounded-lg
                  text-muted-foreground bg-muted border border-border
                  hover:bg-muted/80 transition
                "
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= EXPORT MODAL ================= */}
      {showExport && (
        <ExportDialog
          data={data ? [data] : []}
          filename={`${model}-${id}`}
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}
