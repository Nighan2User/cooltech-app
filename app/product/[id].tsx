import { useState } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useCategoryStore } from "@/store/categoryStore";
import { useCartStore } from "@/store/cartStore";
import { getVendor } from "@/data/vendors";
import { getReviewsByProduct } from "@/data/reviews";
import { formatCurrency, formatDate } from "@/utils/format";
import RatingStars from "@/components/RatingStars";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = useProductStore((s) => s.products.find((p) => p.id === id));
  const category = useCategoryStore((s) => s.categories.find((c) => c.id === product?.category));
  const { isFavorite, toggle } = useFavoritesStore();
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-bg">
        <EmptyState icon="alert-circle-outline" title="Product not found" />
      </SafeAreaView>
    );
  }

  const vendor = getVendor(product.vendorId);
  const reviews = getReviewsByProduct(product.id);
  const fav = isFavorite(product.id);
  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const inCart = cartItems.some((item) => item.productId === product.id);

  return (
    <View className="flex-1 bg-bg">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Image carousel */}
        <View>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onMomentumScrollEnd={(e) =>
              setActiveImg(Math.round(e.nativeEvent.contentOffset.x / width))
            }
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width, height: 320 }} contentFit="cover" />
            )}
          />
          <SafeAreaView edges={["top"]} className="absolute left-0 right-0 top-0">
            <View className="flex-row items-center justify-between px-5 pt-2">
              <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white/90">
                <Ionicons name="chevron-back" size={22} color="#0F172A" />
              </Pressable>
              <Pressable onPress={() => toggle(product.id)} className="h-10 w-10 items-center justify-center rounded-full bg-white/90">
                <Ionicons name={fav ? "heart" : "heart-outline"} size={22} color={fav ? "#DC2626" : "#0F172A"} />
              </Pressable>
            </View>
          </SafeAreaView>
          {/* Image counter */}
          <View className="absolute bottom-3 right-4 rounded-full bg-black/50 px-3 py-1">
            <Text className="text-sm font-semibold text-white">
              {activeImg + 1}/{product.images.length}
            </Text>
          </View>
          {product.images.length > 1 && (
            <View className="absolute bottom-3 left-4 w-1/3 flex-row justify-center">
              {product.images.map((_, i) => (
                <View
                  key={i}
                  className={`mx-0.5 h-1 rounded-full ${i === activeImg ? "w-3 bg-white" : "w-1 bg-white/60"}`}
                />
              ))}
            </View>
          )}
        </View>

        {/* Content */}
        <View className="rounded-t-3xl bg-bg px-5 pt-5" style={{ marginTop: -20 }}>
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-primary/10 px-3 py-1">
              <Text className="text-xs font-semibold text-primary">{category?.name}</Text>
            </View>
            <View className={`rounded-full px-3 py-1 ${product.availability ? "bg-emerald-100" : "bg-rose-100"}`}>
              <Text className={`text-xs font-semibold ${product.availability ? "text-emerald-700" : "text-rose-700"}`}>
                {product.availability ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-2xl font-bold text-secondary">{product.title}</Text>
          <View className="mt-2 flex-row items-center">
            <Ionicons name="location-outline" size={15} color="#64748B" />
            <Text className="ml-1 text-sm text-muted">{product.location}</Text>
            <View className="mx-2 h-1 w-1 rounded-full bg-slate-300" />
            <RatingStars rating={product.rating} count={product.reviewsCount} size={14} />
          </View>

          {/* Vendor */}
          <View className="mt-4 flex-row items-center rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
            <Image source={{ uri: vendor?.logo }} style={{ width: 44, height: 44, borderRadius: 22 }} />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="text-base font-semibold text-secondary">{vendor?.name}</Text>
                {vendor?.verified && (
                  <Ionicons name="checkmark-circle" size={15} color="#2563EB" style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text className="text-xs text-muted">{vendor?.totalProducts} rentals · ⭐ {vendor?.rating}</Text>
            </View>
            <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#2563EB" />
            </Pressable>
          </View>

          <View className="mt-5 grid-cols-3 gap-3">
            <Text className="text-lg font-bold text-secondary">Pricing</Text>
            <View className="mt-3 flex-row gap-3">
              <View className="flex-1 rounded-3xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
                <Text className="text-xs uppercase text-muted">Per Day</Text>
                <Text className="mt-3 text-xl font-bold text-primary">{formatCurrency(product.price)}</Text>
              </View>
              <View className="flex-1 rounded-3xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
                <Text className="text-xs uppercase text-muted">Per Week</Text>
                <Text className="mt-3 text-xl font-bold text-primary">{formatCurrency(Math.round(product.price * 7 * 0.9))}</Text>
              </View>
              <View className="flex-1 rounded-3xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
                <Text className="text-xs uppercase text-muted">Per Month</Text>
                <Text className="mt-3 text-xl font-bold text-primary">{formatCurrency(Math.round(product.price * 30 * 0.8))}</Text>
              </View>
            </View>
          </View>

          <View className="mt-5 rounded-3xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
            <Text className="text-sm font-semibold text-secondary">Security Deposit</Text>
            <Text className="mt-2 text-xl font-bold text-secondary">₹10,000</Text>
            <Text className="mt-1 text-sm text-muted">Refundable after successful rental completion.</Text>
          </View>

          <Text className="mt-5 text-lg font-bold text-secondary">Equipment</Text>
          <Text className="mt-2 text-sm leading-6 text-muted">{product.description}</Text>
          <Pressable className="mt-3 rounded-full bg-primary/10 px-4 py-3 items-center justify-center">
            <Text className="text-sm font-semibold text-primary">View More</Text>
          </Pressable>

          {/* Availability calendar (simplified) */}
          <Text className="mt-5 text-lg font-bold text-secondary">Availability</Text>
          <View className="mt-2 flex-row items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
            <Ionicons name="calendar" size={22} color="#2563EB" />
            <Text className="ml-3 flex-1 text-sm text-muted">
              {product.availability
                ? `Available from ${formatDate(new Date().toISOString())}`
                : "Next available in a few days"}
            </Text>
          </View>

          {/* Reviews */}
          <Text className="mt-5 text-lg font-bold text-secondary">
            Reviews ({reviews.length})
          </Text>
          {reviews.length === 0 ? (
            <Text className="mt-2 text-sm text-muted">No reviews yet.</Text>
          ) : (
            reviews.map((r) => (
              <View key={r.id} className="mt-3 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-secondary">{r.userName}</Text>
                  <RatingStars rating={r.rating} showValue={false} size={13} />
                </View>
                <Text className="mt-1 text-sm leading-5 text-muted">{r.comment}</Text>
                <Text className="mt-1 text-xs text-slate-400">{formatDate(r.createdAt)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <SafeAreaView edges={["bottom"]} className="absolute bottom-0 w-full border-t border-slate-100 bg-white">
        <View className="flex-row gap-2 px-5 py-3">
          <Pressable
            onPress={() => {
              if (!inCart) addItem(product.id);
              router.push("/cart");
            }}
            className={`flex-1 items-center justify-center rounded-2xl border-2 py-3 ${inCart ? "border-slate-300 bg-slate-100" : "border-primary bg-white"}`}
            disabled={!product.availability}
          >
            <Text className={`text-base font-bold ${inCart ? "text-secondary" : "text-primary"}`}>
              {inCart ? "View Cart" : "Add to Cart"}
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 items-center justify-center rounded-2xl bg-orange-500 py-3"
            disabled={!product.availability}
            onPress={() => router.push(`/booking/new?productId=${product.id}`)}
          >
            <Text className="text-base font-bold text-white">Rent Now</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
