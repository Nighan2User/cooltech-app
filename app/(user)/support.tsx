import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SUPPORT } from "@/constants/theme";

const FAQS = [
  {
    q: "How do I book a rental?",
    a: "Open a product, pick your dates and quantity, then tap Book Now. The vendor will approve your request.",
  },
  {
    q: "When am I charged?",
    a: "Payment is collected at checkout. In this demo, payments are simulated and no real charge occurs.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. Open the booking from My Bookings and tap Cancel Booking while it is pending or approved.",
  },
  {
    q: "How is delivery handled?",
    a: "Delivery options depend on the vendor. Contact the vendor directly using the details on the booking screen.",
  },
];

export default function Support() {
  const router = useRouter();

  const channels = [
    {
      icon: "call" as const,
      label: "Call Support",
      value: SUPPORT.phone,
      color: "#2563EB",
      action: () => Linking.openURL(`tel:${SUPPORT.phone}`),
    },
    {
      icon: "logo-whatsapp" as const,
      label: "WhatsApp",
      value: SUPPORT.whatsapp,
      color: "#16A34A",
      action: () => Linking.openURL(`https://wa.me/${SUPPORT.whatsapp.replace(/[^0-9]/g, "")}`),
    },
    {
      icon: "mail" as const,
      label: "Email Us",
      value: SUPPORT.email,
      color: "#EC4899",
      action: () => Linking.openURL(`mailto:${SUPPORT.email}`),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">Contact & Support</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {channels.map((c) => (
          <Pressable
            key={c.label}
            onPress={c.action}
            className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: `${c.color}1A` }}>
              <Ionicons name={c.icon} size={22} color={c.color} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-base font-semibold text-secondary">{c.label}</Text>
              <Text className="text-sm text-muted">{c.value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
          </Pressable>
        ))}

        <Text className="mb-2 mt-6 text-lg font-bold text-secondary">FAQ</Text>
        {FAQS.map((f) => (
          <View key={f.q} className="mb-3 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
            <Text className="text-base font-semibold text-secondary">{f.q}</Text>
            <Text className="mt-1 text-sm leading-5 text-muted">{f.a}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
