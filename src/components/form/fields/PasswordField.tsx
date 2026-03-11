"use client";

import { useState, useEffect, useCallback } from "react";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

type StrengthLevel = 0 | 1 | 2 | 3 | 4;
interface StrengthResult {
  level: StrengthLevel;
  label: string;
  bar: string;
  text: string;
}

function getStrength(pwd: string): StrengthResult {
  if (!pwd) return { level: 0, label: "", bar: "", text: "" };
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s <= 1) return { level: 1, label: "Weak", ...fc.strength.weak };
  if (s === 2) return { level: 2, label: "Fair", ...fc.strength.fair };
  if (s === 3) return { level: 3, label: "Good", ...fc.strength.good };
  return { level: 4, label: "Strong", ...fc.strength.strong };
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[18px] h-[18px]"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 5c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function LockIcon() {
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function PasswordField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [show, setShow] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [focused, setFocused] = useState(false);

  const password = (value as string) ?? "";
  const strength = getStrength(password);
  const hasValue = password.length > 0;

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [onKey]);

  const rules = [
    { label: "8+ chars", met: password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Symbol", met: /[^A-Za-z0-9]/.test(password) },
  ];

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
        {/* Lock prefix */}
        <span
          className={`pl-3 pr-1 shrink-0 transition-colors duration-200
          ${focused ? fc.prefixFocused : fc.prefixIdle}`}
        >
          <LockIcon />
        </span>

        {/* Input */}
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => onChange?.(field.name, e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={field.placeholder ?? "Enter password"}
          autoComplete="current-password"
          className={`flex-1 min-w-0 bg-transparent outline-none
            px-2 py-2.5 sm:py-3 text-sm font-mono tracking-wider
            ${fc.inputText} ${fc.inputPlaceholder}`}
        />

        <span className={`w-px h-5 shrink-0 mx-0.5 ${fc.divider}`} />

        {/* Toggle */}
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className={`shrink-0 flex items-center justify-center w-10 sm:w-11 self-stretch
            transition-colors duration-150 focus:outline-none
            ${show ? fc.prefixFocused : fc.prefixIdle}`}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {/* Meta */}
      {(focused || hasValue) && (
        <div className="mt-2 space-y-2">
          {/* CapsLock */}
          {focused && capsOn && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
              text-[10px] font-semibold tracking-widest uppercase select-none
              ${fc.capsLock.bg} ${fc.capsLock.border} ${fc.capsLock.text}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polyline points="17 11 12 6 7 11" />
                <line x1="12" y1="6" x2="12" y2="18" />
              </svg>
              Caps Lock On
            </span>
          )}

          {/* Strength */}
          {hasValue && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                {([1, 2, 3, 4] as StrengthLevel[]).map((seg) => (
                  <div
                    key={seg}
                    className={`relative flex-1 h-[3px] rounded-full overflow-hidden ${fc.strengthTrack}`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500
                      ${strength.level >= seg ? strength.bar : "opacity-0"}`}
                    />
                  </div>
                ))}
                <span
                  className={`text-[11px] font-semibold ml-1 w-12 shrink-0 ${strength.text}`}
                >
                  {strength.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {rules.map(({ label, met }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 text-[10px] font-medium
                    transition-colors duration-200 ${met ? fc.ruleActive : fc.ruleInactive}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${met ? fc.ruleDot : fc.ruleDotOff}`}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </FieldWrapper>
  );
}
