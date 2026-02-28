"use client";

import ActionMenu from "../ActionMenu";

interface Props {
  data: any[];
  density: "comfortable" | "compact";
  moduleId: string;
}

export default function KanbanEngine({ data, density, moduleId }: Props) {
  const padding = density === "compact" ? "p-3" : "p-4";
  const statuses = ["Active", "Inactive"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {statuses.map((status) => (
        <div key={status} className="bg-muted/30 p-4 rounded-xl">
          <h3 className="font-semibold mb-4">{status}</h3>

          <div className="space-y-4">
            {data
              .filter((item) => item.status === status)
              .map((item, i) => (
                <div
                  key={i}
                  className={`${padding} bg-background border border-border rounded-lg shadow-sm`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                    <ActionMenu id={item.id} moduleId={moduleId} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
