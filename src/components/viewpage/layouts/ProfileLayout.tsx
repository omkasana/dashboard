import ViewField from "../ViewField";
import { glassCard } from "@/lib/glass";

export default function ProfileLayout({ layout, data }: any) {
  return (
    <div className="space-y-6">
      {layout.sections.map((section: any) => (
        <div key={section.title} className={glassCard()}>
          <h2 className="font-semibold mb-4">{section.title}</h2>

          <div className="grid grid-cols-3 gap-4">
            {section.fields.map((field: string) => (
              <ViewField key={field} field={field} data={data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
