"use client";

import { Avatar } from "../UI/avatar";

export default function ProfileHeader() {
  return (
    <div
      className="
      flex items-center gap-6
      p-6
      rounded-2xl
      border border-white/10
      bg-white/40 dark:bg-white/[0.04]
      backdrop-blur-xl
      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      "
    >
      <Avatar size="lg" />

      <div>
        <h1 className="text-xl font-semibold text-foreground">Om Kasana</h1>

        <p className="text-sm text-muted-foreground">Full Stack Developer</p>

        <p className="text-xs text-muted-foreground mt-1">
          Delhi, India • Joined May 2025
        </p>
      </div>
    </div>
  );
}
