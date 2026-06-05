import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

type Sort = "popular" | "price_low" | "price_high" | "rating";

const SORTS: { key: Sort; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "price_low", label: "Price ↑" },
  { key: "price_high", label: "Price ↓" },
  { key: "rating", label: "Top Rated" },
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const category = useCategoryStore((s) => s.categories.find((c) => c.id === id));

  const [sort, setSort] = useState<Sort>("popular");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showWeek, setShowWeek] = useState(false);

  const list = useMemo(() => {
    let items = products.filter((p) => p.category === id);
    if (availableOnly) items = items.filter((p) => p.availability);
    switch (sort) {
      case "price_low":
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        items = [...items].sort((a, b) => b.rating - a.rating);
        break;
      default:
        items = [...items].sort((a, b) => Number(b.popular) - Number(a.popular));
    }
    return items;
  }, [products, id, sort, availableOnly]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm" style={{ elevation: 1 }}>
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 text-xl font-bold text-secondary">{category?.name ?? "Category"}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
      >
        <Pressable
          onPress={() => setSort((current) => (current === "popular" ? "price_low" : current === "price_low" ? "price_high" : current === "price_high" ? "rating" : "popular"))}
          className={`mr-3 rounded-full px-4 py-3 ${sort !== "rating" ? "bg-white" : "bg-blue-600"}`}
          style={{ minWidth: 98 }}
        >
          <Text className={`text-xs font-semibold ${sort !== "rating" ? "text-secondary" : "text-white"}`}>Sort</Text>
        </Pressable>
        <Pressable
          onPress={() => setSort((current) => (current === "price_low" ? "price_high" : "price_low"))}
          className="mr-3 rounded-full bg-white px-4 py-3"
          style={{ minWidth: 98 }}
        >
          <Text className="text-xs font-semibold text-secondary">Price</Text>
        </Pressable>
        <Pressable
          onPress={() => setAvailableOnly((v) => !v)}
          className={`mr-3 rounded-full px-4 py-3 ${availableOnly ? "bg-blue-600" : "bg-white"}`}
          style={{ minWidth: 98 }}
        >
          <Text className={`text-xs font-semibold ${availableOnly ? "text-white" : "text-secondary"}`}>Availability</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowWeek((v) => !v)}
          className={`rounded-full px-4 py-3 ${showWeek ? "bg-blue-600" : "bg-white"}`}
          style={{ minWidth: 98 }}
        >
          <Text className={`text-xs font-semibold ${showWeek ? "text-white" : "text-secondary"}`}>Duration</Text>
        </Pressable>
      </ScrollView>

      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, flexGrow: 1, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} variant="list" />}
        ListEmptyComponent={<EmptyState icon="cube-outline" title="No rentals here yet" />}
      />
    </SafeAreaView>
  );
}
