import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductStore } from "@/store/productStore";
import { useBookingStore } from "@/store/bookingStore";
import { DEMO_VENDOR_ID } from "@/constants/session";
import { getVendor } from "@/data/vendors";
import { formatCurrency } from "@/utils/format";
import StatCard from "@/components/StatCard";
import BookingCard from "@/components/BookingCard";
import SectionHeader from "@/components/SectionHeader";
import EmptyState from "@/components/EmptyState";

export default function VendorDashboard() {
  const vendor = getVendor(DEMO_VENDOR_ID);
  const products = useProductStore((s) => s.products.filter((p) => p.vendorId === DEMO_VENDOR_ID));
  const bookings = useBookingStore((s) => s.bookings.filter((b) => b.vendorId === DEMO_VENDOR_ID));

  const earnings = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const active = bookings.filter((b) => ["approved", "active"].includes(b.status)).length;
  const pending = bookings.filter((b) => b.status === "pending");

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-2">
          <Text className="text-sm text-muted">Welcome back</Text>
          <Text className="text-2xl font-bold text-secondary">{vendor?.name}</Text>
        </View>

        {/* Earnings hero */}
        <View className="mx-5 mt-4 rounded-2xl bg-primary p-5" style={{ elevation: 2 }}>
          <Text className="text-sm text-white/80">Total Earnings</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{formatCurrency(earnings)}</Text>
          <View className="mt-3 flex-row items-center">
            <View className="rounded-full bg-white/20 px-2 py-0.5">
              <Text className="text-xs font-medium text-white">{bookings.length} bookings</Text>
            </View>
            <Text className="ml-2 text-xs text-white/80">All time</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="mt-4 flex-row flex-wrap justify-between px-5">
          <StatCard label="Total Bookings" value={`${bookings.length}`} icon="receipt" color="#2563EB" />
          <StatCard label="Active Rentals" value={`${active}`} icon="cube" color="#16A34A" />
          <StatCard label="Listed Products" value={`${products.length}`} icon="pricetags" color="#8B5CF6" />
          <StatCard label="Pending Requests" value={`${pending.length}`} icon="time" color="#F59E0B" />
        </View>

        {/* Pending requests */}
        <View className="px-5 pt-2">
          <SectionHeader title="Pending Requests" />
          {pending.length === 0 ? (
            <EmptyState icon="checkmark-done-outline" title="All caught up" subtitle="No pending booking requests." />
          ) : (
            pending.map((b) => <BookingCard key={b.id} booking={b} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
