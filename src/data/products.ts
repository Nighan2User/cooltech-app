import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    vendorId: "v1",
    title: "Heavy-Duty Power Drill",
    description:
      "Professional cordless power drill with two batteries, charger, and a full bit set. Ideal for construction and home improvement projects. Brushless motor delivers consistent torque.",
    price: 18,
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800",
    ],
    category: "tools",
    availability: true,
    location: "New York, NY",
    rating: 4.6,
    reviewsCount: 34,
    featured: true,
    popular: true,
    createdAt: "2024-04-01",
  },
  {
    id: "p2",
    vendorId: "v2",
    title: "Portable Air Conditioner 12000 BTU",
    description:
      "Powerful portable AC unit that cools rooms up to 400 sq ft. Includes remote control, window kit, and dehumidifier mode. Energy efficient and quiet operation.",
    price: 35,
    images: [
      "https://images.unsplash.com/photo-1631545806609-c2b999c8f6a6?w=800",
      "https://images.unsplash.com/photo-1614633833026-0820552978b6?w=800",
    ],
    category: "cooling",
    availability: true,
    location: "Los Angeles, CA",
    rating: 4.4,
    reviewsCount: 21,
    featured: true,
    popular: true,
    createdAt: "2024-04-05",
  },
  {
    id: "p3",
    vendorId: "v3",
    title: "Professional PA Sound System",
    description:
      "Complete event sound system with two speakers, mixer, wireless microphones, and all cables. Perfect for parties, weddings, and corporate events up to 200 guests.",
    price: 75,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    ],
    category: "events",
    availability: true,
    location: "Chicago, IL",
    rating: 4.8,
    reviewsCount: 52,
    featured: true,
    popular: true,
    createdAt: "2024-03-28",
  },
  {
    id: "p4",
    vendorId: "v4",
    title: "Mini Excavator 1.5 Ton",
    description:
      "Compact mini excavator suitable for digging, trenching, and landscaping. Easy to operate with comfortable cabin. Delivery and pickup available within city limits.",
    price: 220,
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800",
      "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800",
    ],
    category: "machinery",
    availability: true,
    location: "Houston, TX",
    rating: 4.9,
    reviewsCount: 18,
    featured: false,
    popular: true,
    createdAt: "2024-02-15",
  },
  {
    id: "p5",
    vendorId: "v1",
    title: "Circular Saw Pro",
    description:
      "7-1/4 inch circular saw with laser guide and carbide-tipped blade. Cuts through wood, plywood, and laminate with precision. Lightweight and ergonomic.",
    price: 14,
    images: [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800",
    ],
    category: "tools",
    availability: false,
    location: "New York, NY",
    rating: 4.3,
    reviewsCount: 27,
    featured: false,
    popular: false,
    createdAt: "2024-04-10",
  },
  {
    id: "p6",
    vendorId: "v2",
    title: "Industrial Floor Fan",
    description:
      "High-velocity 24 inch industrial floor fan. Three speed settings and tilting head for directional airflow. Great for warehouses, garages, and events.",
    price: 22,
    images: [
      "https://images.unsplash.com/photo-1565130838609-c3a86655db61?w=800",
    ],
    category: "cooling",
    availability: true,
    location: "Los Angeles, CA",
    rating: 4.1,
    reviewsCount: 12,
    featured: false,
    popular: false,
    createdAt: "2024-04-12",
  },
  {
    id: "p7",
    vendorId: "v3",
    title: "4K Projector & Screen",
    description:
      "Ultra HD 4K projector with 120 inch motorized screen. HDMI, USB, and wireless casting support. Perfect for presentations, movie nights, and outdoor events.",
    price: 60,
    images: [
      "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800",
    ],
    category: "electronics",
    availability: true,
    location: "Chicago, IL",
    rating: 4.7,
    reviewsCount: 41,
    featured: true,
    popular: false,
    createdAt: "2024-03-30",
  },
  {
    id: "p8",
    vendorId: "v4",
    title: "Diesel Generator 10kVA",
    description:
      "Reliable 10kVA diesel generator for construction sites and events. Low noise enclosure, automatic voltage regulation, and 8-hour runtime per tank.",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1592833167665-ebf9d00a4799?w=800",
    ],
    category: "industrial",
    availability: true,
    location: "Houston, TX",
    rating: 4.5,
    reviewsCount: 9,
    featured: false,
    popular: true,
    createdAt: "2024-02-20",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductsByVendor = (vendorId: string) =>
  PRODUCTS.filter((p) => p.vendorId === vendorId);
export const getProductsByCategory = (categoryId: string) =>
  PRODUCTS.filter((p) => p.category === categoryId);
