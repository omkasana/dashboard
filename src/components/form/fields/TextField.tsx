import { formControlStyle } from "@/lib/formStyle";
import { FormField } from "@/types/module";

export default function TextField({ field }: { field: FormField }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <input
        name={field.name}
        type={field.type === "decimal" ? "number" : field.type}
        placeholder={field.placeholder}
        style={formControlStyle}
      />
    </div>
  );
}
