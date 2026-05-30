import { create } from "zustand";
import { AppNotification } from "@/types";
import { NOTIFICATIONS } from "@/data/notifications";
import { genId } from "@/utils/id";

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: () => number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  push: (n: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: NOTIFICATIONS,

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  push: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: genId("n"),
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),
}));
