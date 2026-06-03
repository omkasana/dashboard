"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { OnboardingBuilder } from "./components/OnboardingBuilder";
import { OnboardingLanding } from "./components/OnboardingLanding";
import {
  ALL_QUESTIONS,
  ERP_SECTIONS,
  TOTAL_QUESTIONS,
  getMissingInfo,
  inferModules,
} from "./onboarding-data";
import type { Answer, Message } from "./onboarding-data";

type CurrentQuestion = (typeof ALL_QUESTIONS)[number] & {
  sectionId: string;
  sectionLabel: string;
};

export default function Page() {
  const [isDark, setIsDark] = useState(false);
  const [phase, setPhase] = useState<"landing" | "builder">("landing");
  const [landingInput, setLandingInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionFlat, setCurrentQuestionFlat] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const landingInputRef = useRef<HTMLTextAreaElement>(null);

  const toggleTheme = () => setIsDark((d) => !d);

  const currentQ = ALL_QUESTIONS[currentQuestionFlat] as CurrentQuestion | undefined;
  const currentSectionIdx = currentQ
    ? ERP_SECTIONS.findIndex((s) => s.id === currentQ.sectionId)
    : -1;
  const currentSectionInfo =
    currentSectionIdx >= 0 ? ERP_SECTIONS[currentSectionIdx] : null;
  const answeredCount = answers.length;
  const progressPct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);
  const readiness = Math.min(
    100,
    Math.round((answeredCount / TOTAL_QUESTIONS) * 100),
  );

  const modules = inferModules(answers);
  const missingInfo = getMissingInfo(answers);

  const businessName =
    answers.find((a) => a.questionId === "business_name")?.value || "";
  const industry =
    answers.find((a) => a.questionId === "industry")?.value || "";
  const employees =
    answers.find((a) => a.questionId === "employee_count")?.value || "";
  const geoOps =
    answers.find((a) => a.questionId === "geographies")?.value || "";
  const painPoints =
    answers.find((a) => a.questionId === "pain_points")?.value || "";
  const timeline =
    answers.find((a) => a.questionId === "timeline")?.value || "";
  const integrationsList =
    answers.find((a) => a.questionId === "existing_tools")?.value || "";
  const depts =
    answers.find((a) => a.questionId === "departments")?.value || "";

  const sectionProgress = ERP_SECTIONS.map((section) => {
    const sqs = section.questions.map((q) => q.id);
    const answered = sqs.filter((id) =>
      answers.some((a) => a.questionId === id),
    ).length;
    return {
      id: section.id,
      label: section.label,
      answered,
      total: sqs.length,
      complete: answered === sqs.length,
    };
  });

  const addMessage = useCallback(
    (role: "assistant" | "user", content: string, questionId?: string) => {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, role, content, questionId },
      ]);
    },
    [],
  );

  const askQuestion = useCallback(
    (
      q: CurrentQuestion,
    ) => {
      addMessage("assistant", q.text, q.id);
    },
    [addMessage],
  );

  const startBuilder = useCallback(
    (initialText: string) => {
      if (!initialText.trim()) return;
      setPhase("builder");
      setTimeout(() => {
        addMessage(
          "assistant",
          `Welcome! I'm going to help you design a complete ERP blueprint for your business.\n\nLet's start with the basics. I'll ask you ${TOTAL_QUESTIONS} focused questions across 8 key areas — from your business profile to integrations and rollout priorities.\n\nYour answers will be used to generate a custom ERP module map, integration plan, and phased rollout blueprint.`,
        );
        setTimeout(() => {
          addMessage("user", initialText);
          setTimeout(() => {
            askQuestion(
              ALL_QUESTIONS[0] as CurrentQuestion,
            );
          }, 400);
        }, 600);
      }, 200);
    },
    [addMessage, askQuestion],
  );

  const submitAnswer = useCallback(
    (value: string) => {
      if (!value.trim() || !currentQ) return;
      addMessage("user", value);
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== currentQ.id);
        return [...filtered, { questionId: currentQ.id, value }];
      });
      setInputValue("");
      setSelectedChips([]);
      const next = currentQuestionFlat + 1;
      if (next >= TOTAL_QUESTIONS) {
        setIsDone(true);
        setTimeout(() => {
          addMessage(
            "assistant",
            `🎉 Discovery complete!\n\nYou've answered all ${TOTAL_QUESTIONS} questions. Your ERP blueprint is now being compiled.\n\nReview your business profile, activated modules, integration requirements, and rollout priorities in the panel on the right. You can export this as a scoping document to share with your implementation partner.`,
          );
        }, 400);
      } else {
        setCurrentQuestionFlat(next);
        const nextQ = ALL_QUESTIONS[next] as CurrentQuestion;
        const prevSection = currentQ.sectionId;
        const nextSection = nextQ.sectionId;
        if (prevSection !== nextSection) {
          setTimeout(() => {
            addMessage(
              "assistant",
              `Great. Now let's move to **${nextQ.sectionLabel}**.`,
            );
            setTimeout(() => askQuestion(nextQ), 400);
          }, 300);
        } else {
          setTimeout(() => askQuestion(nextQ), 300);
        }
      }
    },
    [currentQ, currentQuestionFlat, addMessage, askQuestion],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (currentQ?.multi && selectedChips.length > 0)
          submitAnswer(selectedChips.join(", "));
        else if (inputValue.trim()) submitAnswer(inputValue);
      }
    },
    [currentQ, selectedChips, inputValue, submitAnswer],
  );

  const toggleChip = useCallback(
    (val: string) => {
      if (!currentQ?.multi) {
        submitAnswer(val);
        return;
      }
      setSelectedChips((prev) =>
        prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
      );
    },
    [currentQ, submitAnswer],
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (phase === "builder") inputRef.current?.focus();
  }, [phase, currentQuestionFlat]);

  if (phase === "landing") {
    return (
      <OnboardingLanding
        isDark={isDark}
        landingInput={landingInput}
        landingInputRef={landingInputRef}
        setLandingInput={setLandingInput}
        startBuilder={startBuilder}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <OnboardingBuilder
      isDark={isDark}
      isDone={isDone}
      currentSectionInfo={currentSectionInfo}
      progressPct={progressPct}
      currentQuestionFlat={currentQuestionFlat}
      currentSectionIdx={currentSectionIdx}
      messages={messages}
      currentQ={currentQ}
      chatEndRef={chatEndRef}
      inputRef={inputRef}
      selectedChips={selectedChips}
      inputValue={inputValue}
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
      toggleTheme={toggleTheme}
      toggleChip={toggleChip}
      setInputValue={setInputValue}
      handleKeyDown={handleKeyDown}
      submitAnswer={submitAnswer}
      setCurrentQuestionFlat={setCurrentQuestionFlat}
      setMessages={setMessages}
    />
  );
}
