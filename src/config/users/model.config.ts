import type { ModuleConfig } from "@/types/module";

export const modelsConfig: ModuleConfig = {
  id: "models",
  title: "Models",
  description: "Define database tables and schema",

  actions: {
    add: true,
    import: false,
    export: false,
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
      { key: "fieldsCount", label: "Fields", type: "number" },
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
            span: 1,
            minItems: 1,

            fields: [
              {
                name: "name",
                label: "Field Name",
                type: "text",
                required: true,
              },
              {
                name: "type",
                label: "Field Type",
                type: "select",
                required: true,

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
                type: "boolean",
              },

              {
                name: "unique",
                label: "Unique",
                type: "boolean",
              },

              {
                name: "defaultValue",
                label: "Default Value",
                type: "text",
              },

              {
                name: "relation",
                label: "Relation Model",
                type: "text",
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
