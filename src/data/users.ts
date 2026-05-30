import { User } from "@/types";

export const USERS: User[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    phone: "+1-202-555-0100",
    role: "user",
    address: "221B Baker Street, New York, NY",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    createdAt: "2024-05-01",
  },
  {
    id: "u2",
    name: "Michael Chen",
    phone: "+1-202-555-0101",
    role: "user",
    address: "44 Lakeview Ave, Chicago, IL",
    createdAt: "2024-05-04",
  },
  {
    id: "u3",
    name: "Sarah Johnson",
    phone: "+1-202-555-0102",
    role: "user",
    address: "9 Sunset Blvd, Los Angeles, CA",
    createdAt: "2024-05-09",
  },
];
