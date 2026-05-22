import { organizationOptions } from "@/config/options/organisations";

const departments = ["Engineering", "Sales", "Marketing", "Finance", "Support"];
const plans = ["Free", "Starter", "Pro", "Enterprise"];
const regions = ["India", "US", "Europe", "APAC"];
const sources = ["Organic", "Referral", "Ads", "Direct"];
const tiers = ["Bronze", "Silver", "Gold", "Platinum"];
const riskLevels = ["Low", "Medium", "High"];
const usersPerOrganization = 10;

export const userData = Array.from(
  { length: organizationOptions.length * usersPerOrganization },
  (_, i) => {
    const baseNumber = 9000000000 + i * 137;

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - i * 3);

    const lastLoginDate = new Date();
    lastLoginDate.setDate(lastLoginDate.getDate() - (i % 15));
    const organizationIndex = Math.floor(i / usersPerOrganization);
    const organization = organizationOptions[organizationIndex];
    const userNumberWithinOrg = (i % usersPerOrganization) + 1;

    return {
      id: i + 1,
      name: `${organization.label} User ${userNumberWithinOrg}`,
      email: `user${userNumberWithinOrg}@${organization.value}.example.com`,
      phone: `+91 ${baseNumber}`,

      // 🔹 Core Fields
      organizationId: organization.value,
      organization: organization.label,
      role: i % 5 === 0 ? "Admin" : "Member",
      status: i % 2 === 0 ? "Active" : "Inactive",

      // 🔹 Bucket Categorization
      department: departments[i % departments.length],
      planType: plans[i % plans.length],
      tier: tiers[i % tiers.length],
      region: regions[i % regions.length],

      // 🔹 Business Metrics
      accountValue: 5000 + i * 250,
      isVerified: i % 3 === 0,
      source: sources[i % sources.length],
      riskLevel: riskLevels[i % riskLevels.length],

      createdAt: createdDate.toISOString(),
      lastLogin: lastLoginDate.toISOString(),
    };
  },
);

export function getUserById(id: string) {
  return userData.find((u) => u.id === Number(id)) ?? null;
}
