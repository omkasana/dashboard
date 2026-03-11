"use client";

import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

export default function RadioField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const options = field.options ?? [];
  const layout = (field.layout as "row" | "col" | undefined) ?? "row";
  const selected = value !== undefined && value !== null ? String(value) : null;

  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      <div
        className={`flex flex-wrap gap-2 ${layout === "col" ? "flex-col" : "flex-row"}`}
      >
        {options.map((opt) => {
          const val = String(opt.value);
          const isActive = selected === val;

          return (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange?.(field.name, opt.value)}
              className={`
                group relative flex items-center gap-2.5
                px-3.5 py-2 rounded-xl
                border transition-all duration-200 cursor-pointer
                text-sm select-none
                focus:outline-none
                focus-visible:ring-2 focus-visible:ring-primary/40
                ${
                  isActive
                    ? "border-primary/60 bg-primary/8 text-foreground shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_10%,transparent)]"
                    : `${fc.base} ${fc.idle} text-muted-foreground hover:text-foreground hover:border-border/80`
                }
              `}
            >
              {/* Custom radio circle */}
              <span
                className={`
                shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center
                transition-all duration-200
                ${
                  isActive
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/40 bg-transparent group-hover:border-muted-foreground/70"
                }
              `}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                )}
              </span>

              {/* Label */}
              <span
                className={`font-medium transition-colors duration-150
                ${isActive ? "text-foreground" : ""}`}
              >
                {opt.label}
              </span>

              {/* Description if present */}
              {opt.description && (
                <span
                  className={`text-xs ml-0.5 ${isActive ? "text-muted-foreground" : "text-muted-foreground/60"}`}
                >
                  {opt.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </FieldWrapper>
  );
}
