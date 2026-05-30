import { FlatList, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { USERS } from "@/data/users";
import { useBookingStore } from "@/store/bookingStore";
import { formatDate } from "@/utils/format";

export default function AdminUsers() {
  const bookings = useBookingStore((s) => s.bookings);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">Users</Text>
        <Text className="text-sm text-muted">{USERS.length} registered renters</Text>
      </View>

      <FlatList
        data={USERS}
        keyExtractor={(u) => u.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const count = bookings.filter((b) => b.userId === item.id).length;
          return (
            <View className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
              ) : (
                <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Ionicons name="person" size={22} color="#2563EB" />
                </View>
              )}
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-secondary">{item.name}</Text>
                <Text className="text-xs text-muted">{item.phone}</Text>
                <Text className="text-xs text-muted">Joined {formatDate(item.createdAt)}</Text>
              </View>
              <View className="items-center">
                <Text className="text-lg font-bold text-primary">{count}</Text>
                <Text className="text-[10px] text-muted">bookings</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
