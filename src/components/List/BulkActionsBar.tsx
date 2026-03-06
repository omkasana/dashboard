"use client";

import { Button } from "@/components/UI/Button";

interface Props {
  selectedIds: string[];
  onClear: () => void;
}

export default function BulkActionsBar({ selectedIds, onClear }: Props) {
  if (!selectedIds.length) return null;

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-2 mb-3
        rounded-xl
        bg-primary/10
        border border-primary/20
      "
    >
      <span className="text-sm font-medium">{selectedIds.length} selected</span>

      <div className="flex gap-2">
        <Button size="sm">Export</Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
        <Button size="sm" variant="ghost" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
