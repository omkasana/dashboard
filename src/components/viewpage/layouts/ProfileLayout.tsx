import { ProfileLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";
import {
  sectionCardStyle,
  sectionHeaderStyle,
  fieldLabelStyle,
} from "../styles";

interface ProfileLayoutProps {
  config: ProfileLayoutConfig;
  viewConfig: ViewConfig;
  data: Record<string, unknown>;
}

export function ProfileLayout({
  config,
  viewConfig,
  data,
}: ProfileLayoutProps) {
  const fieldMap = Object.fromEntries(viewConfig.fields.map((f) => [f.key, f]));

  const avatarField = config.avatarField ? fieldMap[config.avatarField] : null;
  const titleField = config.titleField ? fieldMap[config.titleField] : null;
  const subtitleField = config.subtitleField
    ? fieldMap[config.subtitleField]
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Profile Header Card */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-xl"
        style={{
          background: "color-mix(in srgb, var(--muted) 60%, transparent)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Avatar */}
        {avatarField && (
          <div
            className="relative w-20 h-20 rounded-full overflow-hidden shrink-0"
            style={{
              border: "3px solid var(--border)",
              background: "var(--muted)",
            }}
          >
            {data[avatarField.key] ? (
              <img
                src={String(data[avatarField.key])}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-2xl font-bold"
                style={{ color: "var(--muted-foreground)" }}
              >
                {String(
                  data[config.titleField ?? "name"] ?? "?",
                )[0].toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Name + subtitle + badges */}
        <div className="flex-1 min-w-0">
          {titleField && (
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {String(data[titleField.key] ?? "")}
            </h2>
          )}
          {subtitleField && (
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              {String(data[subtitleField.key] ?? "")}
            </p>
          )}
          {config.badgeFields && config.badgeFields.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {config.badgeFields.map((key) => {
                const field = fieldMap[key];
                if (!field) return null;
                return (
                  <FieldRenderer key={key} field={field} value={data[key]} />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sections Grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(3, minmax(0, 1fr))` }}
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
            {section.description && (
              <p
                className="text-xs mb-3"
                style={{ color: "var(--muted-foreground)" }}
              >
                {section.description}
              </p>
            )}
            <div
              className="grid gap-x-6 gap-y-4"
              style={{
                gridTemplateColumns: `repeat(${section.columns ?? 2}, minmax(0, 1fr))`,
              }}
            >
              {section.fields.map((key) => {
                const field = fieldMap[key];
                if (!field) return null;
                return (
                  <div
                    key={key}
                    style={{ gridColumn: `span ${field.span ?? 1}` }}
                  >
                    <p style={fieldLabelStyle}>{field.label}</p>
                    <FieldRenderer field={field} value={data[key]} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
