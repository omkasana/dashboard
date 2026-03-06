import AccountOverview from "@/components/Profile/AccountOverview";
import ActivityTimeline from "@/components/Profile/ActivityTimeline";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import PersonalInfo from "@/components/Profile/ProfileInfo";
import ProfileMedia from "@/components/Profile/ProfileMedia";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <ProfileHeader />

      <div className="grid md:grid-cols-2 gap-8">
        <PersonalInfo />
        <ProfileMedia />
      </div>

      <AccountOverview />

      <ActivityTimeline />
    </div>
  );
}
