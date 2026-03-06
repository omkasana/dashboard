"use client";

import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SecuritySettings from "./SecuritySettings";
import Preferences from "./Preferences";

export default function ProfileTabs() {
  const [tab, setTab] = useState("info");

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-border pb-2">
        <button onClick={() => setTab("info")}>Personal Info</button>

        <button onClick={() => setTab("security")}>Security</button>

        <button onClick={() => setTab("preferences")}>Preferences</button>
      </div>

      {tab === "info" && <ProfileInfo />}
      {tab === "security" && <SecuritySettings />}
      {tab === "preferences" && <Preferences />}
    </div>
  );
}
