import { Alert, Linking, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useBookingStore } from "@/store/bookingStore";
import { useProductStore } from "@/store/productStore";
import { getVendor } from "@/data/vendors";
import { formatCurrency, formatDate, daysBetween } from "@/utils/format";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";

export default function BookingDetail() {
  const { id, success } = useLocalSearchParams<{ id: string; success?: string }>();
  const router = useRouter();
  const booking = useBookingStore((s) => s.bookings.find((b) => b.id === id));
  const cancelBooking = useBookingStore((s) => s.cancelBooking);
  const product = useProductStore((s) => s.products.find((p) => p.id === booking?.productId));

  if (!booking || !product) {
    return (
      <SafeAreaView className="flex-1 bg-bg">
        <EmptyState icon="alert-circle-outline" title="Booking not found" />
      </SafeAreaView>
    );
  }

  const vendor = getVendor(booking.vendorId);
  const days = daysBetween(booking.startDate, booking.endDate);
  const canCancel = ["pending", "approved"].includes(booking.status);

  const onCancel = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        cancelBooking(booking.id);
      }
      return;
    }
    Alert.alert("Cancel booking", "Are you sure you want to cancel this booking?", [
      { text: "Keep", style: "cancel" },
      { text: "Cancel Booking", style: "destructive", onPress: () => cancelBooking(booking.id) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable
          onPress={() => (success ? router.replace("/(user)/bookings") : router.back())}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">Booking Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {success && (
          <View className="mb-4 flex-row items-center rounded-2xl bg-green-50 p-4">
            <Ionicons name="checkmark-circle" size={26} color="#16A34A" />
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-green-800">Booking confirmed!</Text>
              <Text className="text-xs text-green-700">Waiting for vendor approval. We'll notify you.</Text>
            </View>
          </View>
        )}

        {/* Product */}
        <View className="flex-row rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
          <Image source={{ uri: product.images[0] }} style={{ width: 80, height: 80, borderRadius: 12 }} />
          <View className="ml-3 flex-1 justify-center">
            <Text className="text-base font-semibold text-secondary" numberOfLines={1}>{product.title}</Text>
            <Text className="text-xs text-muted">{vendor?.name}</Text>
            <View className="mt-1">
              <StatusBadge status={booking.status} />
            </View>
          </View>
        </View>

        {/* Booking info */}
        <View className="mt-4 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-2 text-base font-bold text-secondary">Rental Period</Text>
          <InfoRow icon="calendar-outline" label="Start" value={formatDate(booking.startDate)} />
          <InfoRow icon="calendar" label="End" value={formatDate(booking.endDate)} />
          <InfoRow icon="time-outline" label="Duration" value={`${days} days`} />
          <InfoRow icon="cube-outline" label="Quantity" value={`${booking.quantity}`} />
        </View>

        {/* Payment */}
        <View className="mt-4 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-2 text-base font-bold text-secondary">Payment</Text>
          <InfoRow icon="card-outline" label="Status" value={booking.paymentStatus === "paid" ? "Paid" : "Unpaid"} />
          <InfoRow icon="cash-outline" label="Total Amount" value={formatCurrency(booking.totalAmount)} />
          <InfoRow icon="receipt-outline" label="Booking ID" value={booking.id.slice(0, 12)} />
        </View>

        {/* Vendor contact */}
        <View className="mt-4 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-3 text-base font-bold text-secondary">Vendor Contact</Text>
          <View className="flex-row items-center">
            <Image source={{ uri: vendor?.logo }} style={{ width: 44, height: 44, borderRadius: 22 }} />
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-secondary">{vendor?.name}</Text>
              <Text className="text-xs text-muted">{vendor?.phone}</Text>
            </View>
            <Pressable
              onPress={() => vendor && Linking.openURL(`tel:${vendor.phone}`)}
              className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-primary/10"
            >
              <Ionicons name="call" size={18} color="#2563EB" />
            </Pressable>
            <Pressable
              onPress={() => vendor && Linking.openURL(`https://wa.me/${vendor.phone.replace(/[^0-9]/g, "")}`)}
              className="h-10 w-10 items-center justify-center rounded-full bg-green-100"
            >
              <Ionicons name="logo-whatsapp" size={18} color="#16A34A" />
            </Pressable>          </View>
        </View>

        {/* Actions */}
        <View className="mt-6">
          <View className="mb-3">
            <Button
              label="Download Invoice"
              variant="outline"
              icon="download-outline"
              onPress={() => {
                if (Platform.OS === "web") {
                  window.alert("Invoice generation is simulated in this demo.");
                } else {
                  Alert.alert("Invoice", "Invoice generation is simulated in this demo.");
                }
              }}
            />
          </View>
          {canCancel && (
            <Button label="Cancel Booking" variant="danger" icon="close-circle-outline" onPress={onCancel} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value }: { icon: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between py-1.5">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={16} color="#64748B" />
        <Text className="ml-2 text-sm text-muted">{label}</Text>
      </View>
      <Text className="text-sm font-semibold text-secondary">{value}</Text>
    </View>
  );
}
