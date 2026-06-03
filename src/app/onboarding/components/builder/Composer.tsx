"use client";

import type React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  Send,
} from "lucide-react";
import type { Message, Question } from "../../onboarding-data";

type CurrentQuestion = Question & {
  sectionId: string;
  sectionLabel: string;
};

interface ComposerProps {
  isDark: boolean;
  currentQ: CurrentQuestion | undefined;
  selectedChips: string[];
  inputValue: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  currentQuestionFlat: number;
  toggleChip: (value: string) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  submitAnswer: (value: string) => void;
  setCurrentQuestionFlat: React.Dispatch<React.SetStateAction<number>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function Composer({
  isDark,
  currentQ,
  selectedChips,
  inputValue,
  inputRef,
  currentQuestionFlat,
  toggleChip,
  setInputValue,
  handleKeyDown,
  submitAnswer,
  setCurrentQuestionFlat,
  setMessages,
}: ComposerProps) {
  return (
    <div
      className="flex-shrink-0 border-t p-4"
      style={{
        background: isDark ? "rgba(10,10,14,0.38)" : "rgba(255,255,255,0.22)",
        borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {currentQ?.chips && currentQ.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {currentQ.chips.map((chip) => {
              const isSelected = selectedChips.includes(chip.value);

              return (
                <button
                  key={chip.value}
                  onClick={() => toggleChip(chip.value)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all font-medium"
                  style={
                    isSelected
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(255,120,50,0.14), rgba(180,80,255,0.14))",
                          borderColor: "rgba(180,80,255,0.32)",
                          color: isDark ? "rgba(218,180,255,0.95)" : "#7c3aed",
                          boxShadow: "0 8px 18px rgba(180,80,255,0.08)",
                        }
                      : {
                          background: isDark
                            ? "rgba(255,255,255,0.035)"
                            : "rgba(255,255,255,0.62)",
                          borderColor: isDark
                            ? "rgba(255,255,255,0.07)"
                            : "rgba(0,0,0,0.06)",
                          color: isDark ? "rgba(255,255,255,0.48)" : "#6b7280",
                        }
                  }
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        )}

        {currentQ?.multi && (
          <p className={`text-xs ${isDark ? "text-white/25" : "text-gray-400"}`}>
            Select all that apply, then click Continue.
          </p>
        )}

        <div
          className="rounded-[30px] border p-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.035))"
              : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.74))",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentQ?.placeholder || "Type your answer…"}
              rows={1}
              className="flex-1 text-sm bg-transparent outline-none border-none resize-none leading-relaxed min-h-[30px] max-h-28 px-3 py-2"
              style={{
                color: isDark ? "rgba(255,255,255,0.84)" : "#17181c",
                overflowY: "auto",
              }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = `${Math.min(t.scrollHeight, 112)}px`;
              }}
            />

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {currentQ?.multi && selectedChips.length > 0 ? (
                <button
                  onClick={() => submitAnswer(selectedChips.join(", "))}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all text-white"
                  style={{
                    background: "linear-gradient(135deg, #ff7832, #c050ff)",
                    boxShadow: "0 8px 22px rgba(180,80,255,0.26)",
                  }}
                >
                  Continue <ChevronRight size={13} />
                </button>
              ) : (
                <button
                  onClick={() => submitAnswer(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-30 text-white"
                  style={{
                    background: "linear-gradient(135deg, #ff7832, #c050ff)",
                    boxShadow: "0 8px 22px rgba(180,80,255,0.26)",
                  }}
                  aria-label="Send"
                >
                  <Send size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center justify-between text-xs ${isDark ? "text-white/20" : "text-gray-400"}`}
        >
          <span className="flex items-center gap-1">
            <CornerDownLeft size={10} />
            Enter to submit · Shift+Enter for new line
          </span>
          {currentQuestionFlat > 0 && (
            <button
              onClick={() => {
                const p = currentQuestionFlat - 1;
                setCurrentQuestionFlat(p);
                setMessages((prev) => {
                  const li = [...prev]
                    .reverse()
                    .findIndex((m) => m.role === "user");
                  return li === -1 ? prev : prev.slice(0, prev.length - li - 1);
                });
              }}
              className={`flex items-center gap-1 transition-colors ${isDark ? "hover:text-white/50" : "hover:text-gray-600"}`}
            >
              <ChevronLeft size={11} /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
