import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";

export default function Categories() {
  const router = useRouter();
  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-2 pt-2">
        <Text className="text-2xl font-bold text-secondary">All Categories</Text>
        <Text className="mt-1 text-sm text-muted">Browse rentals by category</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <Pressable
                key={c.id}
                onPress={() => router.push(`/category/${c.id}`)}
                className="mb-4 rounded-[28px] bg-white p-4 shadow-sm"
                style={{ width: "48%", elevation: 1 }}
              >
                <View
                  className="mb-3 h-14 w-14 items-center justify-center rounded-3xl"
                  style={{ backgroundColor: `${c.color}1A` }}
                >
                  <Ionicons name={c.icon as any} size={24} color={c.color} />
                </View>
                <Text className="text-sm font-semibold text-secondary" numberOfLines={2}>
                  {c.name}
                </Text>
                <Text className="mt-2 text-xs text-muted">{count} items</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
