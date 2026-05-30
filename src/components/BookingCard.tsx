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
      className="mb-3 rounded-2xl bg-white p-3 shadow-sm"
      style={{ elevation: 1 }}
    >
      <View className="flex-row">
        <Image
          source={{ uri: product?.images[0] }}
          style={{ width: 70, height: 70, borderRadius: 12 }}
          contentFit="cover"
        />
        <View className="ml-3 flex-1">
          <View className="flex-row items-start justify-between">
            <Text className="flex-1 text-base font-semibold text-secondary" numberOfLines={1}>
              {product?.title ?? "Product"}
            </Text>
            <StatusBadge status={booking.status} />
          </View>
          <View className="mt-1 flex-row items-center">
            <Ionicons name="calendar-outline" size={13} color="#64748B" />
            <Text className="ml-1 text-xs text-muted">
              {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
            </Text>
          </View>
          <View className="mt-1.5 flex-row items-center justify-between">
            <Text className="text-sm font-bold text-primary">
              {formatCurrency(booking.totalAmount)}
            </Text>
            <Text
              className={`text-xs font-medium ${
                booking.paymentStatus === "paid" ? "text-green-600" : "text-amber-600"
              }`}
            >
              {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
            </Text>
          </View>
        </View>
      </View>
      {footer}
    </Pressable>
  );
}
