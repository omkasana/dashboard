import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiBriefcase,
  FiClipboard,
  FiLayers,
  FiBarChart2,
  FiSettings,
  FiShield,
  FiMail,
  FiCreditCard,
  FiActivity,
} from "react-icons/fi";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    sub: "Overview and analytics",
    icon: FiGrid,
  },

  {
    label: "Candidates",
    href: "/dashboard/candidate",
    sub: "Manage candidate profiles",
    icon: FiUsers,
  },

  {
    label: "Assessments",
    href: "/dashboard/assessments",
    sub: "Create and manage tests",
    icon: FiClipboard,
  },

  {
    label: "Question Bank",
    href: "/dashboard/question-bank",
    sub: "Manage questions and categories",
    icon: FiFileText,
  },

  {
    label: "Job Positions",
    href: "/dashboard/job-positions",
    sub: "Manage hiring positions",
    icon: FiBriefcase,
  },
  {
    label: "Proctoring",
    href: "/dashboard/proctoring",
    sub: "Manage proctoring sessions",
    icon: FiShield,
  },

  {
    label: "Hiring Campaigns",
    href: "/dashboard/hiring-campaigns",
    sub: "Manage recruitment drives",
    icon: FiLayers,
  },

  {
    label: "Reports & Analytics",
    href: "/dashboard/reports",
    sub: "View performance insights",
    icon: FiBarChart2,
  },

  {
    label: "Invitations",
    href: "/dashboard/invitations",
    sub: "Send test invitations",
    icon: FiMail,
  },

  {
    label: "Billing & Plans",
    href: "/dashboard/billing",
    sub: "Manage subscriptions and invoices",
    icon: FiCreditCard,
  },

  {
    label: "Settings",
    href: "/dashboard/settings",
    sub: "Manage company preferences",
    icon: FiSettings,
  },
];
