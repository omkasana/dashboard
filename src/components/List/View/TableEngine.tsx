"use client";

import ActionMenu from "../ActionMenu";

interface Props {
  columns: { key: string; label: string }[];
  data: any[];
  density: "comfortable" | "compact";
  moduleId: string;
}

export default function TableEngine({
  columns,
  data,
  density,
  moduleId,
}: Props) {
  const padding = density === "compact" ? "py-2" : "py-4";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left font-medium">
                {col.label}
              </th>
            ))}
            <th className="px-4" />
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr
              key={row.id} // ✅ use real id
              className="hover:bg-muted/30 transition"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 ${padding} whitespace-nowrap`}
                >
                  {row[col.key]}
                </td>
              ))}

              <td className="px-4">
                <ActionMenu
                  id={row.id} // ✅ fixed
                  moduleId={moduleId}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
