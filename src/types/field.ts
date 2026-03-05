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

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;

  required?: boolean;
  placeholder?: string;

  options?: FieldOption[];

  multiple?: boolean;

  accept?: string; // file types

  defaultValue?: any;
}
