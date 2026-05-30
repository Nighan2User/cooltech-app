import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useProductStore } from "@/store/productStore";
import { useBookingStore } from "@/store/bookingStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { getVendor } from "@/data/vendors";
import { formatCurrency, formatDate } from "@/utils/format";
import Button from "@/components/Button";

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export default function NewBooking() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const product = useProductStore((s) => s.products.find((p) => p.id === productId));
  const createBooking = useBookingStore((s) => s.createBooking);
  const markPaid = useBookingStore((s) => s.markPaid);
  const user = useAuthStore((s) => s.user);
  const pushNotif = useNotificationStore((s) => s.push);

  const today = new Date();
  const [startOffset, setStartOffset] = useState(1);
  const [days, setDays] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [paying, setPaying] = useState(false);

  const startDate = useMemo(() => addDays(today, startOffset), [startOffset]);
  const endDate = useMemo(() => addDays(startDate, days), [startDate, days]);

  if (!product) return null;
  const vendor = getVendor(product.vendorId);

  const subtotal = product.price * days * quantity;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const onPay = () => {
    setPaying(true);
    // Simulate Razorpay payment processing
    setTimeout(() => {
      const booking = createBooking({
        userId: user?.id ?? "u1",
        productId: product.id,
        vendorId: product.vendorId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        quantity,
        totalAmount: total,
        paymentStatus: "paid",
      });
      markPaid(booking.id);
      pushNotif({
        title: "Booking Requested",
        body: `Your booking for ${product.title} is awaiting vendor approval.`,
        type: "booking",
      });
      setPaying(false);
      router.replace(`/booking/${booking.id}?success=1`);
    }, 1400);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">Confirm Booking</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Product summary */}
        <View className="flex-row rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
          <Image source={{ uri: product.images[0] }} style={{ width: 70, height: 70, borderRadius: 12 }} />
          <View className="ml-3 flex-1 justify-center">
            <Text className="text-base font-semibold text-secondary" numberOfLines={1}>{product.title}</Text>
            <Text className="text-xs text-muted">{vendor?.name}</Text>
            <Text className="mt-1 text-sm font-bold text-primary">{formatCurrency(product.price)}/day</Text>
          </View>
        </View>

        {/* Dates */}
        <Text className="mb-2 mt-5 text-base font-semibold text-secondary">Rental Start</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6, 7].map((off) => {
            const d = addDays(today, off);
            const active = startOffset === off;
            return (
              <Pressable
                key={off}
                onPress={() => setStartOffset(off)}
                className={`mr-2 items-center rounded-xl px-4 py-3 ${active ? "bg-primary" : "bg-white"}`}
                style={{ elevation: 1 }}
              >
                <Text className={`text-xs ${active ? "text-white/80" : "text-muted"}`}>
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <Text className={`text-lg font-bold ${active ? "text-white" : "text-secondary"}`}>{d.getDate()}</Text>
                <Text className={`text-xs ${active ? "text-white/80" : "text-muted"}`}>
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Duration */}
        <Text className="mb-2 mt-5 text-base font-semibold text-secondary">Duration (days)</Text>
        <View className="flex-row items-center rounded-2xl bg-white p-2 shadow-sm" style={{ elevation: 1 }}>
          <Pressable onPress={() => setDays((d) => Math.max(1, d - 1))} className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Ionicons name="remove" size={20} color="#0F172A" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-secondary">{days}</Text>
          <Pressable onPress={() => setDays((d) => d + 1)} className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Ionicons name="add" size={20} color="#0F172A" />
          </Pressable>
        </View>

        {/* Quantity */}
        <Text className="mb-2 mt-5 text-base font-semibold text-secondary">Quantity</Text>
        <View className="flex-row items-center rounded-2xl bg-white p-2 shadow-sm" style={{ elevation: 1 }}>
          <Pressable onPress={() => setQuantity((q) => Math.max(1, q - 1))} className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Ionicons name="remove" size={20} color="#0F172A" />
          </Pressable>
          <Text className="flex-1 text-center text-lg font-bold text-secondary">{quantity}</Text>
          <Pressable onPress={() => setQuantity((q) => q + 1)} className="h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Ionicons name="add" size={20} color="#0F172A" />
          </Pressable>
        </View>

        {/* Summary */}
        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Row label={`${formatDate(startDate.toISOString())} → ${formatDate(endDate.toISOString())}`} value={`${days} days`} muted />
          <Row label={`${formatCurrency(product.price)} × ${days} × ${quantity}`} value={formatCurrency(subtotal)} />
          <Row label="Service fee (10%)" value={formatCurrency(serviceFee)} />
          <View className="my-2 h-px bg-slate-100" />
          <Row label="Total" value={formatCurrency(total)} bold />
        </View>

        <View className="mt-3 flex-row items-center rounded-xl bg-primary/5 p-3">
          <Ionicons name="shield-checkmark" size={18} color="#2563EB" />
          <Text className="ml-2 flex-1 text-xs text-muted">
            Secure payment via Razorpay (simulated). You won't be charged in this demo.
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} className="border-t border-slate-100 bg-white">
        <View className="px-5 py-3">
          <Button
            label={paying ? "Processing payment..." : `Pay ${formatCurrency(total)}`}
            icon="card"
            loading={paying}
            onPress={onPay}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
  return (
    <View className="flex-row items-center justify-between py-1">
      <Text className={`${bold ? "text-base font-bold text-secondary" : muted ? "text-xs text-muted" : "text-sm text-muted"}`}>
        {label}
      </Text>
      <Text className={`${bold ? "text-base font-bold text-primary" : "text-sm font-medium text-secondary"}`}>{value}</Text>
    </View>
  );
}
