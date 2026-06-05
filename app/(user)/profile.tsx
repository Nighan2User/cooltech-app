import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useFavoritesStore } from "@/store/favoritesStore";

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

  const myAccountRows: Row[] = [
    { icon: "person-outline", label: "Personal Information", onPress: () => router.push("/(user)/edit-profile") },
    { icon: "location-outline", label: "Saved Addresses", onPress: () => router.push("/(user)/favorites") },
    { icon: "card-outline", label: "Payment Methods", onPress: () => router.push("/(user)/favorites") },
    { icon: "shield-checkmark-outline", label: "KYC Verification", value: "Verified" },
    { icon: "receipt-outline", label: "Rental History", onPress: () => router.push("/(user)/bookings") },
  ];

  const othersRows: Row[] = [
    { icon: "help-circle-outline", label: "Help & Support", onPress: () => router.push("/(user)/support") },
    { icon: "settings-outline", label: "Settings", onPress: () => router.push("/(user)/support") },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Blue header with profile info */}
        <View className="bg-primary px-5 py-6">
          <View className="flex-row items-center">
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <View className="h-20 w-20 items-center justify-center rounded-full bg-white/20" style={{ width: 80, height: 80 }}>
                <Ionicons name="person" size={40} color="#fff" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-white">{user?.name}</Text>
              <Text className="text-sm text-white/80">{user?.email || "user@example.com"}</Text>
              <Text className="text-sm text-white/80">{user?.phone}</Text>
            </View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* My Account Section */}
        <View className="mx-5 mt-6">
          <Text className="mb-2 text-sm font-semibold text-muted">My Account</Text>
          <View className="rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
            {myAccountRows.map((row, i) => (
              <Pressable
                key={row.label}
                onPress={row.onPress}
                className={`flex-row items-center px-4 py-4 ${
                  i < myAccountRows.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name={row.icon} size={18} color="#0F172A" />
                </View>
                <Text className="ml-3 flex-1 text-base text-secondary">{row.label}</Text>
                {row.value === "Verified" && (
                  <View className="mr-2 flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text className="ml-1 text-xs font-semibold text-emerald-600">{row.value}</Text>
                  </View>
                )}
                {!row.value && <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Others Section */}
        <View className="mx-5 mt-6">
          <Text className="mb-2 text-sm font-semibold text-muted">Others</Text>
          <View className="rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
            {othersRows.map((row, i) => (
              <Pressable
                key={row.label}
                onPress={row.onPress}
                className={`flex-row items-center px-4 py-4 ${
                  i < othersRows.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name={row.icon} size={18} color="#0F172A" />
                </View>
                <Text className="ml-3 flex-1 text-base text-secondary">{row.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="mx-5 mt-6">
          <Pressable
            onPress={confirmLogout}
            className="flex-row items-center justify-center rounded-2xl bg-red-50 py-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="ml-2 text-base font-semibold text-red-600">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
