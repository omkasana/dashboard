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
  const outerCols = config.columns ?? 3;

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

      {/* ── Sections Grid ──
          mobile:  1 col  (ignore colSpan)
          sm:      min(outerCols, 2) cols
          lg+:     outerCols from config, colSpan respected
      ── */}
      <SectionsGrid outerCols={outerCols}>
        {config.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            fieldMap={fieldMap}
            data={data}
            outerCols={outerCols}
          />
        ))}
      </SectionsGrid>
    </div>
  );
}

/* ================================
   SECTIONS GRID WRAPPER
   Uses a ResizeObserver to swap
   inline gridTemplateColumns so it
   works without Tailwind dynamic classes
================================ */
import { useEffect, useRef } from "react";

function SectionsGrid({
  outerCols,
  children,
}: {
  outerCols: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      let cols = 1;
      if (w >= 1024) cols = outerCols;
      else if (w >= 640) cols = Math.min(outerCols, 2);
      else cols = 1;
      el.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [outerCols]);

  return (
    <div
      ref={ref}
      className="grid gap-3 md:gap-4"
      style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}
    >
      {children}
    </div>
  );
}

/* ================================
   SECTION CARD
================================ */
import { ViewSection, ViewField } from "@/types/module";

function SectionCard({
  section,
  fieldMap,
  data,
  outerCols,
}: {
  section: ViewSection;
  fieldMap: Record<string, ViewField>;
  data: Record<string, unknown>;
  outerCols: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const colSpan = section.colSpan ?? 1;
  const innerCols = section.columns ?? 2;

  // Apply colSpan on the card when parent is wide enough
  useEffect(() => {
    const parent = cardRef.current?.parentElement;
    if (!parent) return;

    const update = () => {
      const w = parent.offsetWidth;
      if (!cardRef.current) return;
      if (w >= 1024) {
        cardRef.current.style.gridColumn = `span ${colSpan}`;
      } else {
        cardRef.current.style.gridColumn = "span 1";
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [colSpan]);

  // Apply innerCols on the fields grid responsively
  useEffect(() => {
    const el = fieldsRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      const cols = w >= 480 ? innerCols : 1;
      el.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [innerCols]);

  return (
    <div ref={cardRef} className="min-w-0" style={{ ...sectionCardStyle }}>
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

      {/* Fields grid */}
      <div
        ref={fieldsRef}
        className="grid gap-x-4 gap-y-4"
        style={{ gridTemplateColumns: "repeat(1, minmax(0, 1fr))" }}
      >
        {section.fields.map((key) => {
          const field = fieldMap[key];
          if (!field) return null;
          const fieldSpan = field.span ?? 1;

          return (
            <div
              key={key}
              className="min-w-0"
              style={{
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
}
