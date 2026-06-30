import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Transaction = {
  id: string;
  date: string;
  product: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "refunded";
};

export default function EarningsReport() {
  const router = useRouter();
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const stats = {
    totalEarnings: 12450.50,
    pendingPayouts: 2340.00,
    completedBookings: 87,
    activeBookings: 12,
  };

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "Jun 28, 2026",
      product: "Makita Hammer Drill",
      customer: "John Smith",
      amount: 150.00,
      status: "completed",
    },
    {
      id: "2",
      date: "Jun 27, 2026",
      product: "DeWalt Circular Saw",
      customer: "Sarah Johnson",
      amount: 180.00,
      status: "completed",
    },
    {
      id: "3",
      date: "Jun 26, 2026",
      product: "Bosch Angle Grinder",
      customer: "Mike Wilson",
      amount: 95.00,
      status: "pending",
    },
    {
      id: "4",
      date: "Jun 25, 2026",
      product: "Milwaukee Impact Driver",
      customer: "Emily Davis",
      amount: 120.00,
      status: "completed",
    },
    {
      id: "5",
      date: "Jun 24, 2026",
      product: "Ryobi Nail Gun",
      customer: "Tom Brown",
      amount: 200.00,
      status: "refunded",
    },
  ];

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-amber-600 bg-amber-100";
      case "refunded":
        return "text-red-600 bg-red-100";
    }
  };

  const getStatusText = (status: Transaction["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-3">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-secondary">Earnings Report</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Period Selector */}
        <View className="mb-6 flex-row rounded-2xl bg-white p-1.5 shadow-sm" style={{ elevation: 1 }}>
          {(["week", "month", "year"] as const).map((p) => (
            <Pressable
              key={p}
              onPress={() => setPeriod(p)}
              className={`flex-1 rounded-xl py-2.5 ${period === p ? "bg-primary" : ""}`}
            >
              <Text className={`text-center text-sm font-medium ${period === p ? "text-white" : "text-muted"}`}>
                {p === "week" ? "This Week" : p === "month" ? "This Month" : "This Year"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Stats Grid */}
        <View className="mb-6 flex-row flex-wrap">
          <View className="mb-3 w-1/2 pr-1.5">
            <View className="rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Ionicons name="cash-outline" size={20} color="#16A34A" />
              </View>
              <Text className="text-2xl font-bold text-secondary">${stats.totalEarnings.toFixed(2)}</Text>
              <Text className="text-xs text-muted">Total Earnings</Text>
            </View>
          </View>

          <View className="mb-3 w-1/2 pl-1.5">
            <View className="rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Ionicons name="time-outline" size={20} color="#F59E0B" />
              </View>
              <Text className="text-2xl font-bold text-secondary">${stats.pendingPayouts.toFixed(2)}</Text>
              <Text className="text-xs text-muted">Pending Payouts</Text>
            </View>
          </View>

          <View className="w-1/2 pr-1.5">
            <View className="rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="checkmark-circle-outline" size={20} color="#2563EB" />
              </View>
              <Text className="text-2xl font-bold text-secondary">{stats.completedBookings}</Text>
              <Text className="text-xs text-muted">Completed</Text>
            </View>
          </View>

          <View className="w-1/2 pl-1.5">
            <View className="rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
              <View className="mb-2 h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Ionicons name="trending-up-outline" size={20} color="#9333EA" />
              </View>
              <Text className="text-2xl font-bold text-secondary">{stats.activeBookings}</Text>
              <Text className="text-xs text-muted">Active</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-secondary">Recent Transactions</Text>
          <Pressable>
            <Text className="text-sm font-medium text-primary">View All</Text>
          </Pressable>
        </View>

        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <View className="mb-2 flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-secondary">{transaction.product}</Text>
                <Text className="text-sm text-muted">{transaction.customer}</Text>
              </View>
              <Text className="text-lg font-bold text-secondary">${transaction.amount.toFixed(2)}</Text>
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-muted">{transaction.date}</Text>
              <View className={`rounded-full px-2.5 py-1 ${getStatusColor(transaction.status)}`}>
                <Text className="text-xs font-medium">{getStatusText(transaction.status)}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Export Button */}
        <Pressable
          className="mt-4 flex-row items-center justify-center rounded-2xl border border-slate-300 bg-white py-4"
          style={{ elevation: 1 }}
        >
          <Ionicons name="download-outline" size={20} color="#2563EB" />
          <Text className="ml-2 text-base font-semibold text-primary">Export Report</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
