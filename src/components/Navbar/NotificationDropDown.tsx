"use client";

import { Bell } from "lucide-react";
import { notifications } from "@/config/notifications.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          {notifications.some((n) => n.unread) && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4 font-semibold border-b">Notifications</div>

        {notifications.map((item) => (
          <div key={item.id} className="p-4 border-b">
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
