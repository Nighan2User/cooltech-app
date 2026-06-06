import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

type SortKey = "popular" | "price_low" | "price_high" | "rating";

/** Available sort options shown in the Sort dropdown */
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Popular" },
  { key: "rating", label: "Top Rated" },
  { key: "price_low", label: "Price: Low → High" },
  { key: "price_high", label: "Price: High → Low" },
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const category = useCategoryStore((s) => s.categories.find((c) => c.id === id));

  const [sort, setSort] = useState<SortKey>("popular");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Derived: is any non-default sort active?
  const sortActive = sort !== "popular";
  // Label shown on the Sort pill
  const sortLabel = SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "Sort";

  const list = useMemo(() => {
    let items = products.filter((p) => p.category === id);

    // Availability filter
    if (availableOnly) items = items.filter((p) => p.availability);

    // Duration filter — when "Weekly" is toggled, keep only products whose
    // weekly price (price × 7) makes the deal worthwhile (price > $20/day so
    // the weekly rate is meaningful). This surfaces items suitable for weekly hire.
    if (showWeek) items = items.filter((p) => p.price >= 20);

    // Sort
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
  }, [products, id, sort, availableOnly, showWeek]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          style={{ elevation: 1 }}
        >
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-bold text-secondary" numberOfLines={1}>
          {category?.name ?? "Category"}
        </Text>
        <Text className="text-sm text-muted">{list.length} items</Text>
      </View>

      {/* ── Filter pills ───────────────────────────────────────────────── */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}
        >
          {/* Sort pill */}
          <Pressable
            onPress={() => setShowSortMenu((v) => !v)}
            className={`flex-row items-center rounded-full px-4 py-2 ${
              sortActive ? "bg-blue-600" : "bg-white"
            }`}
            style={{ elevation: sortActive ? 2 : 1 }}
          >
            <Ionicons
              name="swap-vertical"
              size={13}
              color={sortActive ? "#fff" : "#0F172A"}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-xs font-semibold ${sortActive ? "text-white" : "text-secondary"}`}
            >
              {sortActive ? SORT_OPTIONS.find((o) => o.key === sort)?.label : "Sort"}
            </Text>
            <Ionicons
              name={showSortMenu ? "chevron-up" : "chevron-down"}
              size={11}
              color={sortActive ? "#fff" : "#0F172A"}
              style={{ marginLeft: 4 }}
            />
          </Pressable>

          {/* Availability pill */}
          <Pressable
            onPress={() => setAvailableOnly((v) => !v)}
            className={`flex-row items-center rounded-full px-4 py-2 ${
              availableOnly ? "bg-blue-600" : "bg-white"
            }`}
            style={{ elevation: availableOnly ? 2 : 1 }}
          >
            <Ionicons
              name="checkmark-circle"
              size={13}
              color={availableOnly ? "#fff" : "#0F172A"}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-xs font-semibold ${availableOnly ? "text-white" : "text-secondary"}`}
            >
              {availableOnly ? "Available" : "Availability"}
            </Text>
          </Pressable>

          {/* Duration / Weekly pill */}
          <Pressable
            onPress={() => setShowWeek((v) => !v)}
            className={`flex-row items-center rounded-full px-4 py-2 ${
              showWeek ? "bg-blue-600" : "bg-white"
            }`}
            style={{ elevation: showWeek ? 2 : 1 }}
          >
            <Ionicons
              name="calendar-outline"
              size={13}
              color={showWeek ? "#fff" : "#0F172A"}
              style={{ marginRight: 5 }}
            />
            <Text
              className={`text-xs font-semibold ${showWeek ? "text-white" : "text-secondary"}`}
            >
              {showWeek ? "Weekly" : "Duration"}
            </Text>
          </Pressable>

          {/* Clear-all chip — only when any filter is active */}
          {(sortActive || availableOnly || showWeek) && (
            <Pressable
              onPress={() => {
                setSort("popular");
                setAvailableOnly(false);
                setShowWeek(false);
                setShowSortMenu(false);
              }}
              className="flex-row items-center rounded-full bg-red-50 px-4 py-2"
              style={{ elevation: 1 }}
            >
              <Ionicons name="close" size={13} color="#DC2626" style={{ marginRight: 4 }} />
              <Text className="text-xs font-semibold text-red-600">Clear</Text>
            </Pressable>
          )}
        </ScrollView>

        {/* Sort dropdown menu */}
        {showSortMenu && (
          <View
            className="absolute left-5 z-50 rounded-2xl bg-white shadow-lg"
            style={{ top: 56, minWidth: 200, elevation: 8 }}
          >
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => {
                  setSort(option.key);
                  setShowSortMenu(false);
                }}
                className={`flex-row items-center px-4 py-3 ${
                  sort === option.key ? "bg-blue-50" : ""
                }`}
                style={{ borderRadius: 12 }}
              >
                <Ionicons
                  name={
                    option.key === "popular"
                      ? "flame-outline"
                      : option.key === "rating"
                      ? "star-outline"
                      : option.key === "price_low"
                      ? "trending-down-outline"
                      : "trending-up-outline"
                  }
                  size={16}
                  color={sort === option.key ? "#2563EB" : "#64748B"}
                  style={{ marginRight: 10 }}
                />
                <Text
                  className={`text-sm font-medium ${
                    sort === option.key ? "text-blue-600" : "text-secondary"
                  }`}
                >
                  {option.label}
                </Text>
                {sort === option.key && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="#2563EB"
                    style={{ marginLeft: "auto" }}
                  />
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* ── Product list ───────────────────────────────────────────────── */}
      <FlatList
        data={list}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          flexGrow: 1,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} variant="list" showWeeklyPrice={showWeek} />
        )}
        ListEmptyComponent={
          <EmptyState icon="cube-outline" title="No rentals match your filters" />
        }
      />
    </SafeAreaView>
  );
}
