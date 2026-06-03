import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { id: "construction", name: "Construction Equipment", icon: "construct", color: "#2563EB" },
  { id: "earthmoving", name: "Earthmoving Equipment", icon: "earth", color: "#B45309" },
  { id: "lifting", name: "Lifting & Material Handling", icon: "swap-vertical", color: "#0EA5E9" },
  { id: "aerial", name: "Aerial Work Platforms", icon: "trending-up", color: "#7C3AED" },
  { id: "power-tools", name: "Power Tools", icon: "build", color: "#DC2626" },
  { id: "hand-tools", name: "Hand Tools", icon: "hammer", color: "#475569" },
  { id: "concrete", name: "Concrete & Masonry", icon: "cube", color: "#9CA3AF" },
  { id: "welding", name: "Welding & Fabrication", icon: "flame", color: "#EA580C" },
  { id: "electrical", name: "Electrical Equipment", icon: "flash", color: "#CA8A04" },
  { id: "generators", name: "Generators & Power Supply", icon: "battery-charging", color: "#16A34A" },
  { id: "air-compressors", name: "Air Compressors & Pneumatic", icon: "speedometer", color: "#0891B2" },
  { id: "cleaning", name: "Cleaning Equipment", icon: "water", color: "#2563EB" },
  { id: "gardening", name: "Gardening & Landscaping", icon: "leaf", color: "#15803D" },
  { id: "agriculture", name: "Agriculture Equipment", icon: "nutrition", color: "#65A30D" },
  { id: "survey", name: "Survey & Measurement", icon: "compass", color: "#0D9488" },
  { id: "pumps", name: "Pumps & Dewatering", icon: "rainy", color: "#0284C7" },
  { id: "industrial", name: "Industrial Equipment", icon: "business", color: "#4B5563" },
  { id: "safety", name: "Safety Equipment", icon: "shield-checkmark", color: "#E11D48" },
  { id: "event", name: "Event & Temporary Infra", icon: "calendar", color: "#DB2777" },
  { id: "vehicles", name: "Vehicle Rentals", icon: "car", color: "#1D4ED8" },
  { id: "home-appliances", name: "Home Appliances", icon: "home", color: "#10B981" },
  { id: "office-equipment", name: "Office Equipment & Furniture", icon: "briefcase", color: "#3B82F6" },
  { id: "medical-equipment", name: "Hospital & Medical Equipment", icon: "medical", color: "#EF4444" },
  { id: "industrial-heavy", name: "Industrial Heavy Equipment", icon: "settings", color: "#6366F1" },
  { id: "construction-heavy", name: "Heavy Construction Equipment", icon: "construct-outline", color: "#F59E0B" },
  { id: "music-instruments", name: "Music Instruments & Audio", icon: "musical-notes", color: "#8B5CF6" },
  { id: "photography", name: "Photography & Videography", icon: "camera", color: "#EC4899" },
  { id: "defence-psu", name: "Defence / DRDO / PSU Premium", icon: "shield", color: "#14532D" },
];

export const getCategory = (id: string) =>
  CATEGORIES.find((c) => c.id === id);
