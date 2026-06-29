import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoyaltyRewards() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center border-b border-slate-200 bg-white px-5 py-4">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-slate-900">Loyalty Rewards</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        {/* Points Card */}
        <View className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-600 p-6 shadow-lg">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-white/80">Available Points</Text>
              <Text className="mt-1 text-4xl font-bold text-white">2,450</Text>
            </View>
            <View className="h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Ionicons name="gift" size={32} color="#fff" />
            </View>
          </View>
          <Text className="text-sm text-white/90">Earn points with every rental and redeem for rewards!</Text>
        </View>

        {/* How it Works */}
        <View className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <Text className="mb-4 text-lg font-bold text-slate-900">How It Works</Text>
          <View className="space-y-3">
            <View className="flex-row items-start">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Text className="font-bold text-primary">1</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-900">Earn Points</Text>
                <Text className="text-sm text-slate-600">Get 10 points for every ₹100 spent</Text>
              </View>
            </View>
            <View className="flex-row items-start">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Text className="font-bold text-primary">2</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-900">Collect Rewards</Text>
                <Text className="text-sm text-slate-600">Accumulate points from all rentals</Text>
              </View>
            </View>
            <View className="flex-row items-start">
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <Text className="font-bold text-primary">3</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-900">Redeem</Text>
                <Text className="text-sm text-slate-600">Use points for discounts on future rentals</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rewards Catalog */}
        <View className="rounded-2xl bg-white p-5 shadow-sm">
          <Text className="mb-4 text-lg font-bold text-slate-900">Redeem Rewards</Text>
          {[
            { points: 500, discount: "₹50", title: "₹50 Off" },
            { points: 1000, discount: "₹100", title: "₹100 Off" },
            { points: 2000, discount: "₹250", title: "₹250 Off" },
            { points: 5000, discount: "₹750", title: "₹750 Off" },
          ].map((reward) => (
            <View
              key={reward.points}
              className="mb-3 flex-row items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                  <Ionicons name="star" size={24} color="#F59E0B" />
                </View>
                <View>
                  <Text className="font-semibold text-slate-900">{reward.title}</Text>
                  <Text className="text-sm text-slate-600">{reward.points} points</Text>
                </View>
              </View>
              <Pressable
                className="rounded-full bg-primary px-4 py-2"
                disabled={2450 < reward.points}
                style={{ opacity: 2450 < reward.points ? 0.5 : 1 }}
              >
                <Text className="text-sm font-semibold text-white">Redeem</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
