"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = Array.from({ length: 100 }, (_, i) => 1950 + i);

// ─── Icons ────────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 flex-shrink-0"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 flex-shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Time Picker sub-component ────────────────────────────────────────────────

interface TimePickerProps {
  hour: number;
  minute: number;
  ampm: string;
  setHour: (h: number) => void;
  setMinute: (m: number) => void;
  setAmpm: (a: string) => void;
}

function TimePicker({
  hour,
  minute,
  ampm,
  setHour,
  setMinute,
  setAmpm,
}: TimePickerProps) {
  const segClass = `
    flex items-center justify-center
    w-8 h-8 rounded-lg text-sm font-mono font-medium
    border border-border bg-muted/60
    text-foreground select-none cursor-pointer
    transition-colors hover:bg-muted active:scale-95
  `;

  const bump =
    (val: number, max: number, min: number, set: (n: number) => void) =>
    (delta: number) =>
      set(((val - min + delta + (max - min + 1)) % (max - min + 1)) + min);

  return (
    <div
      className="flex items-center justify-center gap-2 pt-3 mt-3
      border-t border-border"
    >
      <span className={`${fc.prefixIdle}`}>
        <ClockIcon />
      </span>

      {/* Hour */}
      <div className="flex flex-col items-center gap-0.5">
        <button
          type="button"
          onClick={() => bump(hour, 12, 1, setHour)(1)}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
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
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <span className={segClass}>{String(hour).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={() => bump(hour, 12, 1, setHour)(-1)}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <span className="text-lg font-mono text-muted-foreground mb-0.5 select-none">
        :
      </span>

      {/* Minute */}
      <div className="flex flex-col items-center gap-0.5">
        <button
          type="button"
          onClick={() => bump(minute, 59, 0, setMinute)(1)}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
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
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <span className={segClass}>{String(minute).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={() => bump(minute, 59, 0, setMinute)(-1)}
          className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* AM / PM toggle */}
      <div className="flex flex-col gap-0.5 ml-1">
        {["AM", "PM"].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAmpm(a)}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold
              transition-all duration-150 border
              ${
                ampm === a
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted border-border text-muted-foreground hover:text-foreground"
              }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DateField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDate = field.type === "date";
  const isTime = field.type === "time";
  const isDateTime = field.type === "datetime";

  const today = new Date();
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");

  const selected = value ? new Date(value as string) : null;

  // Sync calendar view to selected value
  useEffect(() => {
    if (selected) {
      setMonth(selected.getMonth());
      setYear(selected.getFullYear());
    }
  }, [value]);

  // Build calendar grid
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const dates: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: totalDays },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  // 24h time from 12h picker
  const getTime = () => {
    let h = hour;
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return { h, m: minute };
  };

  const selectDate = (d: Date) => {
    const copy = new Date(d);
    if (isDate) {
      onChange?.(field.name, copy.toISOString().split("T")[0]);
      setOpen(false);
    } else if (isDateTime) {
      const { h, m } = getTime();
      copy.setHours(h, m, 0, 0);
      onChange?.(field.name, copy.toISOString());
      // Don't close — let user adjust time too
    }
  };

  const confirmDateTime = () => {
    if (selected) {
      const { h, m } = getTime();
      const copy = new Date(selected);
      copy.setHours(h, m, 0, 0);
      onChange?.(field.name, copy.toISOString());
    }
    setOpen(false);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(field.name, "");
  };

  // Open / position
  const openDropdown = () => {
    if (!triggerRef.current) return;
    setRect(triggerRef.current.getBoundingClientRect());
    setOpen(true);
  };

  // Reposition on scroll / resize
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

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard nav
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setHighlight((h) => Math.min((h ?? -1) + 1, dates.length - 1));
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setHighlight((h) => Math.max((h ?? 1) - 1, 0));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min((h ?? -7) + 7, dates.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max((h ?? 7) - 7, 0));
    }
    if (e.key === "Enter" && highlight !== null) {
      const d = dates[highlight];
      if (d) selectDate(d);
    }
  };

  // Display text
  const displayValue = (() => {
    if (!selected) return null;
    if (isDate)
      return selected.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    if (isDateTime)
      return selected.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    return null;
  })();

  const borderCls = error
    ? fc.error.border
    : open || focused
      ? fc.focus
      : fc.idle;

  // ── Time-only field ──────────────────────────────────────────────────────────
  if (isTime) {
    const commitTime = () => {
      const { h, m } = getTime();
      onChange?.(
        field.name,
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      );
    };
    return (
      <FieldWrapper
        label={field.label}
        required={field.required}
        info={field.info}
        error={error}
      >
        <div
          className={`flex items-center rounded-xl overflow-hidden
          transition-all duration-200 ${fc.base} ${borderCls}`}
        >
          <span className={`pl-3 pr-2 shrink-0 ${fc.prefixIdle}`}>
            <ClockIcon />
          </span>
          <div className="flex-1 flex items-center gap-1.5 py-2 px-1">
            <TimePicker
              hour={hour}
              minute={minute}
              ampm={ampm}
              setHour={(h) => {
                setHour(h);
                commitTime();
              }}
              setMinute={(m) => {
                setMinute(m);
                commitTime();
              }}
              setAmpm={(a) => {
                setAmpm(a as "AM" | "PM");
                commitTime();
              }}
            />
          </div>
        </div>
      </FieldWrapper>
    );
  }

  // ── Date / DateTime field ────────────────────────────────────────────────────
  return (
    <FieldWrapper
      label={field.label}
      required={field.required}
      info={field.info}
      error={error}
    >
      <div
        ref={triggerRef}
        tabIndex={0}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {/* Trigger button */}
        <div
          onClick={() => (open ? setOpen(false) : openDropdown())}
          className={`
            flex items-center gap-2 px-3 py-2.5 sm:py-3
            rounded-xl cursor-pointer select-none
            transition-all duration-200
            ${fc.base} ${borderCls}
          `}
        >
          <span
            className={`shrink-0 transition-colors ${open ? fc.prefixFocused : fc.prefixIdle}`}
          >
            <CalendarIcon />
          </span>

          <span
            className={`flex-1 text-sm ${displayValue ? fc.inputText : fc.inputPlaceholder}`}
          >
            {displayValue ??
              field.placeholder ??
              (isDateTime ? "Select date & time" : "Select date")}
          </span>

          {selected && (
            <button
              type="button"
              onClick={clear}
              className={`shrink-0 transition-colors ${fc.prefixIdle} hover:text-foreground`}
            >
              <XIcon />
            </button>
          )}
        </div>

        {/* Portal dropdown */}
        {open &&
          rect &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: rect.bottom + 6,
                left: rect.left,
                width: Math.max(rect.width, 300),
                zIndex: 9999,
              }}
              className={`
              rounded-xl border shadow-xl shadow-black/10
              backdrop-blur-xl p-3
              bg-popover border-border
            `}
            >
              {/* ── Month / Year header ── */}
              <div className="flex items-center gap-1.5 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    if (month === 0) {
                      setMonth(11);
                      setYear((y) => y - 1);
                    } else setMonth((m) => m - 1);
                  }}
                  className={`flex items-center justify-center w-7 h-7 rounded-lg
                  border border-border transition-colors
                  ${fc.prefixIdle} hover:text-foreground hover:bg-muted`}
                >
                  <ChevronLeft />
                </button>

                {/* Month select */}
                <div className="relative flex-1">
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full appearance-none bg-muted/60 border border-border
                    rounded-lg px-2 py-1 text-xs font-medium text-foreground
                    focus:outline-none cursor-pointer"
                  >
                    {MONTHS.map((m, i) => (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year select */}
                <div className="relative w-20">
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full appearance-none bg-muted/60 border border-border
                    rounded-lg px-2 py-1 text-xs font-medium text-foreground
                    focus:outline-none cursor-pointer"
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (month === 11) {
                      setMonth(0);
                      setYear((y) => y + 1);
                    } else setMonth((m) => m + 1);
                  }}
                  className={`flex items-center justify-center w-7 h-7 rounded-lg
                  border border-border transition-colors
                  ${fc.prefixIdle} hover:text-foreground hover:bg-muted`}
                >
                  <ChevronRight />
                </button>
              </div>

              {/* ── Weekday labels ── */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-medium
                  text-muted-foreground py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* ── Date grid ── */}
              <div className="grid grid-cols-7 gap-0.5">
                {dates.map((d, i) => {
                  if (!d) return <div key={i} />;

                  const isToday = d.toDateString() === today.toDateString();
                  const isSelected =
                    selected && d.toDateString() === selected.toDateString();
                  const isHL = highlight === i;

                  return (
                    <button
                      key={i}
                      type="button"
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => selectDate(d)}
                      className={`
                      relative h-8 w-full flex items-center justify-center
                      text-xs rounded-lg transition-all duration-100
                      ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold"
                          : isHL
                            ? "bg-muted text-foreground"
                            : "hover:bg-muted text-foreground"
                      }
                    `}
                    >
                      {d.getDate()}
                      {/* Today dot */}
                      {isToday && !isSelected && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2
                        w-1 h-1 rounded-full bg-primary"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ── Time picker (datetime) ── */}
              {isDateTime && (
                <TimePicker
                  hour={hour}
                  minute={minute}
                  ampm={ampm}
                  setHour={setHour}
                  setMinute={setMinute}
                  setAmpm={(a) => setAmpm(a as "AM" | "PM")}
                />
              )}

              {/* ── Footer ── */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    const t = new Date();
                    setMonth(t.getMonth());
                    setYear(t.getFullYear());
                    selectDate(t);
                  }}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Today
                </button>

                {isDateTime ? (
                  <button
                    type="button"
                    onClick={confirmDateTime}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium
                    bg-primary text-primary-foreground
                    hover:opacity-90 transition-opacity"
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className={`text-xs ${fc.dropdown.clearBtn}`}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>,
            document.body,
          )}
      </div>
    </FieldWrapper>
  );
}
