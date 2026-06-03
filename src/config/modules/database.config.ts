import type { ModuleConfig } from "@/types/module";

export const databaseConfig: ModuleConfig = {
  id: "database",
  title: "Database",
  description: "Manage database connections, storage, and configurations",

  // ================= VIEW (DETAIL PAGE)
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "name", label: "Database Name", type: "text" },
      { key: "type", label: "Database Type", type: "badge" },

      { key: "host", label: "Host", type: "text" },
      { key: "port", label: "Port", type: "number" },

      { key: "database", label: "Database", type: "text" },
      { key: "username", label: "Username", type: "text" },

      { key: "status", label: "Connection Status", type: "badge" },
      { key: "environment", label: "Environment", type: "badge" },

      { key: "ssl", label: "SSL Enabled", type: "badge" },

      { key: "createdAt", label: "Created At", type: "date" },
      { key: "updatedAt", label: "Updated At", type: "date" },
      { key: "lastBackup", label: "Last Backup", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "1rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        titleField: "name",
        subtitleField: "database",
        badgeFields: ["type", "status"],

        sections: [
          {
            id: "connection",
            title: "Connection Details",
            colSpan: 2,
            columns: 2,
            fields: ["name", "type", "host", "port", "database", "username"],
          },

          {
            id: "environment",
            title: "Environment",
            colSpan: 1,
            columns: 1,
            fields: ["environment", "status", "ssl"],
          },

          {
            id: "meta",
            title: "Metadata",
            colSpan: 3,
            columns: 3,
            fields: ["createdAt", "updatedAt", "lastBackup"],
          },
        ],
      },
    },
  },

  // ================= ACTIONS
  actions: {
    add: true,
    export: true,
    import: true,

    viewRoute: "/dashboard/database/view/:id",
    editRoute: "/dashboard/database/update/:id",
    deleteEndpoint: "/database/:id",
  },

  // ================= SEARCH
  search: {
    enabled: true,
    placeholder: "Search database connections...",
  },

  // ================= VIEWS
  views: {
    enabled: true,
    defaultView: "table",
    available: [
      "table",
      "grid",
      "calendar",
      "timeline",
      "analytics",
      "map",
      "gallery",
    ],
  },

  // ================= TABLE (LIST PAGE)
  table: {
    enabled: true,

    columns: [
      {
        key: "name",
        label: "Database",
        type: "text",
        strong: true,
      },
      { key: "type", label: "Type", type: "badge" },
      { key: "host", label: "Host", type: "text" },
      { key: "database", label: "Database", type: "text" },
      { key: "environment", label: "Environment", type: "badge" },
      { key: "status", label: "Status", type: "badge" },
      { key: "lastBackup", label: "Last Backup", type: "date" },
    ],
  },

  // ================= FORM
  form: {
    add: [
      {
        id: "connection",
        title: "Connection Details",
        fields: [
          {
            name: "name",
            label: "Database Name",
            type: "text",
            required: true,
          },
          {
            name: "type",
            label: "Database Type",
            type: "select",
            options: [
              { label: "PostgreSQL", value: "postgresql" },
              { label: "MySQL", value: "mysql" },
              { label: "MongoDB", value: "mongodb" },
              { label: "SQLite", value: "sqlite" },
            ],
          },
          {
            name: "host",
            label: "Host",
            type: "text",
            required: true,
          },
          {
            name: "port",
            label: "Port",
            type: "number",
            required: true,
          },
          {
            name: "database",
            label: "Database Name",
            type: "text",
            required: true,
          },
          {
            name: "username",
            label: "Username",
            type: "text",
            required: true,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
          },
        ],
      },

      {
        id: "settings",
        title: "Connection Settings",
        fields: [
          {
            name: "environment",
            label: "Environment",
            type: "select",
            options: [
              { label: "Development", value: "development" },
              { label: "Staging", value: "staging" },
              { label: "Production", value: "production" },
            ],
          },
          {
            name: "status",
            label: "Connection Status",
            type: "select",
            options: [
              { label: "Connected", value: "connected" },
              { label: "Disconnected", value: "disconnected" },
              { label: "Failed", value: "failed" },
            ],
          },
          {
            name: "ssl",
            label: "Enable SSL",
            type: "checkbox",
          },
          {
            name: "backupEnabled",
            label: "Enable Backups",
            type: "checkbox",
          },
          {
            name: "backupFrequency",
            label: "Backup Frequency",
            type: "select",
            options: [
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" },
            ],
          },
        ],
      },
    ],

    edit: [],
  },
};
