import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useBookingStore } from "@/store/bookingStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useProductStore } from "@/store/productStore";
import { DEMO_VENDOR_ID } from "@/constants/session";
import { BookingStatus } from "@/types";
import BookingCard from "@/components/BookingCard";
import EmptyState from "@/components/EmptyState";

const TABS: { key: "pending" | "active" | "all"; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "active", label: "Active" },
  { key: "all", label: "All" },
];

export default function VendorRequests() {
  const allBookings = useBookingStore((s) => s.bookings);
  const bookings = allBookings.filter((b) => b.vendorId === DEMO_VENDOR_ID);
  const setStatus = useBookingStore((s) => s.setStatus);
  const pushNotif = useNotificationStore((s) => s.push);
  const products = useProductStore((s) => s.products);
  const [tab, setTab] = useState<"pending" | "active" | "all">("pending");

  const filtered = bookings.filter((b) => {
    if (tab === "pending") return b.status === "pending";
    if (tab === "active") return ["approved", "active"].includes(b.status);
    return true;
  });

  const decide = (id: string, status: BookingStatus, productId: string) => {
    setStatus(id, status);
    const product = products.find((p) => p.id === productId);
    pushNotif({
      title: status === "approved" ? "Booking Approved" : "Booking Rejected",
      body: `Booking for ${product?.title ?? "product"} was ${status}.`,
      type: "booking",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">Booking Requests</Text>
      </View>

      <View className="flex-row px-5">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              className={`mr-2 rounded-full px-4 py-2 ${active ? "bg-primary" : "bg-white"}`}
            >
              <Text className={`text-sm font-medium ${active ? "text-white" : "text-muted"}`}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState icon="file-tray-outline" title="No requests here" />}
        renderItem={({ item }) => (
          <BookingCard
            booking={item}
            footer={
              item.status === "pending" ? (
                <View className="mt-3 flex-row border-t border-slate-100 pt-3">
                  <Pressable
                    onPress={() => decide(item.id, "rejected", item.productId)}
                    className="mr-2 flex-1 flex-row items-center justify-center rounded-xl bg-red-50 py-2.5"
                  >
                    <Ionicons name="close" size={16} color="#DC2626" />
                    <Text className="ml-1 text-sm font-semibold text-red-600">Reject</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => decide(item.id, "approved", item.productId)}
                    className="flex-1 flex-row items-center justify-center rounded-xl bg-primary py-2.5"
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text className="ml-1 text-sm font-semibold text-white">Approve</Text>
                  </Pressable>
                </View>
              ) : item.status === "approved" ? (
                <View className="mt-3 border-t border-slate-100 pt-3">
                  <Pressable
                    onPress={() => decide(item.id, "active", item.productId)}
                    className="flex-row items-center justify-center rounded-xl bg-green-600 py-2.5"
                  >
                    <Ionicons name="play" size={16} color="#fff" />
                    <Text className="ml-1 text-sm font-semibold text-white">Mark as Active</Text>
                  </Pressable>
                </View>
              ) : item.status === "active" ? (
                <View className="mt-3 border-t border-slate-100 pt-3">
                  <Pressable
                    onPress={() => decide(item.id, "completed", item.productId)}
                    className="flex-row items-center justify-center rounded-xl bg-slate-600 py-2.5"
                  >
                    <Ionicons name="checkmark-done" size={16} color="#fff" />
                    <Text className="ml-1 text-sm font-semibold text-white">Mark Completed</Text>
                  </Pressable>
                </View>
              ) : undefined
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
