import { useState } from "react";
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { getVendor } from "@/data/vendors";
import { getCategory } from "@/data/categories";
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
  const category = getCategory(product.category);
  const reviews = getReviewsByProduct(product.id);
  const fav = isFavorite(product.id);

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
          {product.images.length > 1 && (
            <View className="absolute bottom-3 w-full flex-row justify-center">
              {product.images.map((_, i) => (
                <View
                  key={i}
                  className={`mx-1 h-1.5 rounded-full ${i === activeImg ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
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
            <View className={`rounded-full px-3 py-1 ${product.availability ? "bg-green-100" : "bg-red-100"}`}>
              <Text className={`text-xs font-semibold ${product.availability ? "text-green-700" : "text-red-600"}`}>
                {product.availability ? "Available" : "Currently Booked"}
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

          {/* Description */}
          <Text className="mt-5 text-lg font-bold text-secondary">Description</Text>
          <Text className="mt-1.5 text-sm leading-6 text-muted">{product.description}</Text>

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
        <View className="flex-row items-center px-5 py-3">
          <View className="flex-1">
            <Text className="text-xs text-muted">Rental price</Text>
            <Text className="text-xl font-bold text-primary">
              {formatCurrency(product.price)}
              <Text className="text-sm font-normal text-muted">/day</Text>
            </Text>
          </View>
          <View style={{ width: 180 }}>
            <Button
              label={product.availability ? "Book Now" : "Unavailable"}
              icon="calendar"
              disabled={!product.availability}
              onPress={() => router.push(`/booking/new?productId=${product.id}`)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
