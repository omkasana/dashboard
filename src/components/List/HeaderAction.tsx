"use client";

import { Upload, Download, Plus } from "lucide-react";
import { useRef } from "react";

interface HeaderActionsProps {
  onImport?: (file: File) => void;
  onExport?: () => void;
  onAdd?: () => void;
  addLabel?: string;
}

export function HeaderActions({
  onImport,
  onExport,
  onAdd,
  addLabel = "Add New",
}: HeaderActionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* IMPORT */}
      {onImport && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImport(file);
            }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
        </>
      )}

      {/* EXPORT */}
      {onExport && (
        <button
          onClick={onExport}
          className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      )}

      {/* ADD */}
      {onAdd && (
        <button
          onClick={onAdd}
          className="px-4 h-9 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
