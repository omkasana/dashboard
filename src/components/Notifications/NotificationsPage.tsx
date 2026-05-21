"use client";

import { useMemo, useState } from "react";
import { notifications } from "@/config/notifications.config";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationCard } from "./NotificationCard";

export function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "unread"
            ? item.unread
            : !item.unread;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-6">
      <NotificationHeader />

      <NotificationFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      <div
        className="
        overflow-hidden rounded-3xl

        border border-white/40 dark:border-white/[0.06]

        bg-white/60 dark:bg-white/[0.03]

        backdrop-blur-3xl
        "
      >
        {filteredNotifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
