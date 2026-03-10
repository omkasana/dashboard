import { ViewConfig } from "@/types/module";

export const usersViewConfig: ViewConfig = {
  defaultLayout: "profile",

  fields: [
    { key: "avatar", label: "Avatar", type: "avatar" },
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone", type: "phone" },
    {
      key: "role",
      label: "Role",
      type: "badge",
      badgeColors: { Admin: "purple", Member: "blue", Guest: "gray" },
    },
    { key: "department", label: "Department", type: "text" },
    { key: "region", label: "Region", type: "text" },
    {
      key: "status",
      label: "Status",
      type: "status",
      badgeColors: { Active: "green", Inactive: "red", pending: "yellow" },
    },
    {
      key: "riskLevel",
      label: "Risk Level",
      type: "badge",
      badgeColors: { Low: "green", Medium: "yellow", High: "red" },
    },
    {
      key: "tier",
      label: "Tier",
      type: "badge",
      badgeColors: {
        Bronze: "gray",
        Silver: "blue",
        Gold: "yellow",
        Platinum: "purple",
      },
    },
    { key: "createdAt", label: "Joined", type: "date" },
    { key: "lastLogin", label: "Last Login", type: "date" },
    {
      key: "accountValue",
      label: "Account Value",
      type: "currency",
      prefix: "$",
    },
    { key: "isVerified", label: "Verified", type: "boolean" },
    {
      key: "source",
      label: "Source",
      type: "badge",
      badgeColors: {
        Organic: "green",
        Referral: "blue",
        Ads: "yellow",
        Direct: "purple",
      },
    },
    {
      key: "planType",
      label: "Plan",
      type: "badge",
      badgeColors: {
        Free: "gray",
        Starter: "blue",
        Pro: "purple",
        Enterprise: "green",
      },
    },
  ],

  layouts: {
    // ─── Profile Layout ───────────────────────────────────────────

    profile: {
      type: "profile",
      columns: 3,
      avatarField: "avatar",
      titleField: "name",
      subtitleField: "email",
      badgeFields: ["role", "status", "tier"],

      sections: [
        {
          id: "contact",
          title: "Contact",
          colSpan: 2,
          columns: 2,
          fields: ["email", "phone", "region", "source"],
        },
        {
          id: "account",
          title: "Account",
          colSpan: 1,
          columns: 1,
          fields: ["status", "planType", "tier", "isVerified"],
        },
      ],
    },
  },
};
