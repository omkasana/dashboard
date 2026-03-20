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
  const [loading, setLoading] = useState(false);

  if (!selectedIds.length) return null;

  // ✅ FIXED: use _id instead of id
  const selectedData = data.filter((d) => selectedIds.includes(String(d._id)));

  // ✅ BULK DELETE HANDLER
  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedIds.length} items?`)) return;

    try {
      setLoading(true);

      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:4000/api/models/${id}`, {
            method: "DELETE",
          }),
        ),
      );

      // clear selection
      onClear();

      // simple refresh (we can optimize later)
      window.location.reload();
    } catch (err) {
      console.error("Bulk delete error:", err);
    } finally {
      setLoading(false);
    }
  };

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
          >
            <Download size={15} />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* DELETE */}
          <button
            onClick={handleBulkDelete}
            disabled={loading}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              color: "var(--brand-danger)",
              background:
                "color-mix(in srgb, var(--brand-danger) 10%, transparent)",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <TrashIcon className="w-4 h-4" />
            <span className="hidden md:inline">
              {loading ? "Deleting..." : "Delete"}
            </span>
          </button>

          {/* CLEAR */}
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 h-9 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "var(--muted-foreground)" }}
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
