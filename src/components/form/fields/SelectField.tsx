"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";

import FieldWrapper from "../FieldWrapper";
import { inputClass } from "@/lib/inputStyle";
import { glassInput } from "@/lib/formStyle";
import { FieldComponentProps } from "@/types/formFieldProps.ts";

export default function SelectField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const isMulti = field.type === "multiselect";
  const isSearch = field.type === "search-select";

  const options = field.options || [];

  const selected: string[] = isMulti
    ? (value || []).map(String)
    : value
      ? [String(value)]
      : [];

  const filtered = isSearch
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const openDropdown = () => {
    if (!triggerRef.current) return;

    setRect(triggerRef.current.getBoundingClientRect());
    setOpen(true);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        !triggerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (val: string) => {
    if (isMulti) {
      const exists = selected.includes(val);

      const updated = exists
        ? selected.filter((v) => v !== val)
        : [...selected, val];

      onChange?.(field.name, updated);
    } else {
      onChange?.(field.name, val);
      setOpen(false);
    }
  };

  const remove = (val: string) => {
    const updated = selected.filter((v) => v !== val);
    onChange?.(field.name, updated);
  };

  const clear = () => {
    onChange?.(field.name, isMulti ? [] : "");
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const val = String(filtered[highlight].value);
      select(val);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const displaySingle =
    options.find((o) => String(o.value) === selected[0])?.label || "Select";

  return (
    <FieldWrapper
      info={field.info}
      label={field.label}
      required={field.required}
      error={error}
    >
      {/* Trigger */}

      <div
        ref={triggerRef}
        tabIndex={0}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleKey}
        className={`
          ${inputClass}
          min-h-10.5
          flex items-center justify-between
          cursor-pointer
          ${error ? "border-red-500" : ""}
        `}
        style={glassInput}
      >
        {isMulti ? (
          <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
            {selected.length === 0 && (
              <span className="text-muted-foreground">Select</span>
            )}

            <div className="flex gap-1 overflow-hidden flex-nowrap">
              {selected.slice(0, 4).map((val) => {
                const label =
                  options.find((o) => String(o.value) === val)?.label || val;

                return (
                  <span
                    key={val}
                    className="
                    flex items-center gap-1
                    bg-primary/15 text-primary
                    px-2 py-0.5]
                    rounded-md
                    text-xs
                    shrink-0
                    max-w-35
                    truncate
                    "
                  >
                    {label}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(val);
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                );
              })}
            </div>

            {selected.length > 4 && (
              <span className="text-xs text-muted-foreground shrink-0">
                +{selected.length - 4}
              </span>
            )}
          </div>
        ) : (
          <span>{displaySingle}</span>
        )}

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
            >
              <X size={14} className="opacity-60 hover:opacity-100" />
            </button>
          )}

          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Dropdown */}

      {open &&
        rect &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: rect.bottom + window.scrollY + 6,
              left: rect.left + window.scrollX,
              width: rect.width,
            }}
            className="
            z-9999
            rounded-xl
            border border-border/40
            bg-background/95
            backdrop-blur-xl
            shadow-xl
            max-h-60
            overflow-auto
          "
          >
            {isSearch && (
              <div className="p-2">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className={inputClass}
                  style={glassInput}
                />
              </div>
            )}

            {filtered.map((opt, i) => {
              const val = String(opt.value);
              const active = selected.includes(val);

              return (
                <div
                  key={val}
                  onMouseDown={() => select(val)}
                  className={`
                  px-3 py-2
                  text-sm
                  cursor-pointer
                  transition
                  ${i === highlight ? "bg-muted" : ""}
                  ${active ? "text-primary font-medium" : ""}
                `}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </FieldWrapper>
  );
}
