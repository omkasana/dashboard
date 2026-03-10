import FieldRenderer from "../FieldRenderer";

export default function CompactLayout({ layout, data }: any) {
  return (
    <div className="space-y-2">
      {layout.fields.map((field: string) => (
        <FieldRenderer key={field} field={field} data={data} />
      ))}
    </div>
  );
}
