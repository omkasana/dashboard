export type FieldType =
  | "text"
  | "number"
  | "decimal"
  | "email"
  | "phone"
  | "radio"
  | "checkbox"
  | "boolean"
  | "select"
  | "multiselect"
  | "search-select"
  | "tags"
  | "textarea"
  | "editor"
  | "file"
  | "date"
  | "time"
  | "datetime";
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

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FormSection {
  id: string;
  title: string;

  description?: string;

  collapsible?: boolean;
  defaultOpen?: boolean;

  columns?: number;

  fields: FormField[];
}
export interface FormField {
  name: string;
  label: string;
  type: FieldType;

  required?: boolean;
  placeholder?: string;

  options?: FieldOption[];

  multiple?: boolean;

  accept?: string;

  defaultValue?: any;
}

export interface ModuleConfig {
  id: string;
  title: string;
  description?: string;

  actions?: any;

  search?: any;

  filters?: any;

  views?: any;

  table?: any;

  grid?: any;

  kanban?: any;

  calendar?: any;

  /** 🔹 ADD THIS */
  form?: {
    add?: FormSection[];
    edit?: FormSection[];
  };

  data?: any[];
}
