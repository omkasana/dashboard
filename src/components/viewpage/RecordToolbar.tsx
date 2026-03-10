"use client";

import Link from "next/link";

export default function RecordToolbar({
  config,
  layouts,
  currentLayout,
  onChangeLayout,
  model,
  id,
}: any) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        {config?.search && (
          <input
            placeholder="Search fields..."
            className="px-3 py-2 rounded-md bg-white/10 border border-white/20"
          />
        )}

        {config?.layoutSwitch && (
          <select
            value={currentLayout}
            onChange={(e) => onChangeLayout(e.target.value)}
            className="px-3 py-2 rounded-md bg-white/10 border border-white/20"
          >
            {layouts.map((l: string) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex gap-2">
        {config?.export && (
          <button className="px-3 py-2 bg-blue-600 rounded-md">Export</button>
        )}

        <Link href={`/dashboard/${model}/update/${id}`}>
          <button className="px-3 py-2 bg-orange-500 rounded-md">Edit</button>
        </Link>

        <button className="px-3 py-2 bg-red-600 rounded-md">Delete</button>
      </div>
    </div>
  );
}
