"use client";

import ActionMenu from "../ActionMenu";

interface Props {
  data: any[];
  fields: string[];
  density: "comfortable" | "compact";
  styleType: "card" | "minimal" | "detailed";
  moduleId: string;
}

export default function GridEngine({
  data,
  fields,
  density,
  styleType,
  moduleId,
}: Props) {
  const padding = density === "compact" ? "p-4" : "p-6";

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <div
          key={i}
          className={`${padding} border border-border rounded-2xl bg-background shadow-sm hover:shadow-md transition`}
        >
          <div className="flex justify-between mb-4">
            <p className="font-semibold">{item.name}</p>
            <ActionMenu id={item.id} moduleId={moduleId} />
          </div>

          {styleType !== "minimal" &&
            fields.map((field) => (
              <div key={field} className="mb-3">
                <p className="text-xs text-muted-foreground capitalize">
                  {field}
                </p>
                <p className="text-sm">{item[field]}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
