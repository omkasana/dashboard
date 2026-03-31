import FieldRenderer from "../FieldRenderer";

export default function ObjectField({ field, value = {}, onChange }: { field: any; value?: any; onChange: (name: string, value: any) => void }) {

  const handleChange = (childName: any, childValue: any) => {
    onChange(field.name, {
      ...value,
      [childName]: childValue
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {field.fields.map((child:any) => (
        <FieldRenderer
          key={child.name}
          field={child}
          value={value?.[child.name]}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}