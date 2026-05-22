import { userData } from "@/dummy/user.data";
import { organizationOptions } from "@/config/options/organisations";

function asNumber(value: unknown) {
  return typeof value === "number" ? value : Number(value) || 0;
}

function uniqueValues(values: unknown[]) {
  return [...new Set(values.map(String).filter(Boolean))].sort();
}

export const userOrganizationData = organizationOptions.map((organization) => {
  const users = userData.filter(
    (user) => user.organizationId === organization.value,
  );
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const adminUsers = users.filter((user) => user.role === "Admin").length;
  const totalAccountValue = users.reduce(
    (sum, user) => sum + asNumber(user.accountValue),
    0,
  );
  const lastActive = users
    .map((user) => user.lastLogin)
    .filter(Boolean)
    .sort()
    .at(-1);

  return {
    id: organization.value,
    organization: organization.label,
    organizationId: organization.value,
    usersCount: users.length,
    activeUsers,
    inactiveUsers: users.length - activeUsers,
    adminUsers,
    memberUsers: users.length - adminUsers,
    departments: uniqueValues(users.map((user) => user.department)).join(", "),
    regions: uniqueValues(users.map((user) => user.region)).join(", "),
    plans: uniqueValues(users.map((user) => user.planType)).join(", "),
    totalAccountValue,
    avgAccountValue: users.length
      ? Math.round(totalAccountValue / users.length)
      : 0,
    lastActive,
  };
});
