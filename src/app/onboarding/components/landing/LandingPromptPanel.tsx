"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";

interface LandingPromptPanelProps {
  isDark: boolean;
  landingInput: string;
  landingInputRef: React.RefObject<HTMLTextAreaElement | null>;
  setLandingInput: React.Dispatch<React.SetStateAction<string>>;
  startBuilder: (initialText: string) => void;
}

export function LandingPromptPanel({
  isDark,
  landingInput,
  landingInputRef,
  setLandingInput,
  startBuilder,
}: LandingPromptPanelProps) {
  return (
    <div
      className="w-full max-w-4xl mt-10 rounded-[32px] overflow-hidden border backdrop-blur-2xl"
      style={{
        background: isDark ? "rgba(18,18,22,.82)" : "rgba(255,255,255,.82)",
        borderColor: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)",
        boxShadow: isDark
          ? `
            0 20px 80px rgba(0,0,0,.45),
            0 0 120px rgba(168,85,247,.12),
            inset 0 1px 0 rgba(255,255,255,.06)
          `
          : `
            0 20px 80px rgba(0,0,0,.08),
            0 0 100px rgba(168,85,247,.08),
            inset 0 1px 0 rgba(255,255,255,.8)
          `,
      }}
    >
      <textarea
        ref={landingInputRef}
        value={landingInput}
        onChange={(e) => setLandingInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            startBuilder(landingInput);
          }
        }}
        placeholder={`Create an ERP for a manufacturing company with:

• Inventory Management
• Procurement
• Production Planning
• HR & Payroll
• Quality Control

Describe your requirements...`}
        className={`w-full min-h-[220px] px-8 pt-8 pb-6 resize-none bg-transparent outline-none text-[15px] leading-8 ${
          isDark
            ? "text-white placeholder:text-white/25"
            : "text-gray-900 placeholder:text-gray-400"
        }`}
      />

      <div
        className="flex items-center justify-between px-6 py-4 border-t"
        style={{
          borderColor: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)",
        }}
      >
        <div className="flex flex-wrap gap-2">
          {["Inventory", "HRMS", "CRM", "Finance", "Analytics"].map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setLandingInput((prev) => (prev ? `${prev}, ${tag}` : tag))
              }
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08] text-white/60 hover:bg-white/[0.08]"
                  : "bg-black/[0.03] border-black/[0.06] text-gray-600 hover:bg-black/[0.06]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => startBuilder(landingInput)}
          disabled={!landingInput.trim()}
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-30"
          style={{
            background: "linear-gradient(135deg,#ff7a18,#ff4fd8,#8b5cf6)",
            boxShadow: landingInput.trim()
              ? "0 12px 35px rgba(168,85,247,.35)"
              : "none",
          }}
        >
          <ArrowRight className="text-white" size={18} />
        </button>
      </div>
    </div>
  );
}
