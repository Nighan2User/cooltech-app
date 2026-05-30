import { Vendor } from "@/types";

export const VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "ProTool Rentals",
    phone: "+1-202-555-0114",
    email: "contact@protool.com",
    logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200",
    verified: true,
    rating: 4.7,
    totalProducts: 12,
    createdAt: "2024-01-12",
  },
  {
    id: "v2",
    name: "CoolBreeze Systems",
    phone: "+1-202-555-0178",
    email: "hello@coolbreeze.com",
    logo: "https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=200",
    verified: true,
    rating: 4.5,
    totalProducts: 8,
    createdAt: "2024-02-03",
  },
  {
    id: "v3",
    name: "EventPro Supplies",
    phone: "+1-202-555-0199",
    email: "book@eventpro.com",
    logo: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200",
    verified: false,
    rating: 4.2,
    totalProducts: 15,
    createdAt: "2024-03-21",
  },
  {
    id: "v4",
    name: "HeavyLift Machinery",
    phone: "+1-202-555-0145",
    email: "rentals@heavylift.com",
    logo: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200",
    verified: true,
    rating: 4.8,
    totalProducts: 6,
    createdAt: "2024-01-30",
  },
];

export const getVendor = (id: string) => VENDORS.find((v) => v.id === id);
