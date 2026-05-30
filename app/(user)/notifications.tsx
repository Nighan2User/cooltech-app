import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationStore } from "@/store/notificationStore";
import { timeAgo } from "@/utils/format";
import EmptyState from "@/components/EmptyState";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  booking: "checkmark-circle",
  approval: "shield-checkmark",
  update: "information-circle",
  promo: "pricetag",
};

const TINT: Record<string, string> = {
  booking: "#16A34A",
  approval: "#2563EB",
  update: "#F59E0B",
  promo: "#EC4899",
};

export default function Notifications() {
  const router = useRouter();
  const { notifications, markAllRead, markRead } = useNotificationStore();

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 pb-2 pt-2">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </Pressable>
          <Text className="ml-2 text-xl font-bold text-secondary">Notifications</Text>
        </View>
        <Pressable onPress={markAllRead}>
          <Text className="text-sm font-medium text-primary">Mark all read</Text>
        </Pressable>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(n) => n.id}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        ListEmptyComponent={<EmptyState icon="notifications-outline" title="No notifications" />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => markRead(item.id)}
            className={`mb-3 flex-row rounded-2xl p-3.5 shadow-sm ${item.read ? "bg-white" : "bg-primary/5"}`}
            style={{ elevation: 1 }}
          >
            <View
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${TINT[item.type]}1A` }}
            >
              <Ionicons name={ICONS[item.type]} size={20} color={TINT[item.type]} />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-secondary">{item.title}</Text>
                {!item.read && <View className="h-2 w-2 rounded-full bg-primary" />}
              </View>
              <Text className="mt-0.5 text-sm text-muted">{item.body}</Text>
              <Text className="mt-1 text-xs text-slate-400">{timeAgo(item.createdAt)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
