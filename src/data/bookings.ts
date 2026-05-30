import { Booking } from "@/types";

// Note: product -> vendor mapping in the generated catalog:
// p1->v2, p2->v3, p3->v4, p4->v1, p5->v2 ...
// The demo vendor is v1, so p4 belongs to the demo vendor dashboard.
export const BOOKINGS: Booking[] = [
  {
    id: "b1",
    userId: "u1",
    productId: "p4",
    vendorId: "v1",
    startDate: "2026-06-02",
    endDate: "2026-06-05",
    quantity: 1,
    totalAmount: 660,
    status: "approved",
    paymentStatus: "paid",
    createdAt: "2026-05-28",
  },
  {
    id: "b2",
    userId: "u1",
    productId: "p2",
    vendorId: "v3",
    startDate: "2026-06-10",
    endDate: "2026-06-11",
    quantity: 1,
    totalAmount: 230,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-05-29",
  },
  {
    id: "b3",
    userId: "u1",
    productId: "p1",
    vendorId: "v2",
    startDate: "2026-05-20",
    endDate: "2026-05-22",
    quantity: 1,
    totalAmount: 440,
    status: "completed",
    paymentStatus: "paid",
    createdAt: "2026-05-18",
  },
  {
    id: "b4",
    userId: "u2",
    productId: "p12",
    vendorId: "v1",
    startDate: "2026-06-15",
    endDate: "2026-06-18",
    quantity: 1,
    totalAmount: 450,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: "2026-05-30",
  },
];
