import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { getCategory } from "@/data/categories";
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
  const category = getCategory(id as string);

  const [sort, setSort] = useState<Sort>("popular");
  const [availableOnly, setAvailableOnly] = useState(false);

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
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">{category?.name ?? "Category"}</Text>
      </View>

      {/* Filters */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
        >
          <Pressable
            onPress={() => setAvailableOnly((v) => !v)}
            className={`mr-2 flex-row items-center rounded-full px-3 py-2 ${availableOnly ? "bg-primary" : "bg-white"}`}
          >
            <Ionicons name="checkmark-circle" size={14} color={availableOnly ? "#fff" : "#64748B"} />
            <Text className={`ml-1 text-xs font-medium ${availableOnly ? "text-white" : "text-muted"}`}>
              Available
            </Text>
          </Pressable>
          {SORTS.map((s) => {
            const active = sort === s.key;
            return (
              <Pressable
                key={s.key}
                onPress={() => setSort(s.key)}
                className={`mr-2 rounded-full px-3 py-2 ${active ? "bg-primary" : "bg-white"}`}
              >
                <Text className={`text-xs font-medium ${active ? "text-white" : "text-muted"}`}>{s.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={<EmptyState icon="cube-outline" title="No rentals here yet" />}
      />
    </SafeAreaView>
  );
}
