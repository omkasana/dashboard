"use client";

import { useState } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

function HashIcon() {
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
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
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
      className={`flex items-center justify-center w-full h-full transition-colors duration-150
        focus:outline-none ${fc.stepper.icon}`}
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

export default function NumberField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [focused, setFocused] = useState(false);

  const numValue =
    value === "" || value === undefined || value === null ? "" : String(value);
  const parsed = numValue === "" ? null : parseInt(numValue, 10);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    if (
      e.key === "-" &&
      e.currentTarget.selectionStart === 0 &&
      !e.currentTarget.value.includes("-")
    )
      return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const cleaned = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!cleaned) return;
    const s = e.currentTarget.selectionStart ?? 0;
    const en = e.currentTarget.selectionEnd ?? s; // ← null → fallback to s
    onChange?.(field.name, numValue.slice(0, s) + cleaned + numValue.slice(en));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(
      field.name,
      e.target.value.replace(/[^0-9\-]/g, "").replace(/(?!^)-/g, ""),
    );
  };

  const step = (dir: "up" | "down") => {
    const next = (parsed ?? 0) + (dir === "up" ? 1 : -1);
    onChange?.(field.name, String(next));
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
        className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 ${fc.base} ${borderCls}`}
      >
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <HashIcon />
        </span>

        <input
          type="text"
          inputMode="numeric"
          name={field.name}
          value={numValue}
          placeholder={field.placeholder ?? "0"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm font-mono tracking-wider
            ${fc.inputText} ${fc.inputPlaceholder}`}
        />

        <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />

        <div
          className={`flex flex-col shrink-0 w-8 self-stretch divide-y ${fc.stepper.divider}`}
        >
          <StepBtn dir="up" onClick={() => step("up")} />
          <StepBtn dir="down" onClick={() => step("down")} />
        </div>
      </div>
    </FieldWrapper>
  );
}
