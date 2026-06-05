import { create } from "zustand";
import { Category } from "@/types";
import { CATEGORIES } from "@/data/categories";
import { genId } from "@/utils/id";

interface CategoryState {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: CATEGORIES,
  addCategory: (category) =>
    set((state) => ({
      categories: [
        {
          ...category,
          id: genId("c"),
        },
        ...state.categories,
      ],
    })),
}));
