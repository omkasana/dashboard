"use client";

import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

export default function BooleanField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const enabled = Boolean(value);

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`
        flex items-center justify-between gap-4
        px-3.5 py-3 rounded-xl border transition-all duration-200
        ${fc.base}
        ${
          error
            ? fc.error.border
            : enabled
              ? "border-primary/40 bg-primary/5"
              : fc.idle
        }
      `}
      >
        {/* Left: label + description */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className={`text-sm font-medium leading-tight ${fc.inputText}`}>
            {field.label}
          </span>
          {field.description && (
            <span className={`text-[11px] leading-snug ${fc.counter.normal}`}>
              {field.description as string}
            </span>
          )}
        </div>

        {/* Right: status label + toggle */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span
            className={`text-[11px] font-medium transition-colors duration-200
            ${enabled ? "text-primary" : fc.counter.normal}`}
          >
            {enabled
              ? ((field.onLabel as string | undefined) ?? "On")
              : ((field.offLabel as string | undefined) ?? "Off")}
          </span>

          {/* Toggle track */}
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={field.label}
            onClick={() => onChange?.(field.name, !enabled)}
            className={`
              relative inline-flex h-6 w-11 flex-shrink-0 items-center
              rounded-full border transition-all duration-300 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-primary/40
              ${
                enabled
                  ? "bg-primary border-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
                  : "bg-muted border-border"
              }
            `}
          >
            {/* Thumb */}
            <span
              className={`
              absolute left-0.5 flex items-center justify-center
              h-5 w-5 rounded-full shadow-sm
              transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${
                enabled
                  ? "translate-x-5 bg-primary-foreground"
                  : "translate-x-0 bg-background border border-border"
              }
            `}
            >
              {/* Animated icon inside thumb */}
              {enabled ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-2.5 h-2.5 text-primary"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-2.5 h-2.5 text-muted-foreground/50"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className={`text-[11px] px-1 ${fc.invalid.badge}`}>{error}</p>
      )}
    </div>
  );
}
