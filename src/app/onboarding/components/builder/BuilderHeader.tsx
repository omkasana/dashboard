"use client";

import { motion } from "framer-motion";
import { Layers, Moon, Sun } from "lucide-react";
import { TOTAL_QUESTIONS } from "../../onboarding-data";
import type { Section } from "../../onboarding-data";

interface BuilderHeaderProps {
  isDark: boolean;
  isDone: boolean;
  currentSectionInfo: Section | null;
  progressPct: number;
  currentQuestionFlat: number;
  toggleTheme: () => void;
}

export function BuilderHeader({
  isDark,
  isDone,
  currentSectionInfo,
  progressPct,
  currentQuestionFlat,
  toggleTheme,
}: BuilderHeaderProps) {
  return (
    <header
      className="relative z-20 flex-shrink-0 flex items-center justify-between px-4 lg:px-5 h-14 border-b backdrop-blur-md"
      style={{
        background: isDark ? "rgba(10,10,14,0.42)" : "rgba(255,255,255,0.30)",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,120,50,0.92), rgba(180,80,255,0.92))",
            }}
          >
            <Layers size={13} className="text-white" />
          </div>
          <span
            className={`text-sm font-semibold tracking-tight ${isDark ? "text-white/85" : "text-gray-900"}`}
          >
            ERPBlueprint
          </span>
        </div>

        <span className={`${isDark ? "text-white/15" : "text-gray-300"}`}>
          •
        </span>

        <span
          className={`text-xs font-medium truncate ${isDark ? "text-white/40" : "text-gray-500"}`}
        >
          {isDone ? "Blueprint Complete" : currentSectionInfo?.label || "Discovery"}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-6">
        <div
          className={`flex-1 h-0.5 rounded-full overflow-hidden ${isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"}`}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #ff7832, #c050ff)" }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span
          className={`text-xs font-medium whitespace-nowrap ${isDark ? "text-white/35" : "text-gray-400"}`}
        >
          {progressPct}% complete
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs hidden sm:block ${isDark ? "text-white/25" : "text-gray-400"}`}
        >
          {isDone
            ? `${TOTAL_QUESTIONS}/${TOTAL_QUESTIONS}`
            : `${currentQuestionFlat + 1} of ${TOTAL_QUESTIONS}`}
        </span>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-colors ${isDark ? "bg-white/[0.05] text-white/40 hover:text-white/70" : "bg-black/[0.04] text-gray-400 hover:text-gray-700"}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
