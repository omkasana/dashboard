import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-background w-full xl:w-72">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
  );
}
