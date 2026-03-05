import FieldWrapper from "../FieldWrapper";
import { inputClass } from "@/lib/inputStyle";
import { formControlStyle, glassInput } from "@/lib/formStyle";

export default function SelectField({ field }: any) {
  return (
    <FieldWrapper label={field.label}>
      <select name={field.name} className={inputClass} style={glassInput}>
        {field.options?.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
