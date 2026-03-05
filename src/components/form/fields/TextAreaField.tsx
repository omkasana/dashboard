"use client";

export default function TextAreaField({ field }: any) {
  return (
    <div className="flex flex-col gap-2 col-span-full">
      <label className="text-sm font-medium">{field.label}</label>

      <textarea
        rows={4}
        placeholder={field.placeholder}
        className="rounded-xl border border-border p-3 bg-background"
      />
    </div>
  );
}
