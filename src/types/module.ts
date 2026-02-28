export type ViewType =
  | "table"
  | "list"
  | "grid"
  | "kanban"
  | "calendar"
  | "timeline"
  | "analytics"
  | "map"
  | "gallery";

export interface TableColumn {
  key: string;
  label: string;
}

export interface FilterField {
  key: string;
  label: string;
  options: string[];
}

export interface ModuleConfig {
  id: string;
  title: string;
  description?: string;

  actions?: {
    add?: boolean;
    import?: boolean;
    export?: boolean;
  };

  search?: {
    enabled: boolean;
    placeholder?: string;
  };

  filters?: {
    enabled: boolean;
    fields: FilterField[];
  };

  views?: {
    enabled: boolean;
    defaultView: ViewType;
    available: ViewType[];
  };

  table?: {
    enabled: boolean;
    columns: TableColumn[];
  };

  grid?: {
    enabled: boolean;
    type: "card" | "compact" | "minimal";
    fields: string[];
  };

  data?: any[]; // optional dynamic data source
}
