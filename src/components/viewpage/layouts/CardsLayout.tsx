import FieldRenderer from "../FieldRenderer";

export default function CardsLayout({ layout, data }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {layout.fields.map((field: string) => (
        <div
          key={field}
          className="p-4 rounded-lg border border-white/10 bg-white/5"
        >
          <FieldRenderer field={field} data={data} />
        </div>
      ))}
    </div>
  );
}
