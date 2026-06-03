"use client";

import type React from "react";
import { BuilderHeader } from "./builder/BuilderHeader";
import { BlueprintSidebar } from "./builder/BlueprintSidebar";
import { Composer } from "./builder/Composer";
import { DoneNotice } from "./builder/DoneNotice";
import { MessageList } from "./builder/MessageList";
import { SectionNav } from "./builder/SectionNav";
import { ERP_SECTIONS } from "../onboarding-data";
import type { Message } from "../onboarding-data";

type CurrentQuestion = (typeof ERP_SECTIONS)[number]["questions"][number] & {
  sectionId: string;
  sectionLabel: string;
};

interface SectionProgress {
  id: string;
  label: string;
  answered: number;
  total: number;
  complete: boolean;
}

interface OnboardingBuilderProps {
  isDark: boolean;
  isDone: boolean;
  currentSectionInfo: (typeof ERP_SECTIONS)[number] | null;
  progressPct: number;
  currentQuestionFlat: number;
  currentSectionIdx: number;
  messages: Message[];
  currentQ: CurrentQuestion | undefined;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  selectedChips: string[];
  inputValue: string;
  readiness: number;
  answeredCount: number;
  businessName: string;
  industry: string;
  employees: string;
  geoOps: string;
  modules: string[];
  missingInfo: string[];
  painPoints: string;
  timeline: string;
  integrationsList: string;
  depts: string;
  sectionProgress: SectionProgress[];
  toggleTheme: () => void;
  toggleChip: (value: string) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  submitAnswer: (value: string) => void;
  setCurrentQuestionFlat: React.Dispatch<React.SetStateAction<number>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function OnboardingBuilder({
  isDark,
  isDone,
  currentSectionInfo,
  progressPct,
  currentQuestionFlat,
  currentSectionIdx,
  messages,
  currentQ,
  chatEndRef,
  inputRef,
  selectedChips,
  inputValue,
  readiness,
  answeredCount,
  businessName,
  industry,
  employees,
  geoOps,
  modules,
  missingInfo,
  painPoints,
  timeline,
  integrationsList,
  depts,
  sectionProgress,
  toggleTheme,
  toggleChip,
  setInputValue,
  handleKeyDown,
  submitAnswer,
  setCurrentQuestionFlat,
  setMessages,
}: OnboardingBuilderProps) {
  return (
    <div
      className="h-screen overflow-hidden relative"
      style={{ fontFamily: "'Inter','system-ui',sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 55% 45% at 0% 0%, rgba(255,120,50,0.07) 0%, transparent 52%), radial-gradient(ellipse 45% 40% at 100% 100%, rgba(180,80,255,0.07) 0%, transparent 48%), #0a0a0c"
            : "radial-gradient(ellipse 60% 50% at 0% 0%, rgba(255,140,60,0.08) 0%, transparent 52%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(180,80,255,0.06) 0%, transparent 48%), #f6f4f9",
        }}
      />

      <div className="relative z-10 h-full p-3 lg:p-4">
        <div
          className="h-full rounded-[30px] border overflow-hidden backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          style={{
            background: isDark
              ? "rgba(12,12,16,0.62)"
              : "rgba(255,255,255,0.52)",
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.55)",
          }}
        >
          <BuilderHeader
            isDark={isDark}
            isDone={isDone}
            currentSectionInfo={currentSectionInfo}
            progressPct={progressPct}
            currentQuestionFlat={currentQuestionFlat}
            toggleTheme={toggleTheme}
          />

          <div className="h-[calc(100%-56px)] p-3 lg:p-4">
            <div className="h-full flex gap-4">
              <div
                className="flex-1 min-w-0 rounded-[28px] border overflow-hidden backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.06)]"
                style={{
                  background: isDark
                    ? "rgba(14,14,18,0.58)"
                    : "rgba(255,255,255,0.48)",
                  borderColor: isDark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(255,255,255,0.58)",
                }}
              >
                <div className="h-full flex flex-col min-h-0">
                  <SectionNav
                    isDark={isDark}
                    isDone={isDone}
                    currentSectionIdx={currentSectionIdx}
                  />
                  <MessageList
                    isDark={isDark}
                    isDone={isDone}
                    messages={messages}
                    currentQ={currentQ}
                    chatEndRef={chatEndRef}
                  />
                  {!isDone ? (
                    <Composer
                      isDark={isDark}
                      currentQ={currentQ}
                      selectedChips={selectedChips}
                      inputValue={inputValue}
                      inputRef={inputRef}
                      currentQuestionFlat={currentQuestionFlat}
                      toggleChip={toggleChip}
                      setInputValue={setInputValue}
                      handleKeyDown={handleKeyDown}
                      submitAnswer={submitAnswer}
                      setCurrentQuestionFlat={setCurrentQuestionFlat}
                      setMessages={setMessages}
                    />
                  ) : (
                    <DoneNotice isDark={isDark} />
                  )}
                </div>
              </div>

              <BlueprintSidebar
                isDark={isDark}
                isDone={isDone}
                readiness={readiness}
                answeredCount={answeredCount}
                businessName={businessName}
                industry={industry}
                employees={employees}
                geoOps={geoOps}
                modules={modules}
                missingInfo={missingInfo}
                painPoints={painPoints}
                timeline={timeline}
                integrationsList={integrationsList}
                depts={depts}
                sectionProgress={sectionProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
