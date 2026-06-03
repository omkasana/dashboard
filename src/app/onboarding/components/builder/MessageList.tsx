"use client";

import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Layers } from "lucide-react";
import type { Message, Question } from "../../onboarding-data";

type CurrentQuestion = Question & {
  sectionId: string;
  sectionLabel: string;
};

interface MessageListProps {
  isDark: boolean;
  isDone: boolean;
  messages: Message[];
  currentQ: CurrentQuestion | undefined;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({
  isDark,
  isDone,
  messages,
  currentQ,
  chatEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <div className="max-w-3xl mx-auto space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" ? (
                  <div className="max-w-[84%] space-y-1.5">
                    <div className="flex items-center gap-2 px-1">
                      <div
                        className="w-5 h-5 rounded-lg flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,120,50,0.88), rgba(180,80,255,0.88))",
                        }}
                      >
                        <Layers size={10} className="text-white" />
                      </div>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${isDark ? "text-white/28" : "text-gray-400"}`}
                      >
                        AI Builder
                      </span>
                    </div>

                    <div
                      className="px-5 py-4 rounded-[28px] rounded-tl-md text-[15px] leading-7 border backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                      style={{
                        background: isDark
                          ? "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))"
                          : "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.72))",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.07)"
                          : "rgba(255,255,255,0.7)",
                        color: isDark ? "rgba(255,255,255,0.82)" : "#17181c",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.content.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </div>

                    {msg.questionId === currentQ?.id && currentQ && !isDone && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="px-3 pt-1 text-xs flex items-start gap-1.5 max-w-[88%]"
                        style={{
                          color: isDark ? "rgba(255,255,255,0.34)" : "#7b7b88",
                        }}
                      >
                        <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                        <span>{currentQ.helper}</span>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-[62%]">
                    <div
                      className="px-4 py-3.5 rounded-[24px] rounded-tr-md text-sm leading-relaxed border shadow-[0_10px_24px_rgba(180,80,255,0.08)]"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, rgba(255,120,50,0.13), rgba(180,80,255,0.13))"
                          : "linear-gradient(135deg, rgba(255,120,50,0.10), rgba(180,80,255,0.12))",
                        borderColor: isDark
                          ? "rgba(180,80,255,0.18)"
                          : "rgba(180,80,255,0.14)",
                        color: isDark ? "rgba(230,205,255,0.95)" : "#6b21a8",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
