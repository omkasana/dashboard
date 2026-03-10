"use client";

import { ProfileLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";
import { sectionHeaderStyle, fieldLabelStyle } from "../styles";

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

  // ── Config values with defaults ──
  const outerCols = config.columns ?? 3;
  const mobileBreak = config.mobileBreakpoint ?? 768;
  const fieldBreak = config.fieldBreakpoint ?? 480;
  const sectionGap = config.sectionGap ?? "0.75rem";
  const fieldGap = config.fieldGap ?? "0.625rem 1.25rem";
  const sectionPad = config.sectionPadding ?? "1rem";
  const avatarSize = config.avatarSize ?? "64px";
  const mobileColsCap = config.maxFieldColsMobile ?? 2;

  const avatarField = config.avatarField ? fieldMap[config.avatarField] : null;
  const titleField = config.titleField ? fieldMap[config.titleField] : null;
  const subtitleField = config.subtitleField
    ? fieldMap[config.subtitleField]
    : null;

  // Unique ID per layout instance to avoid CSS class collisions
  const uid = config.avatarField ?? "pf";

  return (
    <div className="flex flex-col gap-3">
      {/* ── Scoped styles — 100% config driven ── */}
      <style>{`
        .${uid}-pf-grid {
          display: grid;
          gap: ${sectionGap};
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        @media (min-width: ${mobileBreak}px) {
          .${uid}-pf-grid {
            grid-template-columns: repeat(${outerCols}, minmax(0, 1fr));
          }
        }

        ${config.sections
          .map(
            (s) => `
          .${uid}-pf-section-${s.id} {
            grid-column: span 1;
          }
          @media (min-width: ${mobileBreak}px) {
            .${uid}-pf-section-${s.id} {
              grid-column: span ${Math.min(s.colSpan ?? 1, outerCols)};
            }
          }
          .${uid}-pf-fields-${s.id} {
            display: grid;
            gap: ${fieldGap};
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          @media (min-width: ${fieldBreak}px) {
            .${uid}-pf-fields-${s.id} {
              grid-template-columns: repeat(${Math.min(s.columns ?? 2, mobileColsCap)}, minmax(0, 1fr));
            }
          }
          @media (min-width: ${mobileBreak}px) {
            .${uid}-pf-fields-${s.id} {
              grid-template-columns: repeat(${s.columns ?? 2}, minmax(0, 1fr));
            }
          }
        `,
          )
          .join("")}

        ${viewConfig.fields
          .filter((f) => f.span && f.span > 1)
          .map(
            (f) => `
            @media (min-width: ${fieldBreak}px) {
              .${uid}-pf-field-${f.key} {
                grid-column: span ${f.span};
              }
            }
          `,
          )
          .join("")}
      `}</style>

      {/* ── Profile Header ── */}
      <div
        className="flex flex-col sm:flex-row items-start gap-4 rounded-xl"
        style={{
          background: "color-mix(in srgb, var(--muted) 60%, transparent)",
          border: "1px solid var(--border)",
          padding: sectionPad,
        }}
      >
        {/* Avatar */}
        {avatarField && (
          <div
            className="shrink-0 rounded-full overflow-hidden"
            style={{
              width: avatarSize,
              height: avatarSize,
              minWidth: avatarSize,
              border: "2px solid var(--border)",
              background: "var(--muted)",
            }}
          >
            {data[avatarField.key] ? (
              <img
                src={String(data[avatarField.key])}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: `calc(${avatarSize} * 0.35)`,
                  fontWeight: 700,
                  color: "var(--muted-foreground)",
                }}
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
              className="font-semibold leading-tight"
              style={{
                color: "var(--foreground)",
                fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                overflowWrap: "break-word",
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
                wordBreak: "break-all",
              }}
            >
              {String(data[subtitleField.key] ?? "")}
            </p>
          )}
          {config.badgeFields && config.badgeFields.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
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
      <div className={`${uid}-pf-grid`}>
        {config.sections.map((section) => (
          <div
            key={section.id}
            className={`${uid}-pf-section-${section.id} min-w-0`}
            style={{
              background: "color-mix(in srgb, var(--muted) 60%, transparent)",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              backdropFilter: "blur(12px)",
              padding: sectionPad,
            }}
          >
            {section.title && (
              <h3 style={sectionHeaderStyle}>{section.title}</h3>
            )}
            {section.description && (
              <p
                className="text-xs mb-2"
                style={{
                  color: "var(--muted-foreground)",
                  overflowWrap: "break-word",
                }}
              >
                {section.description}
              </p>
            )}

            <div className={`${uid}-pf-fields-${section.id}`}>
              {section.fields.map((key) => {
                const field = fieldMap[key];
                if (!field) return null;
                return (
                  <div
                    key={key}
                    className={`${uid}-pf-field-${key} min-w-0`}
                    style={{
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
        ))}
      </div>
    </div>
  );
}
