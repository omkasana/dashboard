"use client";

import type React from "react";
import { motion } from "framer-motion";
import { LandingHeader } from "./landing/LandingHeader";
import { LandingPromptPanel } from "./landing/LandingPromptPanel";

interface OnboardingLandingProps {
  isDark: boolean;
  landingInput: string;
  landingInputRef: React.RefObject<HTMLTextAreaElement | null>;
  setLandingInput: React.Dispatch<React.SetStateAction<string>>;
  startBuilder: (initialText: string) => void;
  toggleTheme: () => void;
}

export function OnboardingLanding({
  isDark,
  landingInput,
  landingInputRef,
  setLandingInput,
  startBuilder,
  toggleTheme,
}: OnboardingLandingProps) {
  return (
    <div
      className="h-screen overflow-hidden flex flex-col relative"
      style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 70% at 10% 20%, rgba(255,120,50,0.28) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 85% 15%, rgba(180,80,255,0.30) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 75% 85%, rgba(50,120,255,0.25) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255,60,120,0.22) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(12,10,18,0.82) 0%, rgba(12,10,18,0.95) 100%)"
            : "radial-gradient(ellipse 80% 70% at 10% 20%, rgba(255,140,60,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 85% 15%, rgba(180,80,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 75% 85%, rgba(50,120,255,0.18) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255,60,120,0.15) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 50%, rgba(248,246,255,0.88) 0%, rgba(240,238,255,0.97) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      <LandingHeader isDark={isDark} toggleTheme={toggleTheme} />

      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[1000px] h-[1000px] rounded-full blur-[180px]"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(168,85,247,.18), rgba(59,130,246,.15), transparent 70%)"
                : "radial-gradient(circle, rgba(168,85,247,.10), rgba(59,130,246,.08), transparent 70%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-5xl flex flex-col items-center"
        >
          <div
            className={`mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-xl ${
              isDark
                ? "bg-white/[0.04] border-white/[0.08] text-white/70"
                : "bg-white/70 border-black/5 text-gray-700"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI ERP Builder
          </div>

          <h1
            className={`text-center font-black tracking-[-0.05em] leading-[0.92] ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            style={{ fontSize: "clamp(4rem,8vw,7rem)" }}
          >
            Build Your ERP
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(90deg,#ff7a18,#ff4fd8,#8b5cf6,#3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              In Minutes
            </span>
          </h1>

          <p
            className={`mt-6 text-center max-w-2xl text-lg leading-8 ${
              isDark ? "text-white/50" : "text-gray-600"
            }`}
          >
            Describe your business operations and let AI generate a complete ERP
            architecture with modules, workflows, permissions, integrations and
            implementation roadmap.
          </p>

          <LandingPromptPanel
            isDark={isDark}
            landingInput={landingInput}
            landingInputRef={landingInputRef}
            setLandingInput={setLandingInput}
            startBuilder={startBuilder}
          />
        </motion.div>
      </div>
    </div>
  );
}
