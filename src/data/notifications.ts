import { AppNotification } from "@/types";

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Booking Confirmed",
    body: "Your booking for Heavy-Duty Power Drill has been approved by ProTool Rentals.",
    type: "booking",
    read: false,
    createdAt: "2026-05-29T10:30:00Z",
  },
  {
    id: "n2",
    title: "Vendor Approved",
    body: "CoolBreeze Systems is now a verified vendor on Cooltech.",
    type: "approval",
    read: false,
    createdAt: "2026-05-28T08:15:00Z",
  },
  {
    id: "n3",
    title: "Weekend Offer",
    body: "Get 15% off on all Event Equipment rentals this weekend!",
    type: "promo",
    read: true,
    createdAt: "2026-05-27T14:00:00Z",
  },
  {
    id: "n4",
    title: "Rental Update",
    body: "Your PA Sound System rental is due for return tomorrow.",
    type: "update",
    read: true,
    createdAt: "2026-05-26T09:45:00Z",
  },
];
