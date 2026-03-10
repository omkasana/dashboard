import FieldRenderer from "../FieldRenderer";

export default function GridLayout({ layout, data }: any) {
  return (
    <div className={`grid gap-6 md:grid-cols-${layout.columns}`}>
      {layout.sections.map((section: any) => (
        <div
          key={section.id}
          className={`col-span-${section.colSpan} bg-white/5 p-5 rounded-xl border border-white/10`}
        >
          {section.title && (
            <h3 className="mb-4 font-semibold">{section.title}</h3>
          )}

          <div className="grid md:grid-cols-3 gap-4">
            {section.fields.map((field: string) => (
              <FieldRenderer key={field} field={field} data={data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
