import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useVendorStore } from "@/store/vendorStore";
import { useProductStore } from "@/store/productStore";
import { useBookingStore } from "@/store/bookingStore";
import { useAuthStore } from "@/store/authStore";
import { useNotificationStore } from "@/store/notificationStore";
import { USERS } from "@/data/users";
import { formatCurrency } from "@/utils/format";
import StatCard from "@/components/StatCard";
import BookingCard from "@/components/BookingCard";
import SectionHeader from "@/components/SectionHeader";

export default function AdminDashboard() {
  const router = useRouter();
  const vendors = useVendorStore((s) => s.vendors);
  const products = useProductStore((s) => s.products);
  const bookings = useBookingStore((s) => s.bookings);
  const logout = useAuthStore((s) => s.logout);
  const pushNotif = useNotificationStore((s) => s.push);

  const revenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const recent = [...bookings].slice(0, 3);

  const sendPromo = () => {
    pushNotif({
      title: "Promotional Offer",
      body: "Admin broadcast: 15% off all rentals this weekend!",
      type: "promo",
    });
    Alert.alert("Sent", "Promotional push notification broadcast to all users.");
  };

  const confirmLogout = () => {
    Alert.alert("Log out", "Log out of admin panel?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => { logout(); router.replace("/(auth)/welcome"); } },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="flex-row items-center justify-between px-5 pt-2">
          <View>
            <Text className="text-sm text-muted">Admin Panel</Text>
            <Text className="text-2xl font-bold text-secondary">Overview</Text>
          </View>
          <Pressable onPress={confirmLogout} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm" style={{ elevation: 1 }}>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          </Pressable>
        </View>

        {/* Revenue hero */}
        <View className="mx-5 mt-4 rounded-2xl bg-secondary p-5" style={{ elevation: 2 }}>
          <Text className="text-sm text-white/70">Platform Revenue</Text>
          <Text className="mt-1 text-3xl font-bold text-white">{formatCurrency(revenue)}</Text>
          <Text className="mt-2 text-xs text-white/70">{bookings.length} total bookings processed</Text>
        </View>

        {/* Stats */}
        <View className="mt-4 flex-row flex-wrap justify-between px-5">
          <StatCard label="Total Users" value={`${USERS.length}`} icon="people" color="#2563EB" />
          <StatCard label="Total Vendors" value={`${vendors.length}`} icon="storefront" color="#8B5CF6" />
          <StatCard label="Total Products" value={`${products.length}`} icon="cube" color="#16A34A" />
          <StatCard label="Total Bookings" value={`${bookings.length}`} icon="receipt" color="#F59E0B" />
        </View>

        {/* Quick actions */}
        <View className="px-5 pt-2">
          <SectionHeader title="Quick Actions" />
          <View className="flex-row">
            <Pressable onPress={() => router.push("/(admin)/approvals")} className="mr-3 flex-1 items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="checkmark-done-circle" size={24} color="#2563EB" />
              <Text className="mt-1 text-xs font-medium text-secondary">Approvals</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/(admin)/vendors")} className="mr-3 flex-1 items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="shield-checkmark" size={24} color="#16A34A" />
              <Text className="mt-1 text-xs font-medium text-secondary">Verify</Text>
            </Pressable>
            <Pressable onPress={sendPromo} className="flex-1 items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <Ionicons name="megaphone" size={24} color="#EC4899" />
              <Text className="mt-1 text-xs font-medium text-secondary">Broadcast</Text>
            </Pressable>
          </View>
        </View>

        {/* Recent bookings */}
        <View className="px-5 pt-4">
          <SectionHeader title="Recent Bookings" />
          {recent.map((b) => <BookingCard key={b.id} booking={b} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
