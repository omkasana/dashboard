import FieldRenderer from "../FieldRenderer";

export default function SidebarLayout({ layout, data }: any) {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
      <div className="space-y-4">
        {layout.main.map((field: string) => (
          <FieldRenderer key={field} field={field} data={data} />
        ))}
      </div>

      <div className="space-y-4">
        {layout.side.map((field: string) => (
          <FieldRenderer key={field} field={field} data={data} />
        ))}
      </div>
    </div>
  );
}
