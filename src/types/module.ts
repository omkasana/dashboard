/* =========================================================
   VIEW TYPES
========================================================= */

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

/* =========================================================
   TABLE
========================================================= */

export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "badge"
  | "status"
  | "risk"
  | "plan"
  | "currency";

export interface TableColumn {
  key: string;
  label: string;
  type: ColumnType;
  strong?: boolean;

  variant?:
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

/* =========================================================
   FILTERS
========================================================= */

export interface FilterField {
  key: string;
  label: string;
  options: string[];
}

/* =========================================================
   GRID VIEW (PREMIUM STRUCTURED)
========================================================= */

export interface GridLayout {
  header: {
    title: string;
    subtitle?: string;
    badge?: string;
  };

  meta?: string[];
  stats?: string[];
  footer?: string[];
}

export interface GridConfig {
  enabled: boolean;

  type?: "card" | "compact" | "minimal";

  layout: GridLayout;

  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

/* =========================================================
   KANBAN VIEW (STRUCTURED)
========================================================= */

export interface KanbanColumn {
  key: string;
  label: string;
  color?: "success" | "warning" | "danger" | "info" | "neutral";
}

export interface KanbanCardLayout {
  title: string;
  subtitle?: string;
  meta?: string[];
  highlight?: string;
  badge?: string;
}

export interface KanbanConfig {
  enabled: boolean;

  groupBy: string;

  columns: KanbanColumn[];

  card: KanbanCardLayout;
}

/* =========================================================
   MODULE CONFIG
========================================================= */

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

  grid?: GridConfig;

  kanban?: KanbanConfig;

  data?: any[]; // replace with generic later if needed
}