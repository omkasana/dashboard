import type { ModuleConfig } from "@/types/module";

export const chatConfig: ModuleConfig = {
  id: "chat",
  title: "Chat",
  description: "Chat module",

  actions: {
    add: true,
    import: true,
    export: true,
  },

  search: {
    enabled: true,
  },

  views: {
    enabled: true,
    defaultView: "table",
    available: ["table"],
  },

  table: {
    enabled: true,
    columns: [],
  },
};
