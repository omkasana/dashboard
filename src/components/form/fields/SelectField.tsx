"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import FieldWrapper from "../FieldWrapper";
import { FieldComponentProps } from "@/types/formFieldProps.ts";
import { fieldConfig as fc } from "@/lib/fieldConfig";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5 flex-shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function SelectField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [focused, setFocused] = useState(false);

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
    setHighlight(0);
    setQuery("");
    setOpen(true);
    setTimeout(() => searchRef.current?.focus(), 30);
  };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !dropdownRef.current?.contains(t))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
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

  const select = (val: string) => {
    if (isMulti) {
      onChange?.(
        field.name,
        selected.includes(val)
          ? selected.filter((v) => v !== val)
          : [...selected, val],
      );
    } else {
      onChange?.(field.name, val);
      setOpen(false);
    }
  };

  const clear = () => onChange?.(field.name, isMulti ? [] : "");

  const handleKey = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
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
      if (filtered[highlight]) select(String(filtered[highlight].value));
    }
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const displaySingle = options.find(
    (o) => String(o.value) === selected[0],
  )?.label;
  const borderCls = error
    ? fc.error.border
    : open || focused
      ? fc.focus
      : fc.idle;

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
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => (open ? setOpen(false) : openDropdown())}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`flex items-center justify-between gap-2 min-h-[42px] sm:min-h-[46px]
          px-3 rounded-xl cursor-pointer select-none focus:outline-none
          transition-all duration-200 ${fc.base} ${borderCls}`}
      >
        <div className="flex-1 min-w-0 flex items-center gap-1.5 flex-wrap py-1.5">
          {isMulti ? (
            selected.length === 0 ? (
              <span className={`text-sm ${fc.inputPlaceholder}`}>
                {field.placeholder ?? "Select options…"}
              </span>
            ) : (
              <>
                {selected.slice(0, 4).map((val) => {
                  const label =
                    options.find((o) => String(o.value) === val)?.label ?? val;
                  return (
                    <span
                      key={val}
                      className={`inline-flex items-center gap-1 pl-2 pr-1 py-0.5
                      rounded-md text-xs font-medium max-w-[140px] ${fc.dropdown.tagBg}`}
                    >
                      <span className="truncate">{label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange?.(
                            field.name,
                            selected.filter((v) => v !== val),
                          );
                        }}
                        className={`flex-shrink-0 transition-colors rounded-sm p-0.5 ${fc.dropdown.tagRemove}`}
                      >
                        <XIcon size={10} />
                      </button>
                    </span>
                  );
                })}
                {selected.length > 4 && (
                  <span
                    className={`text-xs flex-shrink-0 ${fc.dropdown.footerText}`}
                  >
                    +{selected.length - 4} more
                  </span>
                )}
              </>
            )
          ) : (
            <span
              className={`text-sm truncate ${displaySingle ? fc.inputText : fc.inputPlaceholder}`}
            >
              {displaySingle ?? field.placeholder ?? "Select an option…"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {selected.length > 0 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clear();
                }}
                className={`flex items-center justify-center w-5 h-5 rounded-md
                  transition-colors ${fc.dropdown.clearBtn}`}
              >
                <XIcon size={12} />
              </button>
              <span className={`w-px h-4 ${fc.divider}`} />
            </>
          )}
          <span className={fc.prefixIdle}>
            <ChevronIcon open={open} />
          </span>
        </div>
      </div>

      {/* Dropdown portal */}
      {open &&
        rect &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: rect.bottom + 6,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
            }}
            className={`rounded-xl overflow-hidden border shadow-xl shadow-black/10
            backdrop-blur-xl ${fc.dropdown.bg} ${fc.dropdown.border}`}
          >
            {isSearch && (
              <div className={`p-2 border-b ${fc.dropdown.border}`}>
                <div
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${fc.dropdown.searchBg}`}
                >
                  <span className={fc.prefixIdle}>
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setHighlight(0);
                    }}
                    onKeyDown={handleKey}
                    placeholder="Search…"
                    className={`flex-1 min-w-0 bg-transparent outline-none text-sm
                    ${fc.inputText} ${fc.inputPlaceholder}`}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className={`flex-shrink-0 ${fc.dropdown.clearBtn}`}
                    >
                      <XIcon size={12} />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="max-h-52 overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <div
                  className={`px-3 py-6 text-center text-sm ${fc.dropdown.emptyText}`}
                >
                  No options found
                </div>
              ) : (
                filtered.map((opt, i) => {
                  const val = String(opt.value);
                  const active = selected.includes(val);
                  const hl = i === highlight;
                  return (
                    <div
                      key={val}
                      onMouseEnter={() => setHighlight(i)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        select(val);
                      }}
                      className={`flex items-center justify-between gap-2 px-3 py-2 text-sm
                      cursor-pointer transition-colors duration-100
                      ${hl ? fc.dropdown.optionHL : fc.dropdown.optionHover}
                      ${active ? fc.dropdown.optionActive : fc.dropdown.optionIdle}`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {active && (
                        <span className={fc.dropdown.check}>
                          <CheckMark />
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {isMulti && selected.length > 0 && (
              <div
                className={`px-3 py-2 flex items-center justify-between ${fc.dropdown.footer}`}
              >
                <span className={`text-xs ${fc.dropdown.footerText}`}>
                  {selected.length} selected
                </span>
                <button
                  type="button"
                  onClick={clear}
                  className={`text-xs transition-colors ${fc.dropdown.clearBtn}`}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>,
          document.body,
        )}
    </FieldWrapper>
  );
}
