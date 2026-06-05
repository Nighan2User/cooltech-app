import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
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
  const [days, setDays] = useState(1);
  // Two-tap range selection offsets (days from today). null means not set yet.
  const [rangeStartOffset, setRangeStartOffset] = useState<number | null>(null);
  const [rangeEndOffset, setRangeEndOffset] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [paying, setPaying] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState({
    building: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    floor: "",
  });
  const [kycVerified, setKycVerified] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  const rangeStart = useMemo(() => {
    if (rangeStartOffset != null && rangeEndOffset != null) {
      return Math.min(rangeStartOffset, rangeEndOffset);
    }
    return rangeStartOffset ?? startOffset;
  }, [rangeStartOffset, rangeEndOffset, startOffset]);

  const rangeEnd = useMemo(() => {
    if (rangeStartOffset != null && rangeEndOffset != null) {
      return Math.max(rangeStartOffset, rangeEndOffset);
    }
    return null;
  }, [rangeStartOffset, rangeEndOffset]);

  const startDate = useMemo(() => addDays(today, rangeStart), [today, rangeStart]);

  const endDate = useMemo(() => {
    if (rangeEnd != null) {
      return addDays(today, rangeEnd);
    }
    // Make endDate inclusive: e.g. days = 1 => endDate === startDate
    return addDays(startDate, Math.max(0, days - 1));
  }, [rangeEnd, startDate, days]);

  // Reset / clear selection
  const resetSelection = () => {
    setRangeStartOffset(null);
    setRangeEndOffset(null);
    setStartOffset(1);
    setDays(1);
  };

  const selectionDirty = rangeStartOffset != null || rangeEndOffset != null || startOffset !== 1 || days !== 1;

  if (!product) return null;
  const vendor = getVendor(product.vendorId);

  const subtotal = product.price * days * quantity;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const confirmPayment = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentConfirmed(true);
      setPaymentModalVisible(false);
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
      setCreatedBookingId(booking.id);
      pushNotif({
        title: "Booking Requested",
        body: `Your booking for ${product.title} is awaiting vendor approval.`,
        type: "booking",
      });
      // Move to confirmation step instead of redirecting immediately
      setCurrentStep(5);
    }, 1200);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">Confirm Booking</Text>
      </View>

      {/* Step indicators */}
      <View className="px-5 pt-4">
        <View className="mb-4 h-1 rounded-full bg-slate-200">
          <View className="h-1 rounded-full bg-primary" style={{ width: `${(currentStep / 5) * 100}%` }} />
        </View>
        <View className="flex-row items-center justify-between">
          {[
            { step: 1, label: "Duration" },
            { step: 2, label: "Address" },
            { step: 3, label: "KYC" },
            { step: 4, label: "Payment" },
            { step: 5, label: "Confirm" },
          ].map((item) => (
            <View key={item.step} className="items-center">
              <View className={`mb-2 h-9 w-9 items-center justify-center rounded-full ${item.step <= currentStep ? "bg-primary" : "bg-slate-200"}`}>
                <Text className={`text-sm font-bold ${item.step <= currentStep ? "text-white" : "text-slate-600"}`}>{item.step}</Text>
              </View>
              <Text className={`text-[10px] text-center ${item.step === currentStep ? "text-secondary font-semibold" : item.step < currentStep ? "text-primary" : "text-muted"}`}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Product summary - always visible */}
        <View className="flex-row rounded-2xl bg-white p-3 shadow-sm" style={{ elevation: 1 }}>
          <Image source={{ uri: product.images[0] }} style={{ width: 70, height: 70, borderRadius: 12 }} />
          <View className="ml-3 flex-1 justify-center">
            <Text className="text-base font-semibold text-secondary" numberOfLines={1}>{product.title}</Text>
            <Text className="text-xs text-muted">{vendor?.name}</Text>
            <Text className="mt-1 text-sm font-bold text-primary">{formatCurrency(product.price)}/day</Text>
          </View>
        </View>

        {/* Step 1: Duration */}
        {currentStep === 1 && (
          <>
            {/* Dates */}
            <View className="flex-row items-center justify-between">
              <Text className="mb-2 mt-5 text-base font-semibold text-secondary">Select Dates</Text>
              {selectionDirty ? (
                <Pressable onPress={resetSelection} className="ml-2 rounded-full bg-slate-100 px-3 py-1">
                  <Text className="text-sm text-primary font-semibold">Reset</Text>
                </Pressable>
              ) : null}
            </View>

            <View className="flex-row justify-between rounded-3xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <View>
                <Text className="text-xs uppercase text-muted">From</Text>
                <Text className="mt-1 text-base font-semibold text-secondary">{formatDate(startDate.toISOString())}</Text>
              </View>
              <View>
                <Text className="text-xs uppercase text-muted">To</Text>
                <Text className="mt-1 text-base font-semibold text-secondary">{formatDate(endDate.toISOString())}</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs uppercase text-muted">Days</Text>
                <Text className="mt-1 text-base font-semibold text-secondary">{days}</Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              {Array.from({ length: 14 }, (_, index) => addDays(today, index + 1)).map((date) => {
                const selected = date >= startDate && date <= endDate;
                const offset = Math.max(1, Math.floor((date.getTime() - today.getTime()) / 86400000));
                const isRangeStart = rangeStartOffset === offset;
                const isRangeEnd = rangeEndOffset === offset;
                return (
                  <Pressable
                    key={date.toISOString()}
                    onPress={() => {
                      if (rangeStartOffset == null) {
                        setRangeStartOffset(offset);
                        setRangeEndOffset(null);
                        setStartOffset(offset);
                        setDays(1);
                        return;
                      }

                      if (rangeStartOffset != null && rangeEndOffset == null) {
                        setRangeEndOffset(offset);
                        const s = Math.min(rangeStartOffset, offset);
                        const e = Math.max(rangeStartOffset, offset);
                        setStartOffset(s);
                        setDays(e - s + 1);
                        return;
                      }

                      setRangeStartOffset(offset);
                      setRangeEndOffset(null);
                      setStartOffset(offset);
                      setDays(1);
                    }}
                    className={`mr-3 min-w-[76px] rounded-3xl px-4 py-3 ${selected ? "border-primary bg-primary/10" : "border-slate-200 bg-white"}`}
                    style={{ elevation: 1 }}
                  >
                    <Text className={`text-[10px] uppercase ${selected ? "text-primary" : "text-muted"}`}>{date.toLocaleDateString("en-US", { weekday: "short" })}</Text>
                    <Text className={`mt-1 text-xl font-bold ${isRangeStart || isRangeEnd ? "text-primary" : "text-secondary"}`}>{date.getDate()}</Text>
                    <Text className={`text-[10px] ${selected ? "text-primary" : "text-muted"}`}>{date.toLocaleDateString("en-US", { month: "short" })}</Text>
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
          </>
        )}

        {/* Step 2: Address */}
        {currentStep === 2 && (
          <>
            <Text className="mb-3 mt-5 text-base font-semibold text-secondary">Delivery Address</Text>
            <View className="rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              {/* Building */}
              <Text className="text-sm font-semibold text-secondary mb-1">Building / House No *</Text>
              <TextInput
                placeholder="e.g., 221B, Apt 5"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.building}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, building: text })}
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200 mb-3"
              />

              {/* Street */}
              <Text className="text-sm font-semibold text-secondary mb-1">Street Address *</Text>
              <TextInput
                placeholder="e.g., Baker Street"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.street}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, street: text })}
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200 mb-3"
              />

              {/* City */}
              <Text className="text-sm font-semibold text-secondary mb-1">City *</Text>
              <TextInput
                placeholder="e.g., New York"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.city}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, city: text })}
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200 mb-3"
              />

              {/* State */}
              <Text className="text-sm font-semibold text-secondary mb-1">State / Province *</Text>
              <TextInput
                placeholder="e.g., NY"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.state}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, state: text })}
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200 mb-3"
              />

              {/* Pincode */}
              <Text className="text-sm font-semibold text-secondary mb-1">Postal Code / Pincode *</Text>
              <TextInput
                placeholder="e.g., 10001"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.pincode}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, pincode: text })}
                keyboardType="numeric"
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200 mb-3"
              />

              {/* Floor */}
              <Text className="text-sm font-semibold text-secondary mb-1">Floor / Apt (Optional)</Text>
              <TextInput
                placeholder="e.g., 3rd Floor, Apt 301"
                placeholderTextColor="#94A3B8"
                value={selectedAddress.floor}
                onChangeText={(text) => setSelectedAddress({ ...selectedAddress, floor: text })}
                className="rounded-lg bg-slate-50 px-3 py-2 text-base text-secondary border border-slate-200"
              />
            </View>
          </>
        )}

        {/* Step 3: KYC */}
        {currentStep === 3 && (
          <>
            <Text className="mb-3 mt-5 text-base font-semibold text-secondary">KYC Verification</Text>
            <View className="rounded-2xl bg-emerald-50 p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={32} color="#10B981" />
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-emerald-700">Verified</Text>
                  <Text className="text-sm text-emerald-600">Your KYC is complete</Text>
                </View>
              </View>
            </View>
            <Text className="mt-5 text-sm text-muted">
              Your identity has been verified. You're all set to book rentals.
            </Text>
          </>
        )}

        {/* Step 4: Payment (no UI, opens modal from button) */}
        {currentStep === 4 && (
          <>
            <Text className="mb-3 mt-5 text-base font-semibold text-secondary">Payment Method</Text>
            <View className="rounded-2xl bg-blue-50 p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="flex-row items-center">
                <Ionicons name="card" size={24} color="#2563EB" />
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-blue-700">Mock Gateway</Text>
                  <Text className="text-sm text-blue-600">Click Confirm Payment below to proceed</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <>
            <View className="mt-8 items-center">
              <View className="rounded-full bg-emerald-100 p-4 mb-4">
                <Ionicons name="checkmark" size={48} color="#10B981" />
              </View>
              <Text className="text-2xl font-bold text-secondary text-center">Booking Confirmed!</Text>
              <Text className="mt-2 text-center text-muted text-sm">
                Your booking has been successfully created and is awaiting vendor approval.
              </Text>
            </View>
            <View className="mt-6 rounded-2xl bg-slate-50 p-4">
              <Row label="Product" value={product.title} muted />
              <Row label="Check-in" value={formatDate(startDate.toISOString())} />
              <Row label="Check-out" value={formatDate(endDate.toISOString())} />
              <Row label="Duration" value={`${days} days`} />
              <Row label="Quantity" value={`${quantity}x`} />
              <View className="my-2 h-px bg-slate-100" />
              <Row label="Delivery Address" value={selectedAddress.building} muted />
              <Text className="text-xs text-muted mt-1 ml-0">
                {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}
                {selectedAddress.floor ? ` • ${selectedAddress.floor}` : ""}
              </Text>
              <View className="my-2 h-px bg-slate-100" />
              <Row label="Total Paid" value={formatCurrency(total)} bold />
            </View>
          </>
        )}

        {/* Summary (show on all steps) */}
        <View className="mt-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Row label={`${formatDate(startDate.toISOString())} → ${formatDate(endDate.toISOString())}`} value={`${days} days`} muted />
          <Row label={`${formatCurrency(product.price)} × ${days} × ${quantity}`} value={formatCurrency(subtotal)} />
          <Row label="Service fee (10%)" value={formatCurrency(serviceFee)} />
          <View className="my-2 h-px bg-slate-100" />
          <Row label="Total" value={formatCurrency(total)} bold />
        </View>

        {currentStep < 3 && (
          <View className="mt-3 flex-row items-center rounded-xl bg-blue-50 p-3">
            <Ionicons name="shield-checkmark" size={18} color="#2563EB" />
            <Text className="ml-2 flex-1 text-xs text-muted">
              Complete these steps to proceed to payment.
            </Text>
          </View>
        )}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} className="border-t border-slate-100 bg-white">
        <View className="px-5 py-3 gap-3">
          {currentStep > 1 && (
            <Pressable
              onPress={() => setCurrentStep(currentStep - 1)}
              className="rounded-2xl bg-slate-100 px-4 py-3"
            >
              <Text className="text-center text-sm font-semibold text-secondary">Back</Text>
            </Pressable>
          )}
          <Button
            label={
              currentStep === 5
                ? "Complete"
                : currentStep === 4
                ? "Confirm Payment"
                : "Next"
            }
            icon={currentStep === 5 ? "checkmark" : "arrow-forward"}
            loading={paying}
            onPress={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
              } else if (currentStep === 4) {
                setPaymentModalVisible(true);
              } else if (currentStep === 5) {
                router.replace(`/booking/${createdBookingId}?success=1`);
              }
            }}
          />
        </View>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent
        visible={paymentModalVisible}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View className="flex-1 bg-black/30 justify-end">
          <View className="rounded-t-3xl bg-white p-6 shadow-xl">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-secondary">Mock Payment Gateway</Text>
              <Pressable onPress={() => setPaymentModalVisible(false)} className="rounded-full bg-slate-100 p-2">
                <Ionicons name="close" size={20} color="#0F172A" />
              </Pressable>
            </View>
            <Text className="mt-4 text-sm text-muted">
              This is a demo payment flow. No real transaction is made. Later you can integrate your payment gateway here.
            </Text>
            <View className="mt-6 rounded-2xl bg-slate-50 p-4">
              <Text className="text-sm text-muted">Order summary</Text>
              <Text className="mt-2 text-base font-semibold text-secondary">{product.title}</Text>
              <Text className="mt-1 text-sm text-muted">{formatDate(startDate.toISOString())} → {formatDate(endDate.toISOString())}</Text>
              <Text className="mt-2 text-base font-bold text-primary">{formatCurrency(total)}</Text>
            </View>
            <View className="mt-6 flex-row space-x-3">
              <Pressable
                onPress={() => setPaymentModalVisible(false)}
                className="flex-1 rounded-2xl bg-slate-100 px-4 py-3"
              >
                <Text className="text-center text-sm font-semibold text-secondary">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={confirmPayment}
                className="flex-1 rounded-2xl bg-primary px-4 py-3"
              >
                <Text className="text-center text-sm font-semibold text-white">Confirm Payment</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
