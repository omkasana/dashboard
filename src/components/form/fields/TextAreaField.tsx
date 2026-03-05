import { formControlStyle } from "@/lib/formStyle";
import { FormField } from "@/types/module";

export default function TextAreaField({ field }: { field: FormField }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <textarea
        name={field.name}
        rows={4}
        style={{
          ...formControlStyle,
          height: "auto",
          padding: "10px 12px",
        }}
      />
    </div>
  );
}
