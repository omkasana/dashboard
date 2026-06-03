"use client";

import { Bell, Trash2, CheckCheck } from "lucide-react";
import { notifications } from "@/config/notifications.config";

export function NotificationHeader() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      className="
      relative overflow-hidden

      rounded-3xl

      border border-white/40 dark:border-white/[0.06]

      bg-white/60 dark:bg-white/[0.03]

      backdrop-blur-3xl

      shadow-[0_20px_60px_rgba(0,0,0,0.08)]

      p-5 sm:p-7
      "
    >
      <div
        className="
        absolute inset-0

        bg-gradient-to-br
        from-primary/10
        via-transparent
        to-transparent

        pointer-events-none
        "
      />

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className="
            flex items-center justify-center

            h-14 w-14 rounded-2xl

            bg-primary/10

            border border-primary/10
            "
          >
            <Bell className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>

            <p className="mt-1 text-sm text-muted-foreground max-w-xl">
              Manage all your notifications, mentions, alerts, workflows and
              activity updates.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div
                className="
                inline-flex items-center gap-2

                rounded-2xl

                border border-white/40 dark:border-white/[0.06]

                bg-white/50 dark:bg-white/[0.03]

                px-3 py-2
                "
              >
                <div className="h-2 w-2 rounded-full bg-primary" />

                <span className="text-xs font-medium">
                  {unreadCount} unread
                </span>
              </div>

              <div
                className="
                inline-flex items-center gap-2

                rounded-2xl

                border border-white/40 dark:border-white/[0.06]

                bg-white/50 dark:bg-white/[0.03]

                px-3 py-2
                "
              >
                <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />

                <span className="text-xs font-medium">Real-time synced</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="
            inline-flex items-center gap-2

            h-11 px-4 rounded-2xl

            bg-white/50 dark:bg-white/[0.04]

            border border-white/50 dark:border-white/[0.06]

            hover:bg-white/70 dark:hover:bg-white/[0.07]

            backdrop-blur-xl

            text-sm font-medium

            transition-all duration-200
            "
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>

          <button
            className="
            inline-flex items-center gap-2

            h-11 px-4 rounded-2xl

            bg-red-500/10

            border border-red-500/10

            hover:bg-red-500/15

            text-sm font-medium text-red-500

            transition-all duration-200
            "
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
