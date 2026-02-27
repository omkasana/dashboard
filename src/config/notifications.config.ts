export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "New user registered",
    description: "A new user joined your platform.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "Payment received",
    description: "Subscription payment successful.",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "Server update",
    description: "System maintenance completed.",
    time: "Yesterday",
  },
];
