import { CompactLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";

interface CompactLayoutProps {
  config: CompactLayoutConfig;
  viewConfig: ViewConfig;
  data: Record<string, unknown>;
}

export function CompactLayout({
  config,
  viewConfig,
  data,
}: CompactLayoutProps) {
  const fieldMap = Object.fromEntries(viewConfig.fields.map((f) => [f.key, f]));
  const cols = config.columns ?? 1;
  const fields = config.fields.map((key) => fieldMap[key]).filter(Boolean);

  // Split into column groups if 2-col
  const rows =
    cols === 2
      ? Array.from({ length: Math.ceil(fields.length / 2) }, (_, i) =>
          fields.slice(i * 2, i * 2 + 2),
        )
      : fields.map((f) => [f]);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.75rem",
        overflow: "hidden",
        background: "color-mix(in srgb, var(--muted) 60%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{
            borderBottom:
              rowIndex !== rows.length - 1 ? "1px solid var(--border)" : "none",
          }}
        >
          {row.map((field, colIndex) => (
            <div
              key={field!.key}
              className="flex items-center justify-between gap-4 px-5 py-3.5 flex-1 transition-colors"
              style={{
                borderLeft:
                  cols === 2 && colIndex === 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in srgb, var(--muted) 90%, transparent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                className="text-sm shrink-0 w-32"
                style={{ color: "var(--muted-foreground)" }}
              >
                {field!.label}
              </span>
              <div className="flex-1 flex justify-end">
                <FieldRenderer field={field!} value={data[field!.key]} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
