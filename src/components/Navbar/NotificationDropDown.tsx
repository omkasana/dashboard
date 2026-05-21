"use client";

import { Bell, Eye, Check, ChevronRight, MoreHorizontal } from "lucide-react";

import { notifications } from "@/config/notifications.config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";
import Link from "next/link";

export function NotificationsDropdown() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
          relative flex items-center justify-center

          h-10 w-10 rounded-2xl

          bg-white/50 dark:bg-white/[0.04]
          hover:bg-white/70 dark:hover:bg-white/[0.07]

          border border-white/50 dark:border-white/[0.06]

          backdrop-blur-2xl

          shadow-[0_8px_30px_rgba(0,0,0,0.08)]

          transition-all duration-200
          "
        >
          <Bell className="h-4.5 w-4.5 text-foreground/80" />

          {unreadCount > 0 && (
            <div
              className="
              absolute -top-0.5 -right-0.5

              min-w-[18px] h-[18px] px-1

              flex items-center justify-center

              rounded-full

              border border-white/70 dark:border-zinc-900

              bg-primary/90

              backdrop-blur-md

              text-[10px] font-medium text-primary-foreground

              shadow-sm
              "
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
        w-[95vw] sm:w-[390px]

        p-0 overflow-hidden

        rounded-3xl

        bg-white/70 dark:bg-zinc-950/70

        backdrop-blur-3xl backdrop-saturate-150

        border border-white/50 dark:border-white/[0.06]

        shadow-[0_25px_80px_rgba(0,0,0,0.28)]
        "
      >
        {/* HEADER */}
        <div
          className="
          flex items-center justify-between

          px-4 sm:px-5
          py-4

          border-b border-border/20

          bg-white/30 dark:bg-white/[0.02]
          "
        >
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              Notifications
            </h3>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {unreadCount} unread notifications
            </p>
          </div>

          <Link
            href="/dashboard/notifications"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary/90 hover:text-primary transition"
          >
            <span>View all</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* LIST */}
        <div className="max-h-[420px] overflow-y-auto">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="
              group relative flex gap-3

              px-4 sm:px-5
              py-4

              border-b border-border/20

              hover:bg-white/35 dark:hover:bg-white/[0.03]

              transition-all duration-200
              "
            >
              {/* unread accent */}
              {item.unread && (
                <div
                  className="
                  absolute left-0 top-3 bottom-3

                  w-[2px] rounded-full

                  bg-primary/70
                  "
                />
              )}

              {/* unread dot */}
              <div className="pt-1.5 shrink-0">
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.unread ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="
                      text-sm font-medium
                      text-foreground

                      truncate
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                      mt-1

                      text-xs leading-relaxed
                      text-muted-foreground

                      line-clamp-2
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className="
                      text-[10px]
                      font-medium
                      text-muted-foreground/80
                      "
                    >
                      {item.time}
                    </span>

                    <button
                      className="
                      hidden md:flex

                      items-center justify-center

                      h-6 w-6 rounded-lg

                      hover:bg-black/5 dark:hover:bg-white/5

                      transition
                      "
                    >
                      <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  className="
                  mt-3 flex items-center gap-2

                  opacity-100 translate-y-0
                  md:opacity-0 md:translate-y-1

                  md:group-hover:opacity-100
                  md:group-hover:translate-y-0

                  transition-all duration-200
                  "
                >
                  {/* VIEW */}
                  <button
                    className="
                    group/btn

                    inline-flex items-center gap-1.5

                    h-8 px-3

                    rounded-xl

                    bg-white/45 dark:bg-white/[0.04]
                    hover:bg-white/70 dark:hover:bg-white/[0.07]

                    border border-white/50 dark:border-white/[0.06]

                    backdrop-blur-xl

                    text-[11px] font-medium

                    text-muted-foreground
                    hover:text-foreground

                    transition-all duration-200

                    active:scale-[0.97]
                    "
                  >
                    <Eye
                      className="
                      h-3.5 w-3.5

                      opacity-70
                      group-hover/btn:opacity-100

                      transition
                      "
                    />

                    <span>View</span>
                  </button>

                  {/* DISMISS */}
                  <button
                    className="
                    group/btn

                    inline-flex items-center gap-1.5

                    h-8 px-3

                    rounded-xl

                    bg-white/45 dark:bg-white/[0.04]

                    hover:bg-emerald-500/10
                    dark:hover:bg-emerald-500/10

                    border border-white/50 dark:border-white/[0.06]

                    hover:border-emerald-500/20

                    backdrop-blur-xl

                    text-[11px] font-medium

                    text-muted-foreground
                    hover:text-emerald-600
                    dark:hover:text-emerald-400

                    transition-all duration-200

                    active:scale-[0.97]
                    "
                  >
                    <Check
                      className="
                      h-3.5 w-3.5

                      opacity-70
                      group-hover/btn:opacity-100

                      transition
                      "
                    />

                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div
          className="
          flex items-center justify-between

          px-4 sm:px-5
          py-3

          border-t border-border/20

          bg-white/25 dark:bg-white/[0.02]
          "
        >
          <button
            className="
            text-xs font-medium

            text-muted-foreground
            hover:text-foreground

            transition
            "
          >
            Clear all
          </button>

          <button
            className="
            inline-flex items-center justify-center

            h-9 px-4 rounded-2xl

            bg-primary
            hover:bg-primary/90

            text-xs font-medium
            text-primary-foreground

            transition-all duration-200
            "
          >
            Mark all as read
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
