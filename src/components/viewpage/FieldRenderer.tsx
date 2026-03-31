import { ViewField } from "@/types/module";
import Image from "next/image";

interface FieldRendererProps {
  field: ViewField;
  value: unknown;
}

const colorVarMap: Record<string, string> = {
  green: "var(--brand-success)",
  red: "var(--brand-danger)",
  yellow: "var(--brand-warning)",
  blue: "var(--brand-info)",
  purple: "var(--primary)",
  gray: "var(--brand-neutral)",
};

function getBadgeStyles(value: string, badgeColors?: Record<string, string>) {
  const colorKey = badgeColors?.[value] ?? "gray";
  const color = colorVarMap[colorKey] ?? colorVarMap.gray;
  return {
    color,
    background: `color-mix(in srgb, ${color} 12%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
  };
}

const pillBase =
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium";

export function FieldRenderer({ field, value }: FieldRendererProps) {
  if (value === null || value === undefined || value === "") {
    return (
      <span
        className="text-sm italic"
        style={{ color: "var(--muted-foreground)" }}
      >
        —
      </span>
    );
  }

  switch (field.type) {
    case "avatar":
      return (
        <div
          className="relative w-12 h-12 rounded-full overflow-hidden shrink-0"
          style={{
            border: "2px solid var(--border)",
            background: "var(--muted)",
          }}
        >
          <Image
            src={String(value)}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
      );

    case "image":
      return (
        <div
          className="relative w-full aspect-video rounded-lg overflow-hidden"
          style={{
            border: "1px solid var(--border)",
            background: "var(--muted)",
          }}
        >
          <Image
            src={String(value)}
            alt={field.label}
            fill
            className="object-cover"
          />
        </div>
      );

    case "status":
      return (
        <span
          className={pillBase}
          style={getBadgeStyles(String(value), field.badgeColors)}
        >
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{
              background:
                colorVarMap[field.badgeColors?.[String(value)] ?? "gray"],
            }}
          />
          {String(value)}
        </span>
      );

    case "badge":
      return (
        <span
          className={pillBase}
          style={getBadgeStyles(String(value), field.badgeColors)}
        >
          {String(value)}
        </span>
      );

    case "tags":
    case "multiselect":
      return (
        <div className="flex flex-wrap gap-1.5">
          {(Array.isArray(value) ? value : String(value).split(",")).map(
            (tag, i) => (
              <span
                key={i}
                className={pillBase}
                style={{
                  color: "var(--muted-foreground)",
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {String(tag).trim()}
              </span>
            ),
          )}
        </div>
      );

    case "currency":
      return (
        <span
          className="text-sm font-semibold tabular-nums"
          style={{ color: "var(--foreground)" }}
        >
          {field.prefix ?? ""}
          {Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          {field.suffix ?? ""}
        </span>
      );

    case "date":
      return (
        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          {new Date(String(value)).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );

    case "datetime":
      return (
        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          {new Date(String(value)).toLocaleString("en-US")}
        </span>
      );

    case "array":
      const items = Array.isArray(value) ? value : [];

      return (
        <div className="flex flex-col">
          {items.length > 0 ? (
            items.map((item: any, index: number) => {
              const titleKey = field.item?.titleField;
              const typeKey = field.item?.typeField;
              const metaFields = field.item?.metaFields || [];

              return (
                <div
                  key={index}
                  className="
                group flex items-center justify-between
                px-4 py-3
                border-b border-white/6
                hover:bg-white/3
                transition
              "
                >
                  {/* LEFT */}
                  <div className="flex flex-col gap-1">
                    {/* TITLE */}
                    {titleKey && (
                      <span className="text-sm font-medium text-white">
                        {String(item[titleKey] ?? "")}
                      </span>
                    )}

                    {/* META */}
                    <div className="flex flex-wrap gap-2 text-xs text-white/50">
                      {metaFields.map((meta: any) => {
                        const val = item[meta.key];

                        if (val === undefined || val === null || val === false)
                          return null;

                        // Boolean meta (badge)
                        if (meta.type === "boolean") {
                          return (
                            <span key={meta.key} className="text-red-400">
                              {meta.label}
                            </span>
                          );
                        }

                        // Text meta
                        return (
                          <span key={meta.key}>
                            {meta.prefix ? `${meta.prefix} ` : ""}
                            {String(val)}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* RIGHT TYPE */}
                  {typeKey && item[typeKey] && (
                    <div className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {item[typeKey]}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-sm text-white/40 px-4 py-3">No items</div>
          )}
        </div>
      );
    case "boolean":
      return (
        <span
          className={pillBase}
          style={
            value
              ? {
                  color: "var(--brand-success)",
                  background:
                    "color-mix(in srgb, var(--brand-success) 12%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--brand-success) 25%, transparent)",
                }
              : {
                  color: "var(--brand-neutral)",
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                }
          }
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: value
                ? "var(--brand-success)"
                : "var(--brand-neutral)",
            }}
          />
          {value ? "Yes" : "No"}
        </span>
      );

    case "email":
      return (
        <a
          href={`mailto:${value}`}
          className="text-sm hover:underline transition-colors"
          style={{ color: "var(--brand-info)" }}
        >
          {String(value)}
        </a>
      );

    case "url":
      return (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline transition-colors"
          style={{ color: "var(--brand-info)" }}
        >
          {String(value)}
        </a>
      );

    case "phone":
      return (
        <a
          href={`tel:${value}`}
          className="text-sm"
          style={{ color: "var(--foreground)" }}
        >
          {String(value)}
        </a>
      );

    case "number":
    case "decimal":
      return (
        <span
          className="text-sm tabular-nums"
          style={{ color: "var(--foreground)" }}
        >
          {field.prefix ?? ""}
          {Number(value).toLocaleString("en-US")}
          {field.suffix ?? ""}
        </span>
      );

    case "file":
      return (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
          style={{ color: "var(--brand-info)" }}
        >
          📎 Download
        </a>
      );

    default:
      return (
        <span className="text-sm" style={{ color: "var(--foreground)" }}>
          {String(value)}
        </span>
      );
  }
}
