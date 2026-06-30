import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import { getVendor } from "@/data/vendors";
import { DEMO_VENDOR_ID } from "@/constants/session";

export default function VendorAccount() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const vendor = getVendor(DEMO_VENDOR_ID);

  const confirmLogout = () => {
    if (Platform.OS === "web") {
      // Alert.alert is a no-op on web — use the browser's native confirm dialog
      if (window.confirm("Log out of vendor account?")) {
        logout();
        router.replace("/(auth)/welcome");
      }
      return;
    }
    Alert.alert("Log out", "Log out of vendor account?", [
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

  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; route: string }[] = [
    { 
      icon: "storefront-outline", 
      label: "Store Settings",
      route: "/vendor-settings/store"
    },
    { 
      icon: "card-outline", 
      label: "Payout Methods",
      route: "/vendor-settings/payout"
    },
    { 
      icon: "bar-chart-outline", 
      label: "Earnings Report",
      route: "/vendor-settings/earnings"
    },
    { 
      icon: "help-circle-outline", 
      label: "Help & Support",
      route: "/vendor-settings/support"
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text className="px-5 pb-3 pt-2 text-2xl font-bold text-secondary">Vendor Account</Text>

        <View className="mx-5 flex-row items-center rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Image source={{ uri: vendor?.logo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
          <View className="ml-4 flex-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-secondary">{vendor?.name}</Text>
              {vendor?.verified && <Ionicons name="checkmark-circle" size={16} color="#2563EB" style={{ marginLeft: 4 }} />}
            </View>
            <Text className="text-sm text-muted">{vendor?.email}</Text>
            <Text className="text-xs text-muted">⭐ {vendor?.rating} · {vendor?.totalProducts} products</Text>
          </View>
        </View>

        {!vendor?.verified && (
          <View className="mx-5 mt-4 flex-row items-center rounded-2xl bg-amber-50 p-4">
            <Ionicons name="alert-circle" size={22} color="#F59E0B" />
            <Text className="ml-2 flex-1 text-xs text-amber-800">
              Your account is pending verification by the admin team.
            </Text>
          </View>
        )}

        <View className="mt-6 px-5">
          <View className="rounded-2xl bg-white shadow-sm" style={{ elevation: 1 }}>
            {rows.map((row, i) => (
              <Link
                key={row.label}
                href={row.route as any}
                asChild
              >
                <Pressable
                  className={`flex-row items-center px-4 py-3.5 ${i < rows.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                    <Ionicons name={row.icon} size={18} color="#0F172A" />
                  </View>
                  <Text className="ml-3 flex-1 text-base text-secondary">{row.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        <View className="mt-6 px-5">
          <Pressable
            onPress={confirmLogout}
            className="flex-row items-center justify-center rounded-2xl bg-white py-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="ml-2 text-base font-semibold text-red-600">Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
