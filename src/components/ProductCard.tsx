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

  if (variant === "list") {
    return (
      <Pressable
        onPress={go}
        className="mb-3 flex-row rounded-2xl bg-white p-3 shadow-sm"
        style={{ elevation: 1 }}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={{ width: 96, height: 96, borderRadius: 12 }}
          contentFit="cover"
        />
        <View className="ml-3 flex-1 justify-between">
          <View>
            <Text className="text-base font-semibold text-secondary" numberOfLines={1}>
              {product.title}
            </Text>
            <Text className="mt-0.5 text-xs text-muted" numberOfLines={1}>
              {vendor?.name} · {product.location}
            </Text>
            <View className="mt-1">
              <RatingStars rating={product.rating} count={product.reviewsCount} size={12} />
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-primary">
              {formatCurrency(product.price)}
              <Text className="text-xs font-normal text-muted">/day</Text>
            </Text>
            <View
              className={`rounded-full px-2 py-0.5 ${
                product.availability ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Text
                className={`text-[10px] font-semibold ${
                  product.availability ? "text-green-700" : "text-red-600"
                }`}
              >
                {product.availability ? "Available" : "Booked"}
              </Text>
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
      className="mb-4 rounded-2xl bg-white shadow-sm"
      style={{ width: width as any, elevation: 1 }}
    >
      <View>
        <Image
          source={{ uri: product.images[0] }}
          style={{ width: "100%", height: 130, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          contentFit="cover"
        />
        <Pressable
          onPress={() => toggle(product.id)}
          className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={18}
            color={fav ? "#DC2626" : "#0F172A"}
          />
        </Pressable>
      </View>
      <View className="p-3">
        <Text className="text-sm font-semibold text-secondary" numberOfLines={1}>
          {product.title}
        </Text>
        <Text className="mt-0.5 text-xs text-muted" numberOfLines={1}>
          {product.location}
        </Text>
        <View className="mt-1.5">
          <RatingStars rating={product.rating} count={product.reviewsCount} size={12} />
        </View>
        <Text className="mt-2 text-base font-bold text-primary">
          {formatCurrency(product.price)}
          <Text className="text-xs font-normal text-muted">/day</Text>
        </Text>
      </View>
    </Pressable>
  );
}
