import { Review } from "@/types";

export const REVIEWS: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u2",
    userName: "Michael Chen",
    rating: 5,
    comment: "Worked perfectly for my deck project. Batteries lasted all day.",
    createdAt: "2026-04-22",
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u3",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Good drill, came clean and well charged. Easy pickup.",
    createdAt: "2026-04-18",
  },
  {
    id: "r3",
    productId: "p2",
    userId: "u3",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Cooled my apartment fast during the heatwave. A bit heavy though.",
    createdAt: "2026-05-02",
  },
  {
    id: "r4",
    productId: "p3",
    userId: "u2",
    userName: "Michael Chen",
    rating: 5,
    comment: "Crystal clear sound for our wedding. Vendor was super helpful!",
    createdAt: "2026-05-10",
  },
];

export const getReviewsByProduct = (productId: string) =>
  REVIEWS.filter((r) => r.productId === productId);
