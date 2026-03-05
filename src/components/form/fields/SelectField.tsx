import { formControlStyle } from "@/lib/formStyle";
import { FormField } from "@/types/module";

export default function SelectField({ field }: { field: FormField }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <select name={field.name} style={formControlStyle}>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
