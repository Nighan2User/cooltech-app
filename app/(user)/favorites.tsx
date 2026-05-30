import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useProductStore } from "@/store/productStore";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function Favorites() {
  const ids = useFavoritesStore((s) => s.ids);
  const products = useProductStore((s) => s.products);
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-2 pt-2">
        <Text className="text-2xl font-bold text-secondary">Saved Rentals</Text>
        <Text className="text-sm text-muted">{saved.length} items saved</Text>
      </View>

      {saved.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No saved rentals"
          subtitle="Tap the heart on any product to save it for later."
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
