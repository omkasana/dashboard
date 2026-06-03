"use client";

import { Layers, Moon, Sun } from "lucide-react";

interface LandingHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function LandingHeader({ isDark, toggleTheme }: LandingHeaderProps) {
  return (
    <div className="relative z-10 flex items-center justify-between px-6 pt-5">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,120,50,0.9), rgba(180,80,255,0.9))",
          }}
        >
          <Layers size={14} className="text-white" />
        </div>
        <span
          className={`text-sm font-semibold ${isDark ? "text-white/90" : "text-gray-800"}`}
        >
          ERPBlueprint
        </span>
      </div>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-xl backdrop-blur-md border transition-all ${isDark ? "bg-white/[0.06] border-white/[0.1] text-white/60 hover:text-white/90" : "bg-black/[0.05] border-black/[0.08] text-gray-500 hover:text-gray-800"}`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </div>
  );
}
