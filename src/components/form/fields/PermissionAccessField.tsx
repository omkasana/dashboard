"use client";

import { KeyboardEvent, useMemo, useRef, useState } from "react";
import FieldWrapper from "../FieldWrapper";
import type { FieldComponentProps } from "@/types/formFieldProps.ts";
import type { FieldOption } from "@/types/module";
import { fieldConfig as fc } from "@/lib/fieldConfig";

type PermissionValue = Record<string, string[]>;

const emptyOptions: FieldOption[] = [];

function normalizeValue(value: unknown): PermissionValue {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value as Record<string, unknown>).reduce<PermissionValue>(
    (acc, [moduleId, permissions]) => {
      acc[moduleId] = Array.isArray(permissions)
        ? permissions.map(String)
        : [];
      return acc;
    },
    {},
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function PermissionAccessField({
  field,
  error,
  value,
  onChange,
}: FieldComponentProps) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const moduleOptions = field.options ?? emptyOptions;
  const actionOptions = field.actionOptions ?? emptyOptions;
  const access = useMemo(() => normalizeValue(value), [value]);
  const selectedModules = useMemo(() => Object.keys(access), [access]);

  const moduleLabelByValue = useMemo(
    () =>
      new Map(
        moduleOptions.map((option) => [
          String(option.value),
          option.label,
        ] as const),
      ),
    [moduleOptions],
  );

  const filteredModules = useMemo(() => {
    const query = input.trim().toLowerCase();

    return moduleOptions.filter((option) => {
      const optionValue = String(option.value);
      const optionLabel = option.label.toLowerCase();

      if (selectedModules.includes(optionValue)) return false;
      if (!query) return true;

      return (
        optionLabel.includes(query) ||
        optionValue.toLowerCase().includes(query)
      );
    });
  }, [input, moduleOptions, selectedModules]);

  const commit = (next: PermissionValue) => {
    onChange?.(field.name, next);
  };

  const addModule = (raw = input) => {
    const query = raw.trim();
    if (!query) return;

    const match = moduleOptions.find(
      (option) =>
        String(option.value) === query ||
        option.label.toLowerCase() === query.toLowerCase(),
    );
    const moduleId = String(match?.value ?? query);

    if (access[moduleId]) {
      setInput("");
      return;
    }

    commit({ ...access, [moduleId]: [] });
    setInput("");
  };

  const removeModule = (moduleId: string) => {
    const next = { ...access };
    delete next[moduleId];
    commit(next);
  };

  const toggleAction = (moduleId: string, action: string) => {
    const current = access[moduleId] ?? [];
    const nextActions = current.includes(action)
      ? current.filter((item) => item !== action)
      : [...current, action];

    commit({ ...access, [moduleId]: nextActions });
  };

  const setAllActions = (moduleId: string) => {
    commit({
      ...access,
      [moduleId]: actionOptions.map((option) => String(option.value)),
    });
  };

  const clearActions = (moduleId: string) => {
    commit({ ...access, [moduleId]: [] });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addModule();
    }

    if (e.key === "Backspace" && input === "" && selectedModules.length > 0) {
      removeModule(selectedModules[selectedModules.length - 1]);
    }
  };

  const borderCls = error ? fc.error.border : focused ? fc.focus : fc.idle;
  const showSuggestions = focused && filteredModules.length > 0;

  return (
    <FieldWrapper
      label={field.label}
      info={field.info}
      required={field.required}
      error={error}
    >
      <div className="space-y-3">
        <div className="relative">
          <div
            onClick={() => inputRef.current?.focus()}
            className={`flex min-h-10.5 cursor-text flex-wrap items-center gap-1.5 rounded-xl px-2.5 py-2 transition-all duration-200 sm:min-h-11.5 ${fc.base} ${borderCls}`}
          >
            {selectedModules.map((moduleId) => (
              <span
                key={moduleId}
                className="inline-flex max-w-44 shrink-0 items-center gap-1 rounded-md border border-primary/20 bg-primary/10 py-0.5 pl-2 pr-1 text-xs font-medium text-primary"
              >
                <span className="truncate">
                  {moduleLabelByValue.get(moduleId) ?? moduleId}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeModule(moduleId);
                  }}
                  className="shrink-0 rounded-sm p-0.5 opacity-50 transition-opacity hover:opacity-100"
                >
                  <XIcon />
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                addModule();
              }}
              placeholder={
                selectedModules.length === 0
                  ? (field.placeholder ?? "Add module access...")
                  : ""
              }
              className={`min-w-28 flex-1 bg-transparent py-0.5 text-sm outline-none ${fc.inputText} ${fc.inputPlaceholder}`}
            />
          </div>

          {showSuggestions && (
            <div
              className={`absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-xl border shadow-xl shadow-black/10 ${fc.dropdown.bg} ${fc.dropdown.border}`}
            >
              {filteredModules.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addModule(String(option.value));
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm transition-colors ${fc.dropdown.optionHover} ${fc.dropdown.optionIdle}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedModules.length > 0 && (
          <div className="space-y-2">
            {selectedModules.map((moduleId) => {
              const selectedActions = access[moduleId] ?? [];

              return (
                <div
                  key={moduleId}
                  className={`rounded-xl border p-3 ${fc.dropdown.border}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-sm font-medium">
                      {moduleLabelByValue.get(moduleId) ?? moduleId}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAllActions(moduleId)}
                        className={`text-xs transition-colors ${fc.dropdown.clearBtn}`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => clearActions(moduleId)}
                        className={`text-xs transition-colors ${fc.dropdown.clearBtn}`}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {actionOptions.map((action) => {
                      const actionValue = String(action.value);
                      const checked = selectedActions.includes(actionValue);

                      return (
                        <label
                          key={actionValue}
                          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
                            checked
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : `${fc.dropdown.border} ${fc.dropdown.optionIdle} hover:bg-muted`
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAction(moduleId, actionValue)}
                            className="h-3.5 w-3.5 accent-primary"
                          />
                          {action.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}
