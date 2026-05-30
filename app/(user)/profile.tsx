import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { SUPPORT } from "@/constants/theme";

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  danger?: boolean;
  value?: string;
}

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const allBookings = useBookingStore((s) => s.bookings);
  const bookings = allBookings.filter((b) => b.userId === "u1" || b.userId === user?.id);
  const favCount = useFavoritesStore((s) => s.ids.length);

  const confirmLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          logout();
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  };

  const sections: { title: string; rows: Row[] }[] = [
    {
      title: "Account",
      rows: [
        { icon: "person-outline", label: "Edit Profile", onPress: () => router.push("/(user)/edit-profile") },
        { icon: "receipt-outline", label: "Booking History", onPress: () => router.push("/(user)/bookings") },
        { icon: "heart-outline", label: "Saved Rentals", value: `${favCount}`, onPress: () => router.push("/(user)/favorites") },
        { icon: "notifications-outline", label: "Notifications", onPress: () => router.push("/(user)/notifications") },
      ],
    },
    {
      title: "Support",
      rows: [
        { icon: "call-outline", label: "Call Support", value: SUPPORT.phone, onPress: () => router.push("/(user)/support") },
        { icon: "logo-whatsapp", label: "WhatsApp", onPress: () => router.push("/(user)/support") },
        { icon: "help-circle-outline", label: "FAQ & Help", onPress: () => router.push("/(user)/support") },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text className="px-5 pb-3 pt-2 text-2xl font-bold text-secondary">Profile</Text>

        {/* Profile card */}
        <View className="mx-5 flex-row items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
          ) : (
            <View className="h-15 w-15 items-center justify-center rounded-full bg-primary/10" style={{ width: 60, height: 60 }}>
              <Ionicons name="person" size={28} color="#2563EB" />
            </View>
          )}
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-secondary">{user?.name}</Text>
            <Text className="text-sm text-muted">{user?.phone}</Text>
            <View className="mt-1 self-start rounded-full bg-primary/10 px-2 py-0.5">
              <Text className="text-[10px] font-semibold uppercase text-primary">{user?.role}</Text>
            </View>
          </View>
        </View>

        {/* Quick stats */}
        <View className="mx-5 mt-4 flex-row justify-between rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-secondary">{bookings.length}</Text>
            <Text className="text-xs text-muted">Bookings</Text>
          </View>
          <View className="w-px bg-slate-100" />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-secondary">{favCount}</Text>
            <Text className="text-xs text-muted">Saved</Text>
          </View>
          <View className="w-px bg-slate-100" />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-secondary">
              {bookings.filter((b) => b.status === "completed").length}
            </Text>
            <Text className="text-xs text-muted">Completed</Text>
          </View>
        </View>

        {sections.map((section) => (
          <View key={section.title} className="mt-6 px-5">
            <Text className="mb-2 text-sm font-semibold text-muted">{section.title}</Text>
            <View className="rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
              {section.rows.map((row, i) => (
                <Pressable
                  key={row.label}
                  onPress={row.onPress}
                  className={`flex-row items-center px-4 py-3.5 ${
                    i < section.rows.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <Ionicons name={row.icon} size={18} color="#0F172A" />
                  </View>
                  <Text className="ml-3 flex-1 text-base text-secondary">{row.label}</Text>
                  {row.value && <Text className="mr-2 text-sm text-muted">{row.value}</Text>}
                  <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <View className="mt-6 px-5">
          <Pressable
            onPress={confirmLogout}
            className="flex-row items-center justify-center rounded-2xl bg-white py-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="ml-2 text-base font-semibold text-red-600">Log out</Text>
          </Pressable>
          <Text className="mt-4 text-center text-xs text-muted">Cooltech Rental v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
