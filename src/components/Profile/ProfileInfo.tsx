"use client";

export default function PersonalInfo() {
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
      <h3 className="text-sm font-semibold mb-4 text-foreground">
        Personal Information
      </h3>

      <div className="space-y-4 text-sm">
        <Row label="Name" value="Om Kasana" />
        <Row label="Username" value="omkasana" />
        <Row label="Email" value="om@email.com" />
        <Row label="Phone" value="+91 9876543210" />
        <Row label="Website" value="om.dev" />
      </div>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
