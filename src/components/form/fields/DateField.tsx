"use client";

export default function DateField({ field }: any) {
  const type = field.type === "datetime" ? "datetime-local" : field.type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        type={type}
        className="h-10 rounded-xl border border-border px-3 bg-background"
      />
    </div>
  );
}
