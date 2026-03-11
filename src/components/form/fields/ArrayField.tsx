import { useState } from "react";
import FieldRenderer from "../FieldRenderer";
import { FormField } from "@/types/module";

interface ArrayFieldProps {
  field: any;
  value?: any[];
  onChange: (name: string, value: any[]) => void;
}

export default function ArrayField({ field, value = [], onChange }: ArrayFieldProps) {

  const addItem = () => {
    const newArray = [...value, {}];
    onChange(field.name, newArray);
  };

  const removeItem = (index:any) => {
    const newArray = value.filter((_, i) => i !== index);
    onChange(field.name, newArray);
  };

  const updateItem = (index: number, childName: string, childValue: any) => {

    const newArray = [...value];

    newArray[index] = {
      ...newArray[index],
      [childName]: childValue
    };

    onChange(field.name, newArray);
  };

  return (
    <div className="flex flex-col gap-4">

      {value?.map((item, index) => (
        <div key={index} className="border p-4 rounded-xl">

          {field.fields.map((child: FormField) => (
            <FieldRenderer
              key={child.name}
              field={child}
              value={item?.[child.name]}
              onChange={(name, val) =>
                updateItem(index, name, val)
              }
            />
          ))}

          <button type="button" onClick={() => removeItem(index)}>
            Remove
          </button>

        </div>
      ))}

      <button type="button" onClick={addItem}>
        Add {field.label}
      </button>

    </div>
  );
}