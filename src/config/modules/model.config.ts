import type { ModuleConfig } from "@/types/module";
import { Users } from "lucide-react";

export const modelsConfig: ModuleConfig = {
  id: "models",
  title: "Models",
  description: "Define database tables and schema",
  view: {
    defaultLayout: "profile",

    fields: [
      { key: "name", label: "Model Name", type: "text" },
      { key: "slug", label: "Table Name", type: "text" },
      { key: "description", label: "Description", type: "text" },

      {
        key: "fields",
        label: "Fields",
        type: "array",

        item: {
          titleField: "name", // 🔥 primary
          typeField: "type", // 🔥 badge (right side)

          metaFields: [
            { key: "required", type: "boolean", label: "required" },
            { key: "unique", type: "boolean", label: "unique" },
            { key: "defaultValue", type: "text", prefix: "default:" },
            { key: "relation", type: "text", prefix: "→" },
          ],
        },
      },

      { key: "timestamps", label: "Timestamps", type: "boolean" },
      { key: "softDeletes", label: "Soft Delete", type: "boolean" },

      { key: "createdAt", label: "Created At", type: "date" },
      { key: "updatedAt", label: "Updated At", type: "date" },
    ],

    layouts: {
      profile: {
        type: "profile",

        columns: 3,
        sectionGap: "0.75rem",
        fieldGap: "0.75rem 1.5rem",
        sectionPadding: "1rem",

        mobileBreakpoint: 768,
        fieldBreakpoint: 480,
        maxFieldColsMobile: 2,

        titleField: "name",
        subtitleField: "description",
        badgeFields: ["slug"],

        sections: [
          {
            id: "basic",
            title: "Model Information",
            colSpan: 2,
            columns: 2,
            fields: ["name", "slug", "description"],
          },

          {
            id: "structure",
            title: "Schema Fields",
            colSpan: 3,
            columns: 1,
            fields: ["fields"], // 🔥 important (array renderer)
          },

          {
            id: "options",
            title: "Options",
            colSpan: 1,
            columns: 1,
            fields: ["timestamps", "softDeletes"],
          },

          {
            id: "meta",
            title: "Metadata",
            colSpan: 2,
            columns: 2,
            fields: ["createdAt", "updatedAt"],
          },
        ],
      },
    },
  },

  actions: {
    add: true,
    export: true,
    import: false,
    viewRoute: "/dashboard/models/view/:id",
    editRoute: "/dashboard/models/update/:id",
    deleteEndpoint: "/models/:id",
  },

  search: {
    enabled: true,
    placeholder: "Search models...",
  },

  views: {
    enabled: true,
    defaultView: "table",
    available: ["table"],
  },

  table: {
    enabled: true,
    columns: [
      { key: "name", label: "Model Name", type: "text", strong: true },
      { key: "slug", label: "Table Name", type: "text" },
      { key: "description", label: "Description", type: "text" },
      { key: "fields", label: "Fields", type: "array" },
      { key: "createdAt", label: "Created", type: "date" },
    ],
  },

  /*
  ================================
  FORM (MODEL BUILDER)
  ================================
  */

  form: {
    add: [
      {
        id: "model-basic",
        title: "Model Information",
        columns: 2,

        fields: [
          {
            name: "name",
            label: "Model Name",
            type: "text",
            required: true,
            placeholder: "User",
            info: "Human readable name",
          },
          {
            name: "slug",
            label: "Table Name",
            type: "slug",
            slugFrom: "name",
            required: true,
            placeholder: "users",
            info: "Database table name",
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            span: 2,
          },
        ],
      },

      {
        id: "model-fields",
        title: "Fields",
        columns: 1,

        fields: [
          {
            name: "fields",
            label: "Fields",
            type: "array",
            span: 2,
            minItems: 1,

            fields: [
              {
                name: "name",
                label: "Field Name",
                type: "text",
                span: 1,
                required: true,
              },
              {
                name: "type",
                label: "Field Type",
                type: "select",
                required: true,
                span: 1,

                options: [
                  { label: "Text", value: "text" },
                  { label: "Number", value: "number" },
                  { label: "Decimal", value: "decimal" },
                  { label: "Boolean", value: "boolean" },
                  { label: "Date", value: "date" },
                  { label: "Email", value: "email" },
                  { label: "Password", value: "password" },
                  { label: "JSON", value: "json" },
                  { label: "Relation", value: "relation" },
                ],
              },

              {
                name: "required",
                label: "Required",
                span: 1,
                type: "boolean",
              },

              {
                name: "unique",
                label: "Unique",
                span: 1,
                type: "boolean",
              },

              {
                name: "defaultValue",
                label: "Default Value",
                type: "text",
                span: 1,
              },

              {
                name: "relation",
                label: "Relation Model",
                type: "text",
                span: 1,
                info: "If type is relation, specify target model",
              },
            ],
          },
        ],
      },

      {
        id: "model-options",
        title: "Model Options",
        columns: 2,

        fields: [
          {
            name: "timestamps",
            label: "Enable Timestamps",
            type: "boolean",
            info: "Adds createdAt and updatedAt fields",
          },
          {
            name: "softDeletes",
            label: "Soft Delete",
            type: "boolean",
            info: "Adds deletedAt column",
          },
        ],
      },
    ],
  },
};
