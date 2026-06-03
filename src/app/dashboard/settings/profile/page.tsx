// src/app/dashboard/settings/profile/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";

import AccountOverview from "@/components/Profile/AccountOverview";
import ActivityTimeline from "@/components/Profile/ActivityTimeline";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PersonalInfo from "@/components/Profile/ProfileInfo";
import ProfileMedia from "@/components/Profile/ProfileMedia";

export default function ProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>

          <p className="text-muted-foreground">
            Manage your account information, preferences, and profile settings.
          </p>
        </div>

        {/* Profile Header */}
        <ProfileHeader />

        {/* Profile Content */}
        <div className="grid gap-8 xl:grid-cols-2">
          <PersonalInfo />

          <ProfileMedia />
        </div>

        {/* Overview */}
        <AccountOverview />

        {/* Activity */}
        <ActivityTimeline />
      </div>
    </SettingsLayout>
  );
}
