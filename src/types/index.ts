export type Role = "user" | "vendor" | "admin";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: Role;
  address: string;
  avatar?: string;
  createdAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  email: string;
  logo?: string;
  verified: boolean;
  rating: number;
  totalProducts: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Ionicons name
  color: string;
}

export interface Product {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  price: number; // per day
  images: string[];
  category: string; // category id
  availability: boolean;
  location: string;
  rating: number;
  reviewsCount: number;
  featured: boolean;
  popular: boolean;
  createdAt: string;
}

export type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "completed"
  | "cancelled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface Booking {
  id: string;
  userId: string;
  productId: string;
  vendorId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: "booking" | "approval" | "update" | "promo";
  read: boolean;
  createdAt: string;
}
