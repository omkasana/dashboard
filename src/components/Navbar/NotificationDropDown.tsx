"use client";

import { Bell, Eye, Check, Trash2 } from "lucide-react";
import { notifications } from "@/config/notifications.config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

export function NotificationsDropdown() {
  const unread = notifications.some((n) => n.unread);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
       relative flex items-center justify-center
       h-9 w-9 rounded-full
       bg-white/40 dark:bg-white/5
       backdrop-blur-xl
       border border-white/40 dark:border-white/10
       shadow-sm
       hover:bg-white/60 dark:hover:bg-white/10
       transition-all
       "
        >
          {" "}
          <Bell className="h-[18px] w-[18px] text-foreground/80" />
          {unread && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 shadow" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="
    w-[380px] p-0 overflow-hidden rounded-2xl
    bg-white/60 dark:bg-white/[0.05]
    backdrop-blur-2xl backdrop-saturate-150
    border border-white/50 dark:border-white/10
    shadow-[0_20px_60px_rgba(0,0,0,0.25)]
    "
      >
        {/* header */}
        <div className="px-5 py-4 text-sm font-semibold border-b border-border/40">
          Notifications
        </div>

        {/* list */}
        <div className="max-h-[360px] overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="
          group flex items-start gap-3
          px-5 py-4
          border-b border-border/30
          hover:bg-white/40 dark:hover:bg-white/5
          transition
          "
            >
              {/* unread dot */}
              <div
                className={`mt-2 h-2 w-2 rounded-full ${
                  item.unread ? "bg-blue-500" : "bg-transparent"
                }`}
              />

              {/* notification content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>

                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                {/* VIEW */}
                <div className="relative group/action">
                  <button
                    className="
                p-1.5 rounded-md
                bg-white/40 dark:bg-white/10
                backdrop-blur
                hover:bg-white/60 dark:hover:bg-white/20
                transition
                "
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>

                  <span
                    className="
                pointer-events-none
                absolute -bottom-7 left-1/2 -translate-x-1/2
                whitespace-nowrap text-xs px-2 py-1 rounded-md
                bg-white/80 dark:bg-zinc-900/90
                backdrop-blur-md
                border border-white/40 dark:border-white/10
                shadow-md
                opacity-0 group-hover/action:opacity-100
                transition
                "
                  >
                    View
                  </span>
                </div>

                {/* DISMISS */}
                <div className="relative group/action">
                  <button
                    className="
                p-1.5 rounded-md
                bg-white/40 dark:bg-white/10
                backdrop-blur
                hover:bg-white/60 dark:hover:bg-white/20
                transition
                "
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>

                  <span
                    className="
                pointer-events-none
                absolute -bottom-7 left-1/2 -translate-x-1/2
                whitespace-nowrap text-xs px-2 py-1 rounded-md
                bg-white/80 dark:bg-zinc-900/90
                backdrop-blur-md
                border border-white/40 dark:border-white/10
                shadow-md
                opacity-0 group-hover/action:opacity-100
                transition
                "
                  >
                    Dismiss
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
