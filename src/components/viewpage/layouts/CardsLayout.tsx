import { CardsLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";
import { fieldLabelStyle } from "../styles";

interface CardsLayoutProps {
  config: CardsLayoutConfig;
  viewConfig: ViewConfig;
  data: Record<string, unknown>;
}

export function CardsLayout({ config, viewConfig, data }: CardsLayoutProps) {
  const fieldMap = Object.fromEntries(viewConfig.fields.map((f) => [f.key, f]));
  const cols = config.columns ?? 3;

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {config.fields.map((key) => {
        const field = fieldMap[key];
        if (!field) return null;

        return (
          <div
            key={key}
            className="flex flex-col gap-2 p-4 rounded-xl transition-colors"
            style={{
              background: "color-mix(in srgb, var(--muted) 60%, transparent)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p style={fieldLabelStyle}>{field.label}</p>
            <div className="mt-auto">
              <FieldRenderer field={field} value={data[key]} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
