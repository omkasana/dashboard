import { GridLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";
import {
  sectionCardStyle,
  sectionHeaderStyle,
  fieldLabelStyle,
} from "../styles";

interface GridLayoutProps {
  config: GridLayoutConfig;
  viewConfig: ViewConfig;
  data: Record<string, unknown>;
}

export function GridLayout({ config, viewConfig, data }: GridLayoutProps) {
  const fieldMap = Object.fromEntries(viewConfig.fields.map((f) => [f.key, f]));

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
      }}
    >
      {config.sections.map((section) => (
        <div
          key={section.id}
          style={{
            ...sectionCardStyle,
            gridColumn: `span ${section.colSpan ?? 1}`,
          }}
        >
          <h3 style={sectionHeaderStyle}>{section.title}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {section.fields.map((key) => {
              const field = fieldMap[key];
              if (!field) return null;
              const value = data[key];

              if (field.type === "avatar") {
                return (
                  <div
                    key={key}
                    className="col-span-full flex items-center gap-4 mb-2"
                  >
                    <FieldRenderer field={field} value={value} />
                    <div>
                      <p
                        className="text-base font-semibold"
                        style={{ color: "var(--fg)" }}
                      >
                        {String(data["name"] ?? "")}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--muted-fg)" }}
                      >
                        {String(data["email"] ?? "")}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div key={key}>
                  <p style={fieldLabelStyle}>{field.label}</p>
                  <FieldRenderer field={field} value={value} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
