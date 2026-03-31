"use client";

import { useState, useRef } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

export default function RangeField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const min = Number(field.min ?? 0);
  const max = Number(field.max ?? 100);
  const step = Number(field.step ?? 1);
  const current =
    value !== undefined && value !== null && value !== "" ? Number(value) : min;

  const pct = ((current - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(field.name, Number(e.target.value));
  };

  // Snap display value to step for tooltip
  const displayValue = current.toLocaleString();

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div
        className={`
        px-4 py-4 rounded-xl border transition-all duration-200
        ${fc.base}
        ${error ? fc.error.border : focused || dragging ? fc.focus : fc.idle}
      `}
      >
        {/* ── Value display row ── */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-mono ${fc.counter.normal}`}>
            {field.prefix ?? ""}
            {min.toLocaleString()}
          </span>

          {/* Current value pill */}
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full
            bg-primary/10 border border-primary/20 text-primary
            text-sm font-semibold font-mono tabular-nums
            transition-all duration-150"
          >
            {field.prefix ?? ""}
            {displayValue}
            {field.suffix ?? ""}
          </span>

          <span className={`text-[11px] font-mono ${fc.counter.normal}`}>
            {field.prefix ?? ""}
            {max.toLocaleString()}
          </span>
        </div>

        {/* ── Track + thumb ── */}
        <div ref={trackRef} className="relative flex items-center h-6">
          {/* Base track */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2
            h-1.5 rounded-full bg-muted overflow-hidden"
          >
            {/* Fill */}
            <div
              className="h-full rounded-full bg-primary transition-all duration-100"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Tick marks if step is large enough */}
          {(max - min) / step <= 20 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-0">
              {Array.from(
                { length: Math.floor((max - min) / step) + 1 },
                (_, i) => {
                  const tickVal = min + i * step;
                  const tickPct = ((tickVal - min) / (max - min)) * 100;
                  const isPast = tickVal <= current;
                  return (
                    <div
                      key={i}
                      style={{ left: `${tickPct}%` }}
                      className={`absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full
                      ${isPast ? "bg-primary-foreground/60" : "bg-muted-foreground/30"}`}
                    />
                  );
                },
              )}
            </div>
          )}

          {/* Native range — invisible but functional */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={current}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setDragging(false);
            }}
            onMouseDown={() => setDragging(true)}
            onMouseUp={() => setDragging(false)}
            onTouchStart={() => setDragging(true)}
            onTouchEnd={() => setDragging(false)}
            onChange={handleChange}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10 h-full"
          />

          {/* Custom thumb */}
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              pointer-events-none z-20
              transition-all duration-100
              ${
                dragging || focused
                  ? "w-5 h-5 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_20%,transparent)]"
                  : "w-4 h-4"
              }
              rounded-full bg-primary border-2 border-primary-foreground
              shadow-md
            `}
            style={{ left: `${pct}%` }}
          />
        </div>

        {/* ── Step labels ── */}
        {field.showLabels && (max - min) / step <= 10 && (
          <div className="relative mt-2 h-4">
            {Array.from(
              { length: Math.floor((max - min) / step) + 1 },
              (_, i) => {
                const tickVal = min + i * step;
                const tickPct = ((tickVal - min) / (max - min)) * 100;
                return (
                  <span
                    key={i}
                    style={{ left: `${tickPct}%` }}
                    className={`absolute -translate-x-1/2 text-[10px] font-mono
                    transition-colors duration-150
                    ${
                      tickVal === current
                        ? "text-primary font-semibold"
                        : fc.counter.normal
                    }`}
                  >
                    {tickVal}
                  </span>
                );
              },
            )}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}
