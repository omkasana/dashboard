"use client";

import { useState } from "react";
import { Button } from "@/components/UI/Button";
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
        className="
        flex items-center justify-between
        px-4 py-2 mb-3
        rounded-xl
        bg-primary/10
        border border-primary/20
      "
      >
        <span className="text-sm font-medium">
          {selectedIds.length} selected
        </span>

        <div className="flex gap-2">
          {/* EXPORT */}
          <Button size="sm" onClick={() => setShowExport(true)}>
            Export
          </Button>

          {/* DELETE */}
          <Button size="sm" variant="destructive">
            Delete
          </Button>

          {/* CLEAR */}
          <Button size="sm" variant="ghost" onClick={onClear}>
            Clear
          </Button>
        </div>
      </div>

      {/* EXPORT DIALOG */}
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
