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
  const outerCols = config.columns ?? 3; // ✅ from config

  const avatarField = config.avatarField ? fieldMap[config.avatarField] : null;
  const titleField = config.titleField ? fieldMap[config.titleField] : null;
  const subtitleField = config.subtitleField
    ? fieldMap[config.subtitleField]
    : null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* ── Profile Header ── */}
      <div
        className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-xl"
        style={{
          background: "color-mix(in srgb, var(--muted) 60%, transparent)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Avatar */}
        {avatarField && (
          <div
            className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden"
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
        <div className="flex-1 min-w-0 w-full">
          {titleField && (
            <h2
              className="text-lg sm:text-xl font-semibold"
              style={{
                color: "var(--foreground)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {String(data[titleField.key] ?? "")}
            </h2>
          )}
          {subtitleField && (
            <p
              className="text-sm mt-0.5"
              style={{
                color: "var(--muted-foreground)",
                overflowWrap: "break-word",
                wordBreak: "break-all",
              }}
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

      {/* ── Sections Grid ── */}
      {/*
        Responsive strategy:
        - mobile:  always 1 column, colSpan ignored
        - sm:      min(outerCols, 2) columns
        - lg+:     outerCols from config, colSpan applied
      */}
      <div
        className="grid gap-3 md:gap-4"
        style={{
          // mobile: 1 col always
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
        }}
      >
        {/* Responsive override via a style tag scoped to this instance */}
        <style>{`
          @media (min-width: 640px) {
            .profile-sections-grid {
              grid-template-columns: repeat(${Math.min(outerCols, 2)}, minmax(0, 1fr));
            }
          }
          @media (min-width: 1024px) {
            .profile-sections-grid {
              grid-template-columns: repeat(${outerCols}, minmax(0, 1fr));
            }
          }
        `}</style>

        {/* Re-render with className so style tag above applies */}
        <div
          className="profile-sections-grid contents"
          style={{ display: "contents" }}
        />

        {config.sections.map((section) => {
          const colSpan = section.colSpan ?? 1;
          const innerCols = section.columns ?? 2;

          return (
            <div
              key={section.id}
              className="min-w-0"
              style={{
                ...sectionCardStyle,
                // mobile: full width, sm+: respect colSpan
                gridColumn: "span 1",
              }}
            >
              <h3 style={sectionHeaderStyle}>{section.title}</h3>

              {section.description && (
                <p
                  className="text-xs mb-3"
                  style={{
                    color: "var(--muted-foreground)",
                    overflowWrap: "break-word",
                  }}
                >
                  {section.description}
                </p>
              )}

              {/* ✅ Fields grid — 1 col mobile, innerCols from config on sm+ */}
              <div
                className="grid gap-x-4 gap-y-4"
                style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}
              >
                <style>{`
                  @media (min-width: 640px) {
                    .section-fields-${section.id} {
                      grid-template-columns: repeat(${innerCols}, minmax(0, 1fr));
                    }
                  }
                `}</style>

                <div
                  className={`section-fields-${section.id} contents`}
                  style={{ display: "contents" }}
                />

                {section.fields.map((key) => {
                  const field = fieldMap[key];
                  if (!field) return null;
                  const fieldSpan = field.span ?? 1;

                  return (
                    <div
                      key={key}
                      className="min-w-0"
                      style={{
                        // ✅ field.span from config
                        gridColumn: `span ${fieldSpan}`,
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        minWidth: 0,
                      }}
                    >
                      <p style={fieldLabelStyle}>{field.label}</p>
                      <FieldRenderer field={field} value={data[key]} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
