import { Bell, Eye, Check, MoreHorizontal } from "lucide-react";

import type { NotificationItem } from "@/config/notifications.config";

interface Props {
  item: NotificationItem;
}

export function NotificationCard({ item }: Props) {
  return (
    <div
      className="
      group relative

      flex flex-col sm:flex-row
      sm:items-start

      gap-4

      px-4 sm:px-6
      py-5

      border-b border-border/20

      hover:bg-white/40 dark:hover:bg-white/[0.03]

      transition-all duration-200
      "
    >
      {item.unread && (
        <div
          className="
          absolute left-0 top-4 bottom-4

          w-[3px] rounded-full

          bg-primary
          "
        />
      )}

      {/* ICON */}
      <div
        className="
        flex items-center justify-center

        h-11 w-11 rounded-2xl

        bg-primary/10

        border border-primary/10

        shrink-0
        "
      >
        <Bell className="h-4.5 w-4.5 text-primary" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold">{item.title}</h3>

              {item.unread && (
                <span
                  className="
                  inline-flex items-center

                  rounded-full

                  bg-primary/10

                  px-2 py-1

                  text-[10px] font-semibold
                  text-primary
                  "
                >
                  NEW
                </span>
              )}
            </div>

            <p
              className="
              mt-2

              text-sm leading-relaxed
              text-muted-foreground

              max-w-3xl
              "
            >
              {item.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground">{item.time}</span>

              <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />

              <span className="text-xs text-muted-foreground">
                In-app Notification
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div
            className="
            flex flex-wrap items-center gap-2

            opacity-100
            md:opacity-0

            md:group-hover:opacity-100

            transition-all duration-200
            "
          >
            {/* VIEW */}
            <button
              className="
              inline-flex items-center gap-2

              h-10 px-4 rounded-2xl

              bg-white/60 dark:bg-white/[0.03]

              border border-white/50 dark:border-white/[0.06]

              hover:bg-white dark:hover:bg-white/[0.06]

              backdrop-blur-xl

              text-sm font-medium

              transition-all duration-200
              "
            >
              <Eye className="h-4 w-4" />
              View
            </button>

            {/* DISMISS */}
            <button
              className="
              inline-flex items-center gap-2

              h-10 px-4 rounded-2xl

              bg-emerald-500/10

              border border-emerald-500/10

              hover:bg-emerald-500/15

              text-sm font-medium
              text-emerald-600 dark:text-emerald-400

              transition-all duration-200
              "
            >
              <Check className="h-4 w-4" />
              Dismiss
            </button>

            {/* MORE */}
            <button
              className="
              flex items-center justify-center

              h-10 w-10 rounded-2xl

              bg-white/60 dark:bg-white/[0.03]

              border border-white/50 dark:border-white/[0.06]

              hover:bg-white dark:hover:bg-white/[0.06]

              transition-all duration-200
              "
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
