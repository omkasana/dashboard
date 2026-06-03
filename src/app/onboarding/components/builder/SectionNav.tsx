"use client";

import { CheckCircle2 } from "lucide-react";
import { ERP_SECTIONS } from "../../onboarding-data";

interface SectionNavProps {
  isDark: boolean;
  isDone: boolean;
  currentSectionIdx: number;
}

export function SectionNav({
  isDark,
  isDone,
  currentSectionIdx,
}: SectionNavProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-1 px-4 py-3 border-b overflow-x-auto"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        background: isDark ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.22)",
      }}
    >
      {ERP_SECTIONS.map((section, idx) => {
        const isActive = idx === currentSectionIdx && !isDone;
        const isDoneSection = idx < currentSectionIdx || isDone;

        return (
          <div
            key={section.id}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isActive
                ? "text-white"
                : isDoneSection
                  ? isDark
                    ? "text-emerald-400 bg-emerald-400/10"
                    : "text-emerald-600 bg-emerald-500/10"
                  : isDark
                    ? "text-white/28"
                    : "text-gray-400"
            }`}
            style={
              isActive
                ? {
                    background:
                      "linear-gradient(135deg, rgba(255,120,50,0.20), rgba(180,80,255,0.22))",
                    border: "1px solid rgba(180,80,255,0.22)",
                    boxShadow: "0 8px 20px rgba(180,80,255,0.10)",
                  }
                : {}
            }
          >
            {isDoneSection && !isActive ? <CheckCircle2 size={11} /> : section.icon}
            <span className="hidden sm:block">{section.label}</span>
          </div>
        );
      })}
    </div>
  );
}
