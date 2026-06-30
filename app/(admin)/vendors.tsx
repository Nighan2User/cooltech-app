import { FlatList, Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useVendorStore } from "@/store/vendorStore";
import { useNotificationStore } from "@/store/notificationStore";

export default function AdminVendors() {
  const { vendors, setVerified } = useVendorStore();
  const pushNotif = useNotificationStore((s) => s.push);

  const toggle = (id: string, name: string, next: boolean) => {
    setVerified(id, next);
    if (next) {
      pushNotif({
        title: "Vendor Approved",
        body: `${name} has been verified by admin.`,
        type: "approval",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="px-5 pb-3 pt-2">
        <Text className="text-2xl font-bold text-secondary">Vendors</Text>
        <Text className="text-sm text-muted">Manage and verify vendor accounts</Text>
      </View>

      <FlatList
        data={vendors}
        keyExtractor={(v) => v.id}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
            <View className="flex-row items-center">
              <Image source={{ uri: item.logo }} style={{ width: 48, height: 48, borderRadius: 24 }} />
              <View className="ml-3 flex-1">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-secondary">{item.name}</Text>
                  {item.verified && <Ionicons name="checkmark-circle" size={15} color="#2563EB" style={{ marginLeft: 4 }} />}
                </View>
                <Text className="text-xs text-muted">{item.email}</Text>
                <Text className="text-xs text-muted">⭐ {item.rating} • {item.totalProducts} products</Text>
              </View>
            </View>
            <View className="mt-3 border-t border-slate-100 pt-3">
              {item.verified ? (
                <Pressable
                  onPress={() => toggle(item.id, item.name, false)}
                  className="flex-row items-center justify-center rounded-xl bg-red-50 py-2.5"
                >
                  <Ionicons name="close-circle-outline" size={16} color="#DC2626" />
                  <Text className="ml-1 text-sm font-semibold text-red-600">Revoke Verification</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => toggle(item.id, item.name, true)}
                  className="flex-row items-center justify-center rounded-xl bg-primary py-2.5"
                >
                  <Ionicons name="shield-checkmark" size={16} color="#fff" />
                  <Text className="ml-1 text-sm font-semibold text-white">Verify Vendor</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
