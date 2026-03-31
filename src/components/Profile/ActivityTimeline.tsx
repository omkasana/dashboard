"use client";

export default function ActivityTimeline() {
  const activities = [
    "Logged in from Chrome",
    "Updated profile picture",
    "Created new project",
    "Uploaded 3 files",
  ];

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
      <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-3 text-sm">
        {activities.map((item, i) => (
          <div
            key={i}
            className="
            flex items-center gap-3
            p-3
            rounded-lg
            bg-white/20 dark:bg-white/[0.03]
            "
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
