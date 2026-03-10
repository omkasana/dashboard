import ViewField from "../ViewField";
import { glassCard } from "@/lib/glass";

export default function CardLayout({ layout, data }: any) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {layout.fields.map((field: string) => (
        <div key={field} className={glassCard()}>
          <ViewField field={field} data={data} />
        </div>
      ))}
    </div>
  );
}
