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
      badgeColors: { Active: "green", Inactive: "red", Pending: "yellow" },
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
    profile: {
      type: "profile",

      // ── Tweak these to change layout ──
      columns: 3, // outer cols on desktop
      sectionGap: "0.75rem", // gap between section cards
      fieldGap: "0.75rem 1.5rem", // row-gap col-gap inside sections
      sectionPadding: "1rem", // padding inside each card
      mobileBreakpoint: 768, // px — when outer grid kicks in
      fieldBreakpoint: 480, // px — when inner cols kick in
      maxFieldColsMobile: 2, // max inner cols below mobileBreakpoint
      avatarSize: "64px", // avatar diameter

      avatarField: "avatar",
      titleField: "name",
      subtitleField: "email",
      badgeFields: ["role", "status", "tier"],

      sections: [
        {
          id: "contact",
          title: "Contact Info",
          colSpan: 2, // spans 2 of 3 outer cols
          columns: 3, // 2 fields per row
          fields: [
            "email",
            "phone",
            "region",
            "department",
            "source",
            "riskLevel",
          ],
        },
        {
          id: "account",
          title: "Account",
          colSpan: 1, // spans 1 of 3 outer cols
          columns: 3, // stacked
          fields: ["status", "planType", "tier", "isVerified", "accountValue"],
        },
        {
          id: "activity",
          title: "Activity",
          colSpan: 1,
          columns: 2,
          fields: ["createdAt", "lastLogin"],
        },
        {
          id: "organization",
          title: "Organization",
          colSpan: 2,
          columns: 4,
          fields: ["role", "department", "region", "riskLevel"],
        },
      ],
    },
  },
};
