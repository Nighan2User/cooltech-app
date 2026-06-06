import { Alert, FlatList, Platform, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { getVendor } from "@/data/vendors";
import { formatCurrency } from "@/utils/format";

export default function AdminApprovals() {
  const products = useProductStore((s) => s.products);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const deleteProduct = useProductStore((s) => s.deleteProduct);

  const toggleFeatured = (id: string, current: boolean) =>
    updateProduct(id, { featured: !current });

  const remove = (id: string, title: string) => {
    if (Platform.OS === "web") {
      if (window.confirm(`Permanently remove "${title}"?`)) {
        deleteProduct(id);
      }
      return;
    }
    Alert.alert("Remove listing", `Permanently remove "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => deleteProduct(id) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">Product Moderation</Text>
        <Text className="text-sm text-muted">Approve, feature or remove listings</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const vendor = getVendor(item.vendorId);
          return (
            <View className="mb-3 rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
              <View className="flex-row">
                <Image source={{ uri: item.images[0] }} style={{ width: 64, height: 64, borderRadius: 12 }} />
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-secondary" numberOfLines={1}>{item.title}</Text>
                  <Text className="text-xs text-muted">{vendor?.name}</Text>
                  <Text className="text-sm font-bold text-primary">{formatCurrency(item.price)}/day</Text>
                </View>
                {item.featured && (
                  <View className="self-start rounded-full bg-amber-100 px-2 py-0.5">
                    <Text className="text-[10px] font-semibold text-amber-700">Featured</Text>
                  </View>
                )}
              </View>
              <View className="mt-3 flex-row border-t border-slate-100 pt-3">
                <Pressable
                  onPress={() => toggleFeatured(item.id, item.featured)}
                  className="mr-2 flex-1 flex-row items-center justify-center rounded-xl bg-amber-50 py-2.5"
                >
                  <Ionicons name={item.featured ? "star" : "star-outline"} size={15} color="#F59E0B" />
                  <Text className="ml-1 text-xs font-semibold text-amber-700">
                    {item.featured ? "Unfeature" : "Feature"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => remove(item.id, item.title)}
                  className="flex-1 flex-row items-center justify-center rounded-xl bg-red-50 py-2.5"
                >
                  <Ionicons name="trash-outline" size={15} color="#DC2626" />
                  <Text className="ml-1 text-xs font-semibold text-red-600">Remove</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
