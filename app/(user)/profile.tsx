import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useCartStore } from "@/store/cartStore";

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  value?: string;
  badge?: number;
  iconBg?: string;
  iconColor?: string;
}

interface Section {
  title: string;
  rows: Row[];
}

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const allBookings = useBookingStore((s) => s.bookings);
  const bookings = allBookings.filter((b) => b.userId === "u1" || b.userId === user?.id);
  const favCount = useFavoritesStore((s) => s.ids.length);
  const cartCount = useCartStore((s) => s.items.length);
  const activeBookings = bookings.filter((b) => ["pending", "approved", "active"].includes(b.status)).length;

  const confirmLogout = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to log out?")) {
        logout();
        router.replace("/(auth)/welcome");
      }
      return;
    }
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

  const sections: Section[] = [
    {
      title: "Account",
      rows: [
        { 
          icon: "person-outline", 
          label: "Personal Information", 
          onPress: () => router.push("/(user)/edit-profile"),
          iconBg: "#EEF2FF",
          iconColor: "#6366F1"
        },
        { 
          icon: "shield-checkmark-outline", 
          label: "Identity Verification", 
          value: user?.isVerified ? "Verified" : "Not Verified",
          onPress: () => router.push("/(user)/verify-identity"),
          iconBg: user?.isVerified ? "#D1FAE5" : "#FEF3C7",
          iconColor: user?.isVerified ? "#10B981" : "#F59E0B"
        },
      ],
    },
    {
      title: "Rentals",
      rows: [
        { 
          icon: "calendar-outline", 
          label: "My Bookings", 
          badge: activeBookings,
          onPress: () => router.push("/(user)/bookings"),
          iconBg: "#DBEAFE",
          iconColor: "#3B82F6"
        },
        { 
          icon: "heart-outline", 
          label: "Wishlist", 
          badge: favCount,
          onPress: () => router.push("/(user)/favorites"),
          iconBg: "#FCE7F3",
          iconColor: "#EC4899"
        },
        { 
          icon: "time-outline", 
          label: "Recently Viewed", 
          onPress: () => router.push("/(user)/products"),
          iconBg: "#E0E7FF",
          iconColor: "#818CF8"
        },
        { 
          icon: "cart-outline", 
          label: "Shopping Cart", 
          badge: cartCount,
          onPress: () => router.push("/(user)/cart"),
          iconBg: "#FEE2E2",
          iconColor: "#EF4444"
        },
      ],
    },
    {
      title: "Payments",
      rows: [
        { 
          icon: "wallet-outline", 
          label: "Wallet", 
          onPress: () => router.push("/(user)/wallet"),
          iconBg: "#D1FAE5",
          iconColor: "#059669"
        },
        { 
          icon: "pricetag-outline", 
          label: "Coupons & Offers", 
          onPress: () => router.push("/(user)/coupons"),
          iconBg: "#FEF3C7",
          iconColor: "#D97706"
        },
        { 
          icon: "gift-outline", 
          label: "Loyalty Rewards", 
          onPress: () => router.push("/(user)/loyalty"),
          iconBg: "#FECACA",
          iconColor: "#DC2626"
        },
      ],
    },
    {
      title: "Preferences",
      rows: [
        { 
          icon: "notifications-outline", 
          label: "Notifications", 
          onPress: () => router.push("/(user)/notifications"),
          iconBg: "#FEE2E2",
          iconColor: "#F87171"
        },
        { 
          icon: "language-outline", 
          label: "Language", 
          value: "English",
          onPress: () => router.push("/(user)/language"),
          iconBg: "#E0E7FF",
          iconColor: "#6366F1"
        },
        { 
          icon: "moon-outline", 
          label: "Dark Mode", 
          value: "Off",
          onPress: () => router.push("/(user)/settings"),
          iconBg: "#E0E7FF",
          iconColor: "#4F46E5"
        },
      ],
    },
    {
      title: "Support",
      rows: [
        { 
          icon: "help-circle-outline", 
          label: "Help Center", 
          onPress: () => router.push("/(user)/support"),
          iconBg: "#DBEAFE",
          iconColor: "#2563EB"
        },
        { 
          icon: "chatbubble-ellipses-outline", 
          label: "Contact Support", 
          onPress: () => router.push("/(user)/messages"),
          iconBg: "#E0E7FF",
          iconColor: "#7C3AED"
        },
      ],
    },
    {
      title: "Legal",
      rows: [
        { 
          icon: "document-text-outline", 
          label: "Privacy Policy", 
          onPress: () => router.push("/(user)/support"),
          iconBg: "#F3F4F6",
          iconColor: "#6B7280"
        },
        { 
          icon: "shield-outline", 
          label: "Terms & Conditions", 
          onPress: () => router.push("/(user)/support"),
          iconBg: "#F3F4F6",
          iconColor: "#6B7280"
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header with profile info */}
        <View className="bg-gradient-to-br from-primary to-blue-600 px-5 pb-8 pt-4">
          <Text className="mb-6 text-2xl font-bold text-white">Profile</Text>
          <Pressable 
            onPress={() => router.push("/(user)/edit-profile")}
            className="flex-row items-center"
          >
            {user?.avatar ? (
              <Image 
                source={{ uri: user.avatar }} 
                style={{ width: 72, height: 72, borderRadius: 36 }} 
              />
            ) : (
              <View 
                className="items-center justify-center rounded-full bg-white/25" 
                style={{ width: 72, height: 72 }}
              >
                <Ionicons name="person" size={36} color="#fff" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-white">{user?.name || "Guest User"}</Text>
              <Text className="mt-0.5 text-sm text-white/90">{user?.email || "user@example.com"}</Text>
              {user?.phone && <Text className="mt-0.5 text-sm text-white/80">{user.phone}</Text>}
            </View>
            <View className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </View>
          </Pressable>
        </View>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <View key={section.title} className="mt-6 px-5">
            <Text className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {section.title}
            </Text>
            <View className="overflow-hidden rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
              {section.rows.map((row, rowIndex) => (
                <Pressable
                  key={row.label}
                  onPress={row.onPress}
                  className={`flex-row items-center px-4 py-4 ${
                    rowIndex < section.rows.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                  style={({ pressed }) => ({
                    backgroundColor: pressed ? "#F8FAFC" : "transparent",
                  })}
                >
                  <View 
                    className="h-10 w-10 items-center justify-center rounded-full" 
                    style={{ backgroundColor: row.iconBg || "#F1F5F9" }}
                  >
                    <Ionicons 
                      name={row.icon} 
                      size={20} 
                      color={row.iconColor || "#64748B"} 
                    />
                  </View>
                  <Text className="ml-3 flex-1 text-base font-medium text-slate-800">
                    {row.label}
                  </Text>
                  {row.badge !== undefined && row.badge > 0 && (
                    <View className="mr-2 min-w-6 items-center justify-center rounded-full bg-primary px-2 py-0.5">
                      <Text className="text-xs font-bold text-white">
                        {row.badge > 99 ? "99+" : row.badge}
                      </Text>
                    </View>
                  )}
                  {row.value && (
                    <Text className="mr-2 text-sm font-medium text-slate-500">{row.value}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View className="mx-5 mt-8 mb-4">
          <Pressable
            onPress={confirmLogout}
            className="flex-row items-center justify-center rounded-2xl bg-red-50 py-4 shadow-sm"
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#FEE2E2" : "#FEF2F2",
              elevation: 1,
            })}
          >
            <Ionicons name="log-out-outline" size={22} color="#DC2626" />
            <Text className="ml-2 text-base font-bold text-red-600">Logout</Text>
          </Pressable>
        </View>

        {/* App Version */}
        <View className="items-center pb-4">
          <Text className="text-xs text-slate-400">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
