"use client";

import ActionMenu from "./action-menu";

interface Props {
  columns: { key: string; label: string }[];
  data: any[];
  density: "comfortable" | "compact";
}

export default function TableEngine({ columns, data, density }: Props) {
  const padding = density === "compact" ? "py-2" : "py-4";

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="border-b border-border">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left">
                {col.label}
              </th>
            ))}
            <th className="px-4" />
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-muted/30">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-6 ${padding} whitespace-nowrap`}
                >
                  {row[col.key]}
                </td>
              ))}
              <td className="px-4">
                <ActionMenu />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
