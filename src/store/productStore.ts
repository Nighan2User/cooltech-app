import { create } from "zustand";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import { genId } from "@/utils/id";

interface ProductState {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt" | "rating" | "reviewsCount">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: PRODUCTS,

  addProduct: (p) =>
    set((state) => ({
      products: [
        {
          ...p,
          id: genId("p"),
          rating: 0,
          reviewsCount: 0,
          createdAt: new Date().toISOString(),
        },
        ...state.products,
      ],
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  toggleAvailability: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, availability: !p.availability } : p
      ),
    })),
}));
