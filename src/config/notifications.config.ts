interface NotificationItem {
  id: string | number;
  title: string;
  description: string;
  unread: boolean;
  time: string;
}

interface Props {
  item: NotificationItem;
}

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
    unread: true,
  },
  {
    id: "3",
    title: "Server update",
    description: "System maintenance completed.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: "4",
    title: "Server update",
    description: "System maintenance completed.",
    time: "6 hours ago",
    unread: true,
  },
  {
    id: "5",
    title: "Server update",
    description: "System maintenance completed.",
    time: "12 hours ago",
    unread: false,
  },
  {
    id: "6",
    title: "Server update",
    description: "System maintenance completed.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "7",
    title: "Server update",
    description: "System maintenance completed.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "8",
    title: "Server update",
    description: "System maintenance completed.",
    time: "Yesterday",
    unread: false,
  },
];
