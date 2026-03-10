import { SidebarLayoutConfig, ViewConfig } from "@/types/module";
import { FieldRenderer } from "../FieldRenderer";
import {
  sectionCardStyle,
  sectionHeaderStyle,
  fieldLabelStyle,
} from "../styles";

interface SidebarLayoutProps {
  config: SidebarLayoutConfig;
  viewConfig: ViewConfig;
  data: Record<string, unknown>;
}

export function SidebarLayout({
  config,
  viewConfig,
  data,
}: SidebarLayoutProps) {
  const fieldMap = Object.fromEntries(viewConfig.fields.map((f) => [f.key, f]));
  const sideWidth = config.sideWidth ?? "260px";
  const isLeft = config.sidePosition === "left";

  const MainContent = (
    <div className="flex-1 flex flex-col gap-4 min-w-0">
      {config.mainSections.map((section) => (
        <div key={section.id} style={sectionCardStyle}>
          <h3 style={sectionHeaderStyle}>{section.title}</h3>
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
                <div key={key}>
                  <p style={fieldLabelStyle}>{field.label}</p>
                  <FieldRenderer field={field} value={data[key]} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const SideContent = (
    <div className="flex flex-col gap-4 shrink-0" style={{ width: sideWidth }}>
      {config.sideSections.map((section) => (
        <div key={section.id} style={sectionCardStyle}>
          <h3 style={sectionHeaderStyle}>{section.title}</h3>
          <div className="flex flex-col gap-4">
            {section.fields.map((key) => {
              const field = fieldMap[key];
              if (!field) return null;
              return (
                <div key={key}>
                  <p style={fieldLabelStyle}>{field.label}</p>
                  <FieldRenderer field={field} value={data[key]} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {isLeft ? (
        <>
          {SideContent}
          {MainContent}
        </>
      ) : (
        <>
          {MainContent}
          {SideContent}
        </>
      )}
    </div>
  );
}
