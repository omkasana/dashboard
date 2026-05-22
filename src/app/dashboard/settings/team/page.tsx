// src/app/dashboard/settings/team/page.tsx

"use client";

import SettingsLayout from "@/components/Settings/SettingsLayout";
import SettingsSection from "@/components/Settings/SettingsSection";

export default function TeamSettingsPage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Team & Permissions</h1>

          <p className="text-muted-foreground">
            Manage workspace members, roles, permissions, and organization
            access policies.
          </p>
        </div>

        {/* Invite Members */}
        <SettingsSection
          title="Invite Team Members"
          description="Add new users to your organization"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <input
              type="email"
              placeholder="Email Address"
              className="h-11 rounded-xl border bg-background px-4"
            />

            <select className="h-11 rounded-xl border bg-background px-4">
              <option>Select Role</option>
              <option>Owner</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>User</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              className="
                rounded-2xl bg-primary px-5 py-2.5
                text-sm font-medium text-primary-foreground
              "
            >
              Send Invitation
            </button>
          </div>
        </SettingsSection>

        {/* Access Policies */}
        <SettingsSection
          title="Access Policies"
          description="Configure organization access rules"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default User Role</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>User</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Session Timeout</label>

              <select className="h-11 w-full rounded-xl border bg-background px-4">
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>8 Hours</option>
                <option>24 Hours</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        {/* Restrictions */}
        <SettingsSection
          title="Restrictions"
          description="Control login and access restrictions"
        >
          <div className="space-y-4">
            {[
              "Enable IP Restrictions",
              "Require Two-Factor Authentication",
              "Allow External Invitations",
              "Enable Single Sign-On (SSO)",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex items-center justify-between
                  rounded-2xl border p-4
                "
              >
                <div>
                  <h3 className="font-medium">{item}</h3>
                </div>

                <input type="checkbox" className="h-5 w-5" />
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Team Members */}
        <SettingsSection
          title="Organization Members"
          description="Manage all users in your workspace"
        >
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full border-collapse">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="px-5 py-4 text-sm font-medium">User</th>

                  <th className="px-5 py-4 text-sm font-medium">Role</th>

                  <th className="px-5 py-4 text-sm font-medium">Status</th>

                  <th className="px-5 py-4 text-sm font-medium">Last Active</th>

                  <th className="px-5 py-4 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    name: "Om Kasana",
                    email: "om@escale.com",
                    role: "Owner",
                    status: "Active",
                    lastActive: "2 min ago",
                  },

                  {
                    name: "Aarav Sharma",
                    email: "aarav@escale.com",
                    role: "Admin",
                    status: "Active",
                    lastActive: "1 hour ago",
                  },

                  {
                    name: "Priya Verma",
                    email: "priya@escale.com",
                    role: "Manager",
                    status: "Pending",
                    lastActive: "Yesterday",
                  },
                ].map((user) => (
                  <tr key={user.email} className="border-t">
                    <td className="px-5 py-4">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>

                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm">{user.role}</td>

                    <td className="px-5 py-4">
                      <span
                        className="
                          rounded-full border px-3 py-1
                          text-xs font-medium
                        "
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {user.lastActive}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        className="
                          rounded-xl border px-4 py-2
                          text-sm
                        "
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="flex justify-end">
          <button
            className="
              rounded-2xl bg-primary px-6 py-3
              text-sm font-medium text-primary-foreground
              shadow-lg
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
