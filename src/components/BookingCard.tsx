import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Booking } from "@/types";
import { useProductStore } from "@/store/productStore";
import { formatCurrency, formatDate } from "@/utils/format";
import StatusBadge from "./StatusBadge";

interface Props {
  booking: Booking;
  onPress?: () => void;
  footer?: React.ReactNode;
}

export default function BookingCard({ booking, onPress, footer }: Props) {
  const product = useProductStore((s) =>
    s.products.find((p) => p.id === booking.productId)
  );

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-3xl bg-white shadow-sm"
      style={{ elevation: 1 }}
    >
      <View className="flex-row">
        <Image
          source={{ uri: product?.images[0] || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800" }}
          style={{ width: 110, height: 110 }}
          contentFit="cover"
        />
        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Text className="text-base font-semibold text-secondary" numberOfLines={1}>
                {product?.title ?? "Rental Item"}
              </Text>
              <Text className="mt-1 text-xs text-muted">Rental ID: {booking.id}</Text>
            </View>
            <StatusBadge status={booking.status} />
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <View>
              <Text className="text-[10px] uppercase text-muted">From</Text>
              <Text className="text-sm font-semibold text-secondary">{formatDate(booking.startDate)}</Text>
            </View>
            <View>
              <Text className="text-[10px] uppercase text-muted">To</Text>
              <Text className="text-sm font-semibold text-secondary">{formatDate(booking.endDate)}</Text>
            </View>
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-sm font-bold text-primary">{formatCurrency(booking.totalAmount)}</Text>
            <Text className={`text-xs font-semibold ${booking.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
              {booking.paymentStatus === "paid" ? "Paid" : "Pending"}
            </Text>
          </View>
          <View className="mt-3 flex-row gap-2">
            <Pressable className="flex-1 rounded-full bg-slate-100 px-3 py-2 flex-row items-center justify-center">
              <Ionicons name="chatbubble-outline" size={14} color="#0F172A" />
              <Text className="ml-2 text-[10px] font-semibold text-secondary">Contact</Text>
            </Pressable>
            <Pressable className="flex-1 rounded-full bg-primary/10 px-3 py-2 flex-row items-center justify-center">
              <Ionicons name="information-circle-outline" size={14} color="#2563EB" />
              <Text className="ml-2 text-[10px] font-semibold text-primary">Details</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {footer}
    </Pressable>
  );
}
