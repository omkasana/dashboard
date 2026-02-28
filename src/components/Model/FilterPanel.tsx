"use client";

interface FilterField {
  key: string;
  label: string;
  options: string[];
}

interface Props {
  fields: FilterField[];
  filters: Record<string, string>;
  setFilters: (value: any) => void;
  onReset: () => void;
}

export default function FilterPanel({
  fields,
  filters,
  setFilters,
  onReset,
}: Props) {
  return (
    <div className="p-4 border border-border rounded-xl bg-background shadow-sm flex flex-wrap gap-6">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col">
          <label className="text-xs text-muted-foreground mb-1">
            {field.label}
          </label>

          <select
            value={filters[field.key] ?? "all"}
            onChange={(e) =>
              setFilters((prev: any) => ({
                ...prev,
                [field.key]: e.target.value,
              }))
            }
            className="h-8 px-3 text-xs rounded-md border border-border"
          >
            <option value="all">All</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={onReset}
        className="h-8 px-3 text-xs rounded-md border border-border hover:bg-muted"
      >
        Reset
      </button>
    </div>
  );
}
