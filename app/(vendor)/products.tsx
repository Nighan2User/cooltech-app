import { Alert, FlatList, Platform, Pressable, Switch, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { DEMO_VENDOR_ID } from "@/constants/session";
import { formatCurrency } from "@/utils/format";
import EmptyState from "@/components/EmptyState";

export default function VendorProducts() {
  const router = useRouter();
  const allProducts = useProductStore((s) => s.products);
  const products = allProducts.filter((p) => p.vendorId === DEMO_VENDOR_ID);
  const toggleAvailability = useProductStore((s) => s.toggleAvailability);
  const deleteProduct = useProductStore((s) => s.deleteProduct);

  const onDelete = (id: string, title: string) => {
    if (Platform.OS === "web") {
      if (window.confirm(`Remove "${title}" from your listings?`)) {
        deleteProduct(id);
      }
      return;
    }
    Alert.alert("Delete product", `Remove "${title}" from your listings?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteProduct(id) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-2">
        <Text className="text-2xl font-bold text-secondary">My Products</Text>
        <Pressable
          onPress={() => router.push("/(vendor)/product-form")}
          className="flex-row items-center rounded-full bg-primary px-3 py-2"
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text className="ml-1 text-sm font-semibold text-white">Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState icon="cube-outline" title="No products yet" subtitle="Tap Add to list your first rental product." />
        }
        renderItem={({ item }) => (
          <View className="mb-3 rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
            <View className="flex-row">
              <Image source={{ uri: item.images[0] }} style={{ width: 70, height: 70, borderRadius: 12 }} />
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-secondary" numberOfLines={1}>{item.title}</Text>
                <Text className="text-sm font-bold text-primary">{formatCurrency(item.price)}/day</Text>
                <Text className="text-xs text-muted">⭐ {item.rating} • {item.reviewsCount} reviews</Text>
              </View>
            </View>
            <View className="mt-3 flex-row items-center justify-between border-t border-slate-100 pt-3">
              <View className="flex-row items-center">
                <Text className="mr-2 text-xs text-muted">Available</Text>
                <Switch
                  value={item.availability}
                  onValueChange={() => toggleAvailability(item.id)}
                  trackColor={{ true: "#2563EB", false: "#CBD5E1" }}
                />
              </View>
              <View className="flex-row">
                <Pressable
                  onPress={() => router.push(`/(vendor)/product-form?id=${item.id}`)}
                  className="mr-2 flex-row items-center rounded-lg bg-slate-100 px-3 py-1.5"
                >
                  <Ionicons name="create-outline" size={15} color="#0F172A" />
                  <Text className="ml-1 text-xs font-medium text-secondary">Edit</Text>
                </Pressable>
                <Pressable
                  onPress={() => onDelete(item.id, item.title)}
                  className="flex-row items-center rounded-lg bg-red-50 px-3 py-1.5"
                >
                  <Ionicons name="trash-outline" size={15} color="#DC2626" />
                  <Text className="ml-1 text-xs font-medium text-red-600">Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
