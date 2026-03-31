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
    <div className="flex items-center gap-2 flex-wrap">
      {/* Glass Container */}
      <div
        className="
          flex items-center gap-1
          bg-black/5 dark:bg-white/5
          backdrop-blur-md
          rounded-2xl
          p-1
          border border-white/10
          transition-all duration-300
        "
      >
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
              className="
                flex items-center gap-2
                px-4 h-9
                rounded-xl
                text-sm font-medium
                text-muted-foreground
                hover:text-foreground
                hover:bg-white/5
                transition-all duration-200
              "
            >
              <Upload className="h-4 w-4" />
              <span className="hidden md:inline">Import</span>
            </button>
          </>
        )}

        {/* EXPORT */}
        {onExport && (
          <button
            onClick={onExport}
            className="
              flex items-center gap-2
              px-4 h-9
              rounded-xl
              text-sm font-medium
              text-muted-foreground
              hover:text-foreground
              hover:bg-white/5
              transition-all duration-200
            "
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </button>
        )}

        {/* ADD (Primary Action) */}
        {onAdd && (
          <button
            onClick={onAdd}
            className="
              flex items-center gap-2
              px-4 h-9
              rounded-xl
              text-sm font-medium
              bg-primary/80
              text-white
              hover:bg-primary
              transition-all duration-200
              shadow-sm
            "
          >
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">{addLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}