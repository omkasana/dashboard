// src/components/Settings/SettingsSection.tsx

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="rounded-3xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-6 p-6">{children}</div>
    </section>
  );
}
