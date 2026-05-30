import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORIES } from "@/data/categories";
import { useProductStore } from "@/store/productStore";

export default function Categories() {
  const router = useRouter();
  const products = useProductStore((s) => s.products);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-2 pt-2">
        <Text className="text-2xl font-bold text-secondary">Explore</Text>
        <Text className="text-sm text-muted">Browse rentals by category</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {CATEGORIES.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <Pressable
                key={c.id}
                onPress={() => router.push(`/category/${c.id}`)}
                className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
                style={{ width: "48%", elevation: 1 }}
              >
                <View
                  className="mb-3 h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${c.color}1A` }}
                >
                  <Ionicons name={c.icon as any} size={26} color={c.color} />
                </View>
                <Text className="text-base font-semibold text-secondary" numberOfLines={2}>
                  {c.name}
                </Text>
                <Text className="mt-1 text-xs text-muted">{count} items</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
