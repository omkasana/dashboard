"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let { r, g, b } = hexToRgb(hex);
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function isLight(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ─── Preset swatches ──────────────────────────────────────────────────────────

const PRESETS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#000000",
  "#374151",
  "#6b7280",
  "#d1d5db",
  "#f3f4f6",
  "#ffffff",
  "#ff781f",
  "#0f172a",
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ColorField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const DEFAULT = "#ff781f";
  const currentHex = isValidHex(value as string) ? (value as string) : DEFAULT;

  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [focused, setFocused] = useState(false);
  const [hexInput, setHexInput] = useState(currentHex);

  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const nativeRef = useRef<HTMLInputElement>(null);

  // Keep hex input in sync when value changes externally
  useEffect(() => {
    if (isValidHex(value as string)) setHexInput(value as string);
  }, [value]);

  const commit = (hex: string) => {
    if (!isValidHex(hex)) return;
    onChange?.(field.name, hex);
    setHexInput(hex);
  };

  // Open / close
  const openPicker = () => {
    if (!triggerRef.current) return;
    setRect(triggerRef.current.getBoundingClientRect());
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (triggerRef.current)
        setRect(triggerRef.current.getBoundingClientRect());
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const hsl = hexToHsl(currentHex);

  const borderCls = error
    ? fc.error.border
    : open || focused
      ? fc.focus
      : fc.idle;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      {/* ── Trigger ── */}
      <div
        ref={triggerRef}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => (open ? setOpen(false) : openPicker())}
        className={`
          flex items-center gap-3 px-3 py-2.5 sm:py-3
          rounded-xl cursor-pointer select-none
          transition-all duration-200
          ${fc.base} ${borderCls}
        `}
      >
        {/* Swatch */}
        <span
          className="w-7 h-7 rounded-lg shrink-0 border border-black/10 shadow-sm
            transition-all duration-200"
          style={{ background: currentHex }}
        />

        {/* Hex + HSL values */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-mono font-medium uppercase ${fc.inputText}`}
          >
            {currentHex}
          </p>
          <p className={`text-[10px] font-mono ${fc.counter.normal}`}>
            {`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
          </p>
        </div>

        {/* Native color input — hidden, used for system picker fallback */}
        <input
          ref={nativeRef}
          type="color"
          value={currentHex}
          onChange={(e) => commit(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />

        {/* Gradient chevron */}
        <span
          className={`shrink-0 transition-colors ${open ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {/* ── Portal dropdown ── */}
      {open &&
        rect &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: rect.bottom + 6,
              left: rect.left,
              width: Math.max(rect.width, 280),
              zIndex: 9999,
            }}
            className="rounded-xl border shadow-xl shadow-black/10 backdrop-blur-xl p-3
            bg-popover border-border space-y-3"
          >
            {/* ── Large preview ── */}
            <div
              className="w-full h-16 rounded-xl border border-black/10 shadow-inner
              flex items-center justify-center transition-colors duration-150"
              style={{ background: currentHex }}
            >
              <span
                className="text-sm font-mono font-semibold uppercase tracking-wider
                px-3 py-1 rounded-lg bg-black/10 backdrop-blur-sm"
                style={{
                  color: isLight(currentHex) ? "#000000aa" : "#ffffffaa",
                }}
              >
                {currentHex}
              </span>
            </div>

            {/* ── Native browser picker ── */}
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border
            transition-colors ${fc.base} ${fc.idle} hover:${fc.focus} cursor-pointer`}
              onClick={() => nativeRef.current?.click()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 ${fc.prefixIdle}`}
              >
                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746
                1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125
                a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554
                C21.965 6.012 17.461 2 12 2z"
                />
              </svg>
              <span className={`text-sm ${fc.inputText}`}>
                Open color picker
              </span>
            </div>

            {/* ── Hex input ── */}
            <div
              className={`flex items-center gap-2 px-3 rounded-xl border
            transition-all duration-200 ${fc.base}
            ${isValidHex(hexInput) ? fc.idle : fc.error.border}`}
            >
              <span
                className={`shrink-0 text-sm font-mono font-bold ${fc.prefixIdle}`}
              >
                #
              </span>
              <input
                value={hexInput.replace("#", "")}
                onChange={(e) => {
                  const raw = `#${e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6)}`;
                  setHexInput(raw);
                  if (isValidHex(raw)) commit(raw);
                }}
                placeholder="ff781f"
                maxLength={6}
                className={`flex-1 min-w-0 bg-transparent outline-none py-2.5
                text-sm font-mono uppercase tracking-widest
                ${fc.inputText} ${fc.inputPlaceholder}`}
              />
              {isValidHex(hexInput) && (
                <span
                  className="w-5 h-5 rounded-md shrink-0 border border-black/10"
                  style={{ background: hexInput }}
                />
              )}
            </div>

            {/* ── RGB readout ── */}
            <div className="grid grid-cols-3 gap-1.5">
              {(["r", "g", "b"] as const).map((ch) => {
                const val = hexToRgb(currentHex)[ch];
                return (
                  <div
                    key={ch}
                    className={`flex flex-col items-center py-1.5 rounded-lg
                  border ${fc.base} ${fc.idle}`}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase ${fc.counter.normal}`}
                    >
                      {ch}
                    </span>
                    <span
                      className={`text-sm font-mono font-medium ${fc.inputText}`}
                    >
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── Presets ── */}
            <div>
              <p
                className={`text-[10px] font-medium mb-1.5 ${fc.counter.normal}`}
              >
                Presets
              </p>
              <div className="grid grid-cols-8 gap-1.5">
                {PRESETS.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    title={hex}
                    onClick={() => commit(hex)}
                    className={`w-full aspect-square rounded-lg border transition-all duration-100
                    hover:scale-110 active:scale-95
                    ${
                      currentHex.toLowerCase() === hex.toLowerCase()
                        ? "ring-2 ring-offset-1 ring-primary ring-offset-popover scale-110"
                        : "border-black/10"
                    }`}
                    style={{ background: hex }}
                  />
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </FieldWrapper>
  );
}
