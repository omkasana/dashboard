"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import FieldWrapper from "../FieldWrapper";

import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const months = [
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

const years = Array.from({ length: 80 }, (_, i) => 1980 + i);

export default function DateField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isDate = field.type === "date";
  const isTime = field.type === "time";
  const isDateTime = field.type === "datetime";

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number | null>(null);

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(30);
  const [ampm, setAmpm] = useState("PM");

  const selected = value ? new Date(value) : null;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const dates: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= totalDays; i++) dates.push(new Date(year, month, i));

  /* convert custom time */

  const getTime = () => {
    let h = hour;

    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    return { h, m: minute };
  };

  /* select date */

  const selectDate = (d: Date) => {
    if (isDate) {
      onChange?.(field.name, d.toISOString().split("T")[0]);
    }

    if (isDateTime) {
      const { h, m } = getTime();

      d.setHours(h);
      d.setMinutes(m);

      onChange?.(field.name, d.toISOString());
    }

    setOpen(false);
  };

  /* close on outside click */

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* keyboard navigation */

  const handleKey = (e: KeyboardEvent) => {
    if (!open) return;

    if (e.key === "Escape") setOpen(false);

    if (e.key === "ArrowRight") setHighlight((h) => (h ?? 0) + 1);
    if (e.key === "ArrowLeft") setHighlight((h) => (h ?? 0) - 1);
    if (e.key === "ArrowDown") setHighlight((h) => (h ?? 0) + 7);
    if (e.key === "ArrowUp") setHighlight((h) => (h ?? 0) - 7);

    if (e.key === "Enter" && highlight !== null) {
      const d = dates[highlight];
      if (d) selectDate(d);
    }
  };

  return (
    <FieldWrapper
      label={field.label}
      required={field.required}
      info={field.info}
      error={error}
    >
      <div ref={ref} className="relative" onKeyDown={handleKey} tabIndex={0}>
        {/* TIME ONLY */}

        {isTime && (
          <div className="flex items-center gap-2">
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>

            <span>:</span>

            <select
              value={minute}
              onChange={(e) => setMinute(Number(e.target.value))}
              className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                <option key={m}>{m.toString().padStart(2, "0")}</option>
              ))}
            </select>

            <select
              value={ampm}
              onChange={(e) => setAmpm(e.target.value)}
              className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
        )}

        {/* DATE + DATETIME */}

        {!isTime && (
          <>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`${inputClass} flex items-center justify-between`}
              style={glassInput}
            >
              {selected ? (
                selected.toLocaleDateString()
              ) : (
                <span className="text-muted-foreground">Select date</span>
              )}

              <Calendar size={16} />
            </button>

            {open && (
              <div
                className="
absolute mt-2
w-[320px]
rounded-xl
border border-border/40
bg-background/95
backdrop-blur-xl
shadow-xl
p-3
z-999
"
              >
                {/* header */}

                <div className="flex items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="text-xs bg-transparent"
                  >
                    {months.map((m, i) => (
                      <option key={i} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="text-xs bg-transparent"
                  >
                    {years.map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* weekdays */}

                <div className="grid grid-cols-7 text-xs text-muted-foreground mb-2">
                  {days.map((d) => (
                    <div key={d} className="text-center">
                      {d}
                    </div>
                  ))}
                </div>

                {/* dates */}

                <div className="grid grid-cols-7 gap-1">
                  {dates.map((d, i) => {
                    if (!d) return <div key={i} />;

                    const active =
                      selected && d.toDateString() === selected.toDateString();

                    const highlighted = highlight === i;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectDate(d)}
                        className={`
h-8 w-8
text-xs
rounded-md
transition
hover:bg-primary/10
${active ? "bg-primary text-white" : ""}
${highlighted ? "ring-2 ring-primary" : ""}
`}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>

                {/* time selector */}

                {isDateTime && (
                  <div className="flex items-center gap-2 mt-3">
                    <select
                      value={hour}
                      onChange={(e) => setHour(Number(e.target.value))}
                      className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>

                    <span>:</span>

                    <select
                      value={minute}
                      onChange={(e) => setMinute(Number(e.target.value))}
                      className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
                    >
                      {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                        <option key={m}>{m.toString().padStart(2, "0")}</option>
                      ))}
                    </select>

                    <select
                      value={ampm}
                      onChange={(e) => setAmpm(e.target.value)}
                      className="px-2 py-1 rounded-md bg-background/60 border border-border/40 text-xs"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </FieldWrapper>
  );
}
