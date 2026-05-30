import { Review } from "@/types";

export const REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u2",
    userName: "Michael Chen",
    rating: 5,
    comment: "Machine arrived on time and ran flawlessly for the whole job. Will rent again.",
    createdAt: "2026-04-22",
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u3",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Well maintained and clean. Pickup and drop-off were easy.",
    createdAt: "2026-04-18",
  },
  {
    id: "r3",
    productId: "p2",
    userId: "u3",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Solid equipment and fair daily rate. Operator support was helpful.",
    createdAt: "2026-05-02",
  },
  {
    id: "r4",
    productId: "p4",
    userId: "u2",
    userName: "Michael Chen",
    rating: 5,
    comment: "Powerful and reliable on site. The vendor was responsive and professional.",
    createdAt: "2026-05-10",
  },
];

export const getReviewsByProduct = (productId: string) =>
  REVIEWS.filter((r) => r.productId === productId);
