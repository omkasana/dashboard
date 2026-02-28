"use client";

import ActionMenu from "../ActionMenu";

interface Props {
  data: any[];
  density: "comfortable" | "compact";
}

export default function ListEngine({ data, density }: Props) {
  const padding = density === "compact" ? "py-2" : "py-4";

  return (
    <div className="divide-y divide-border">
      {data.map((item, i) => (
        <div
          key={i}
          className={`flex items-center justify-between px-6 ${padding} hover:bg-muted/30`}
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground">{item.role}</span>

            <span
              className={`px-2 py-1 text-xs rounded-full ${
                item.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {item.status}
            </span>

            <ActionMenu />
          </div>
        </div>
      ))}
    </div>
  );
}
