import type { ViewConfig } from "@/types/module";

export const usersViewConfig: ViewConfig = {
  defaultLayout: "profile",

  layouts: {
    profile: {
      type: "grid",
      columns: 3,
      sections: [
        {
          id: "profile",
          title: "Profile",
          colSpan: 3,
          fields: ["name", "email", "phone"],
        },
        {
          id: "organization",
          title: "Organization",
          colSpan: 2,
          fields: ["role", "department", "region"],
        },
        {
          id: "account",
          title: "Account",
          colSpan: 1,
          fields: ["status", "riskLevel", "tier"],
        },
      ],
    },

    cards: {
      type: "cards",
      fields: ["name", "email", "phone", "role", "status", "accountValue"],
    },

    sidebar: {
      type: "sidebar",
      main: ["name", "email", "phone"],
      side: ["role", "department", "region", "status"],
    },

    compact: {
      type: "compact",
      fields: ["name", "email", "role", "status"],
    },
  },
};
