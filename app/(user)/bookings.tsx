import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookingStore } from "@/store/bookingStore";
import { useAuthStore } from "@/store/authStore";
import { BookingStatus } from "@/types";
import BookingCard from "@/components/BookingCard";
import EmptyState from "@/components/EmptyState";

const TABS: { key: "all" | "active" | "completed"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "History" },
];

const ACTIVE: BookingStatus[] = ["pending", "approved", "active"];
const DONE: BookingStatus[] = ["completed", "cancelled", "rejected"];

export default function Bookings() {
  const router = useRouter();
  const bookings = useBookingStore((s) => s.bookings);
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<"all" | "active" | "completed">("all");

  const mine = bookings.filter((b) => b.userId === "u1" || b.userId === user?.id);
  const filtered = mine.filter((b) => {
    if (tab === "active") return ACTIVE.includes(b.status);
    if (tab === "completed") return DONE.includes(b.status);
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">My Bookings</Text>
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
              <Text className={`text-sm font-medium ${active ? "text-white" : "text-muted"}`}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookingCard booking={item} onPress={() => router.push(`/booking/${item.id}`)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="No bookings yet"
            subtitle="Your rental bookings will appear here once you book a product."
          />
        }
      />
    </SafeAreaView>
  );
}
