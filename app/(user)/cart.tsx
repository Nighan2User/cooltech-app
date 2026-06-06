import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { formatCurrency } from "@/utils/format";

export default function CartScreen() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const products = useProductStore((state) => state.products);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId),
        }))
        .filter((item) => item.product),
    [items, products]
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          subtitle="Add rentals to your cart to quickly review and checkout."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">My Cart</Text>
        <Text className="mt-1 text-sm text-muted">Review your selected rentals before checkout.</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mb-4 overflow-hidden rounded-3xl bg-white shadow-sm" style={{ elevation: 1 }}>
            <View className="flex-row">
              <Image
                source={{ uri: item.product?.images[0] }}
                style={{ width: 110, height: 110 }}
                contentFit="cover"
              />
              <View className="flex-1 p-4">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <Text className="text-base font-semibold text-secondary" numberOfLines={2}>
                      {item.product?.title}
                    </Text>
                    <Text className="mt-1 text-xs text-muted">{item.product?.location}</Text>
                  </View>
                  <Pressable onPress={() => removeItem(item.productId)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </Pressable>
                </View>
                <Text className="mt-3 text-sm text-muted">{formatCurrency(item.product?.price ?? 0)} / day</Text>
                <View className="mt-3 flex-row items-center gap-2">
                  <Pressable
                    onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                  >
                    <Ionicons name="remove" size={18} color="#0F172A" />
                  </Pressable>
                  <Text className="text-base font-semibold text-secondary">{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                  >
                    <Ionicons name="add" size={18} color="#0F172A" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <SafeAreaView edges={["bottom"]} className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white px-5 py-4">
        <View className="mb-3 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-muted">Subtotal</Text>
            <Text className="text-xl font-bold text-secondary">{formatCurrency(subtotal)}</Text>
          </View>
          <Pressable onPress={clearCart} className="rounded-full bg-slate-100 px-4 py-3">
            <Text className="text-sm font-semibold text-secondary">Clear</Text>
          </Pressable>
        </View>
        <Button label="Proceed to Checkout" icon="cart" onPress={() => router.push(`/booking/new` as any)} />
      </SafeAreaView>
    </SafeAreaView>
  );
}
