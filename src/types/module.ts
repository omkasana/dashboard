export type ViewType = "table" | "list" | "grid" | "kanban";

export interface TableColumn {
  key: string;
  label: string;
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
    type: string;
    fields: string[];
  };
}
