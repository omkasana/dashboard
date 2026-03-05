"use client";

export default function EmailField({ field }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        type="email"
        placeholder={field.placeholder || "example@email.com"}
        className="h-10 rounded-xl border border-border px-3 bg-background"
      />
    </div>
  );
}
