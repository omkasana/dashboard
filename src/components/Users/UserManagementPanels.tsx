"use client";

import { useMemo, useState } from "react";
import { Building2, Users } from "lucide-react";

type UserRecord = Record<string, unknown> & {
  id?: string | number;
  _id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  organization?: string;
  organizationId?: string;
  lastLogin?: string;
};

interface OrganizationGroup {
  id: string;
  name: string;
  users: UserRecord[];
}

interface Props {
  users: UserRecord[];
}

function text(value: unknown, fallback = "-") {
  return value === null || value === undefined || value === ""
    ? fallback
    : String(value);
}

function groupUsersByOrganization(users: UserRecord[]): OrganizationGroup[] {
  const groups = new Map<string, OrganizationGroup>();

  users.forEach((user) => {
    const name = text(user.organization, "Unassigned");
    const id = text(user.organizationId, name.toLowerCase().replace(/\s+/g, "-"));

    const group = groups.get(id) ?? { id, name, users: [] };
    group.users.push(user);
    groups.set(id, group);
  });

  return [...groups.values()]
    .map((group) => ({
      ...group,
      users: [...group.users].sort((a, b) =>
        text(a.name).localeCompare(text(b.name)),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function UserManagementPanels({ users }: Props) {
  const [activePanel, setActivePanel] = useState<"orgs" | "all">("all");

  const groups = useMemo(() => groupUsersByOrganization(users), [users]);
  const activeUsers = users.filter((user) => user.status === "Active").length;

  return (
    <section className="rounded-2xl border border-border bg-background/70 p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold">User Panels</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage organization users and review all users across organizations.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-xl border border-border px-3 py-2">
            <div className="text-xs text-muted-foreground">Organizations</div>
            <div className="font-semibold">{groups.length}</div>
          </div>
          <div className="rounded-xl border border-border px-3 py-2">
            <div className="text-xs text-muted-foreground">Users</div>
            <div className="font-semibold">{users.length}</div>
          </div>
          <div className="rounded-xl border border-border px-3 py-2">
            <div className="text-xs text-muted-foreground">Active</div>
            <div className="font-semibold">{activeUsers}</div>
          </div>
        </div>
      </div>

      <div className="mb-4 inline-flex rounded-xl border border-border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => setActivePanel("orgs")}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
            activePanel === "orgs"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 size={16} />
          Org Users
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("all")}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
            activePanel === "all"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users size={16} />
          All Users
        </button>
      </div>

      {activePanel === "orgs" ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {groups.map((group) => {
            const activeCount = group.users.filter(
              (user) => user.status === "Active",
            ).length;

            return (
              <div
                key={group.id}
                className="rounded-xl border border-border bg-background p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      {group.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {group.users.length} users, {activeCount} active
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {group.users.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {group.users.slice(0, 5).map((user) => (
                    <div
                      key={text(user.id ?? user._id ?? user.email)}
                      className="flex items-center justify-between gap-3 rounded-lg bg-muted/35 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {text(user.name)}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {text(user.email)}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {text(user.role)}
                      </span>
                    </div>
                  ))}
                </div>

                {group.users.length > 5 && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    +{group.users.length - 5} more users
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-between border-b border-border bg-muted/35 px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold">{group.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {group.users.length} users
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {group.users.length}
                </span>
              </div>

              <div className="max-h-80 overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-background">
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Last Login
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.users.map((user) => (
                      <tr
                        key={text(user.id ?? user._id ?? user.email)}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium">{text(user.name)}</div>
                          <div className="text-xs text-muted-foreground">
                            {text(user.email)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {text(user.role)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                            {text(user.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleDateString(
                                "en-IN",
                              )
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
