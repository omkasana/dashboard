"use client";

export default function AccountOverview() {
  return (
    <div
      className="
      p-6
      rounded-2xl
      border border-white/10
      bg-white/40 dark:bg-white/[0.04]
      backdrop-blur-xl
      "
    >
      <h3 className="text-sm font-semibold mb-4">Account Overview</h3>

      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <Card title="User ID" value="82FJ3K92" />
        <Card title="Account Type" value="Admin" />
        <Card title="Status" value="Active" />
        <Card title="Created" value="Jan 2024" />
        <Card title="Last Login" value="2 hours ago" />
        <Card title="Projects" value="12" />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="p-4 rounded-xl bg-white/30 dark:bg-white/[0.05] border border-white/10">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
