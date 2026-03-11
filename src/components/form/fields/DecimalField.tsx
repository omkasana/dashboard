"use client";

import { useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

function DecimalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <line x1="4" y1="9" x2="14" y2="9" />
      <line x1="4" y1="15" x2="14" y2="15" />
      <line x1="9" y1="3" x2="7" y2="21" />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function StepBtn({
  dir,
  onClick,
}: {
  dir: "up" | "down";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "up" ? "Increment" : "Decrement"}
      className={`flex items-center justify-center w-full h-full
        transition-colors duration-150 focus:outline-none ${fc.stepper.icon}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        {dir === "up" ? (
          <polyline points="18 15 12 9 6 15" />
        ) : (
          <polyline points="6 9 12 15 18 9" />
        )}
      </svg>
    </button>
  );
}

export default function DecimalField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);

  const strValue =
    value === "" || value === undefined || value === null ? "" : String(value);

  const parsed = strValue === "" ? null : parseFloat(strValue);
  const step = Number(field.step ?? 0.1);

  // ── Enforce decimal-only input: digits, one dot, leading minus ──
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Always pass through: ctrl/cmd shortcuts, nav keys
    if (e.ctrlKey || e.metaKey) return;
    const nav = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    if (nav.includes(e.key)) return;

    // Allow one decimal point
    if (e.key === "." && !e.currentTarget.value.includes(".")) return;

    // Allow leading minus once
    if (
      e.key === "-" &&
      e.currentTarget.selectionStart === 0 &&
      !e.currentTarget.value.includes("-")
    )
      return;

    // Block everything else that isn't a digit
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const raw = e.clipboardData.getData("text");
    // Keep only valid decimal characters
    const cleaned = raw
      .replace(/[^0-9.\-]/g, "")
      .replace(/(?!^)-/g, "") // minus only at start
      .replace(/^(\-?\d*\.?\d*).*$/, "$1"); // one dot only
    if (!cleaned) return;
    const s = e.currentTarget.selectionStart ?? 0;
    const en = e.currentTarget.selectionEnd ?? s;
    const next = strValue.slice(0, s) + cleaned + strValue.slice(en);
    // Validate the final string
    if (/^-?\d*\.?\d*$/.test(next)) onChange?.(field.name, next);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (/^-?\d*\.?\d*$/.test(v)) onChange?.(field.name, v);
  };

  const stepValue = (dir: "up" | "down") => {
    const base = parsed ?? 0;
    const next = dir === "up" ? base + step : base - step;
    const decimals = (step.toString().split(".")[1] ?? "").length;
    onChange?.(field.name, next.toFixed(decimals));
  };

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div
        className={`
        flex items-center rounded-xl overflow-hidden
        border transition-all duration-200
        ${fc.base} ${borderCls}
      `}
      >
        {/* Prefix icon */}
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <DecimalIcon />
        </span>

        {/* Input */}
        <input
          type="text"
          inputMode="decimal"
          name={field.name}
          value={strValue}
          placeholder={field.placeholder ?? "0.00"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className={`
            flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm font-mono tracking-wider
            ${fc.inputText} ${fc.inputPlaceholder}
          `}
        />

        {/* Step hint */}
        {focused && (
          <span
            className={`pr-1 pl-1 shrink-0 text-[10px] font-mono
            whitespace-nowrap ${fc.counter.normal}`}
          >
            ±{step}
          </span>
        )}

        <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />

        {/* Stepper */}
        <div
          className={`flex flex-col shrink-0 w-8 self-stretch
          divide-y ${fc.stepper.divider}`}
        >
          <StepBtn dir="up" onClick={() => stepValue("up")} />
          <StepBtn dir="down" onClick={() => stepValue("down")} />
        </div>
      </div>
    </FieldWrapper>
  );
}
