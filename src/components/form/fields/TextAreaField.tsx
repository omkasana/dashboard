import { glassInput } from "@/lib/formStyle";
import { inputClass } from "@/lib/inputStyle";
import { FormField } from "@/types/module";
import FieldWrapper from "../FieldWrapper";

export default function TextAreaField({ field }: { field: FormField }) {
  return (
    <FieldWrapper label={field.label}>
      <textarea
        name={field.name}
        rows={4}
        placeholder={field.placeholder}
        className={inputClass}
        style={{
          ...glassInput,
          height: "auto",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      />
    </FieldWrapper>
  );
}
