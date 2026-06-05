import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/format";
import { getVendor } from "@/data/vendors";
import { useFavoritesStore } from "@/store/favoritesStore";
import RatingStars from "./RatingStars";

interface Props {
  product: Product;
  variant?: "grid" | "list" | "wide";
}

export default function ProductCard({ product, variant = "grid" }: Props) {
  const router = useRouter();
  const vendor = getVendor(product.vendorId);
  const { isFavorite, toggle } = useFavoritesStore();
  const fav = isFavorite(product.id);

  const go = () => router.push(`/product/${product.id}`);
  const weeklyPrice = product.price * 7;

  if (variant === "list") {
    return (
      <Pressable
        onPress={go}
        className="mb-4 flex-row rounded-3xl bg-white p-3 shadow-sm"
        style={{ elevation: 1 }}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={{ width: 110, height: 110, borderRadius: 20 }}
          contentFit="cover"
        />
        <View className="ml-3 flex-1 justify-between">
          <View>
            <Text className="text-base font-semibold text-secondary" numberOfLines={1}>
              {product.title}
            </Text>
            <Text className="mt-1 text-xs text-muted" numberOfLines={1}>
              {vendor?.name} · {product.location}
            </Text>
            <View className="mt-2 flex-row items-center">
              <RatingStars rating={product.rating} count={product.reviewsCount} size={12} />
              <Text className="ml-2 text-xs text-muted">{product.reviewsCount} reviews</Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-end justify-between">
            <View>
              <Text className="text-base font-bold text-secondary">
                {formatCurrency(product.price)}
                <Text className="text-xs font-normal text-muted">/day</Text>
              </Text>
              <Text className="mt-1 text-sm font-medium text-muted">
                {formatCurrency(weeklyPrice)}/week
              </Text>
            </View>
            <View className="items-end">
              <View
                className={`rounded-full px-2 py-1 ${
                  product.availability ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-[10px] font-semibold ${
                    product.availability ? "text-emerald-700" : "text-red-600"
                  }`}
                >
                  {product.availability ? "In Stock" : "Booked"}
                </Text>
              </View>
              <View className="mt-3 rounded-full bg-blue-600 px-3 py-2">
                <Text className="text-xs font-semibold text-white">Quick Rent</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  const width = variant === "wide" ? 260 : "48%";

  return (
    <Pressable
      onPress={go}
      className="mb-4 rounded-3xl bg-white shadow-sm"
      style={{ width: width as any, elevation: 1 }}
    >
      <View>
        <Image
          source={{ uri: product.images[0] }}
          style={{ width: "100%", height: 140, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
          contentFit="cover"
        />
        <Pressable
          onPress={() => toggle(product.id)}
          className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={20}
            color={fav ? "#DC2626" : "#0F172A"}
          />
        </Pressable>
      </View>
      <View className="p-4">
        <Text className="text-sm font-semibold text-secondary" numberOfLines={1}>
          {product.title}
        </Text>
        <Text className="mt-1 text-xs text-muted" numberOfLines={1}>
          {product.location}
        </Text>
        <View className="mt-2">
          <RatingStars rating={product.rating} count={product.reviewsCount} size={12} />
        </View>
        <Text className="mt-3 text-base font-bold text-primary">
          {formatCurrency(product.price)}
          <Text className="text-xs font-normal text-muted">/day</Text>
        </Text>
      </View>
    </Pressable>
  );
}
