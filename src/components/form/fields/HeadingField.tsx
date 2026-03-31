"use client";

import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function HeadingField({ field }: FieldComponentProps) {
  const level = (field.level as 1 | 2 | 3 | 4 | undefined) ?? 3;

  const sizeMap = {
    1: "text-2xl font-bold",
    2: "text-xl  font-bold",
    3: "text-base font-semibold",
    4: "text-sm   font-semibold",
  };

  const textCls = sizeMap[level];

  return (
    <div className="col-span-full flex flex-col gap-1.5 pb-1">
      {/* Label */}
      <p className={`${textCls} text-foreground leading-tight tracking-tight`}>
        {field.label}
      </p>

      {/* Optional description */}
      {field.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {field.description as string}
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-border/60 mt-0.5" />
    </div>
  );
}
