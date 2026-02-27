"use client";

interface Props {
  type?: "grid" | "gridCompact" | "gridDetailed" | "gridMinimal";
  data: any[];
  fields?: string[];
}

export default function GridEngine({
  type = "grid",
  data,
  fields = [],
}: Props) {
  const gridLayout = {
    grid: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    gridCompact: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    gridDetailed: "grid-cols-1 md:grid-cols-2",
    gridMinimal: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${gridLayout[type]}`}>
      {data.map((item, index) => (
        <div
          key={index}
          className="p-6 border border-border rounded-2xl bg-background hover:shadow-md transition"
        >
          {type === "gridMinimal" ? (
            <div className="text-center">
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </div>
          ) : (
            fields.map((field) => (
              <div key={field} className="mb-3">
                <p className="text-xs text-muted-foreground capitalize">
                  {field}
                </p>
                <p className="text-sm font-medium">{item[field]}</p>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
