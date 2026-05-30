import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "tools", name: "Tools & Equipment", icon: "construct", color: "#2563EB" },
  { id: "cooling", name: "Cooling Systems", icon: "snow", color: "#0EA5E9" },
  { id: "electronics", name: "Electronics", icon: "hardware-chip", color: "#8B5CF6" },
  { id: "events", name: "Event Equipment", icon: "balloon", color: "#EC4899" },
  { id: "machinery", name: "Machinery", icon: "cog", color: "#F59E0B" },
  { id: "industrial", name: "Industrial Rentals", icon: "business", color: "#10B981" },
];

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id);
