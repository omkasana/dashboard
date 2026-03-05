"use client";

import Select from "react-select";

export default function SelectField({ field }: any) {
  const isMulti = field.type === "multiselect";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{field.label}</label>

      <Select
        options={field.options}
        isMulti={isMulti}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
