import { Upload, Download, Plus } from "lucide-react";

interface HeaderActionsProps {
  onImport?: () => void;
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
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {onImport && (
        <button
          onClick={onImport}
          className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Import
        </button>
      )}

      {onExport && (
        <button
          onClick={onExport}
          className="px-4 h-9 text-sm rounded-lg border border-border bg-background hover:bg-muted transition flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      )}

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
