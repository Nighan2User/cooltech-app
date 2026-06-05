import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { getVendor } from "@/data/vendors";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

const PRICE_RANGES = [
  { key: "all", label: "Any price", min: 0, max: Infinity },
  { key: "low", label: "Under $25", min: 0, max: 25 },
  { key: "mid", label: "$25 - $100", min: 25, max: 100 },
  { key: "high", label: "$100+", min: 100, max: Infinity },
];

const SUGGESTIONS = ["Excavator", "Generator", "Forklift", "Scaffolding", "Pressure Washer"];

export default function Search() {
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [priceKey, setPriceKey] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const price = PRICE_RANGES.find((p) => p.key === priceKey)!;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const vendor = getVendor(p.vendorId);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        vendor?.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCat = !cat || p.category === cat;
      const matchesPrice = p.price >= price.min && p.price <= price.max;
      const matchesRating = p.rating >= minRating;
      return matchesQuery && matchesCat && matchesPrice && matchesRating;
    });
  }, [products, query, cat, priceKey, minRating]);

  const hasQuery = query.trim().length > 0 || cat || priceKey !== "all" || minRating > 0;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <View className="flex-1">
          <SearchBar value={query} onChangeText={setQuery} autoFocus placeholder="Search products, vendors..." />
        </View>
      </View>

      {/* Filters */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 6 }}>
          {categories.map((c) => {
            const active = cat === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setCat(active ? null : c.id)}
                className={`mr-2 rounded-full px-3 py-2 ${active ? "bg-primary" : "bg-white"}`}
              >
                <Text className={`text-xs font-medium ${active ? "text-white" : "text-muted"}`}>{c.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 6 }}>
          {PRICE_RANGES.map((p) => {
            const active = priceKey === p.key;
            return (
              <Pressable
                key={p.key}
                onPress={() => setPriceKey(p.key)}
                className={`mr-2 rounded-full px-3 py-2 ${active ? "bg-secondary" : "bg-white"}`}
              >
                <Text className={`text-xs font-medium ${active ? "text-white" : "text-muted"}`}>{p.label}</Text>
              </Pressable>
            );
          })}
          {[0, 4, 4.5].map((r) => {
            const active = minRating === r;
            return (
              <Pressable
                key={r}
                onPress={() => setMinRating(r)}
                className={`mr-2 flex-row items-center rounded-full px-3 py-2 ${active ? "bg-amber-500" : "bg-white"}`}
              >
                <Ionicons name="star" size={12} color={active ? "#fff" : "#FBBF24"} />
                <Text className={`ml-1 text-xs font-medium ${active ? "text-white" : "text-muted"}`}>
                  {r === 0 ? "Any" : `${r}+`}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {!hasQuery ? (
        <View className="px-5 pt-4">
          <Text className="mb-3 text-base font-semibold text-secondary">Popular searches</Text>
          <View className="flex-row flex-wrap">
            {SUGGESTIONS.map((s) => (
              <Pressable key={s} onPress={() => setQuery(s)} className="mb-2 mr-2 rounded-full bg-white px-4 py-2 shadow-sm" style={{ elevation: 1 }}>
                <Text className="text-sm text-secondary">{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ padding: 20, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text className="mb-3 text-sm text-muted">{results.length} results found</Text>
          }
          renderItem={({ item }) => <ProductCard product={item} variant="list" />}
          ListEmptyComponent={
            <EmptyState icon="search-outline" title="No matches" subtitle="Try a different search or adjust your filters." />
          }
        />
      )}
    </SafeAreaView>
  );
}
