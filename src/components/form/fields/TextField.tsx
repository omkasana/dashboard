import { inputClass } from "@/lib/inputStyle";
import FieldWrapper from "../FieldWrapper";
import { glassInput } from "@/lib/formStyle";

export default function TextField({ field }: any) {
  return (
    <FieldWrapper label={field.label}>
      <input
        type="text"
        placeholder={field.placeholder}
        className={inputClass}
        style={glassInput}
      />
    </FieldWrapper>
  );
}
