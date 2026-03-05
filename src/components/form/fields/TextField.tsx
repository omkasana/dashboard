"use client";

export default function TextField({ field }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        type={field.type === "decimal" ? "number" : field.type}
        step={field.type === "decimal" ? "0.01" : undefined}
        placeholder={field.placeholder}
        className="h-10 rounded-xl border border-border px-3 bg-background"
      />
    </div>
  );
}
