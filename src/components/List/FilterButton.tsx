import { Filter } from "lucide-react";

interface FilterButtonProps {
  onClick: () => void;
}

export function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-9 px-3 rounded-lg border border-border bg-background hover:bg-muted transition"
    >
      <Filter className="h-4 w-4" />
    </button>
  );
}
