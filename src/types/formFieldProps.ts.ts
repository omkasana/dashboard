import { FormField } from "@/types/module";

export interface FieldComponentProps {
  field: FormField;
  error?: string;
  value?: any;
  onChange?: (name: string, value: any) => void;
}
