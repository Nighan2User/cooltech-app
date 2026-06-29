import { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type PayoutMethod = {
  id: string;
  type: "bank" | "paypal" | "card";
  name: string;
  details: string;
  isDefault: boolean;
};

export default function PayoutMethods() {
  const router = useRouter();
  const [methods, setMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "Chase Bank",
      details: "••••4567",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      name: "PayPal",
      details: "vendor@protool.com",
      isDefault: false,
    },
  ]);

  const getIcon = (type: PayoutMethod["type"]) => {
    switch (type) {
      case "bank":
        return "business-outline";
      case "paypal":
        return "logo-paypal";
      case "card":
        return "card-outline";
    }
  };

  const handleSetDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    if (Platform.OS === "web") {
      alert("Default payout method updated");
    } else {
      Alert.alert("Success", "Default payout method updated");
    }
  };

  const handleRemove = (id: string) => {
    const method = methods.find(m => m.id === id);
    if (method?.isDefault) {
      if (Platform.OS === "web") {
        alert("Cannot remove default payout method");
      } else {
        Alert.alert("Error", "Cannot remove default payout method");
      }
      return;
    }

    const confirmAction = () => {
      setMethods(methods.filter(m => m.id !== id));
    };

    if (Platform.OS === "web") {
      if (window.confirm("Remove this payout method?")) {
        confirmAction();
      }
    } else {
      Alert.alert("Remove Method", "Remove this payout method?", [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: confirmAction },
      ]);
    }
  };

  const handleAddNew = () => {
    if (Platform.OS === "web") {
      alert("Add new payout method screen");
    } else {
      Alert.alert("Add Method", "Add new payout method screen");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-3">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-secondary">Payout Methods</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Info Banner */}
        <View className="mb-6 flex-row items-start rounded-2xl bg-blue-50 p-4">
          <Ionicons name="information-circle" size={22} color="#2563EB" />
          <Text className="ml-2 flex-1 text-xs text-blue-900">
            Payouts are processed every Monday. It takes 2-3 business days for funds to reach your account.
          </Text>
        </View>

        {/* Payment Methods */}
        <Text className="mb-3 text-base font-semibold text-secondary">Your Payment Methods</Text>
        
        {methods.map((method) => (
          <View
            key={method.id}
            className="mb-3 rounded-2xl bg-white p-4 shadow-sm"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-center">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Ionicons name={getIcon(method.type)} size={24} color="#0F172A" />
              </View>
              
              <View className="ml-3 flex-1">
                <Text className="text-base font-semibold text-secondary">{method.name}</Text>
                <Text className="text-sm text-muted">{method.details}</Text>
              </View>

              {method.isDefault && (
                <View className="rounded-full bg-green-100 px-3 py-1">
                  <Text className="text-xs font-medium text-green-800">Default</Text>
                </View>
              )}
            </View>

            <View className="mt-4 flex-row">
              {!method.isDefault && (
                <Pressable
                  onPress={() => handleSetDefault(method.id)}
                  className="mr-2 flex-1 rounded-xl border border-primary py-2.5"
                >
                  <Text className="text-center text-sm font-medium text-primary">Set as Default</Text>
                </Pressable>
              )}
              
              <Pressable
                onPress={() => handleRemove(method.id)}
                className={`flex-1 rounded-xl border border-red-200 py-2.5 ${method.isDefault ? "opacity-50" : ""}`}
                disabled={method.isDefault}
              >
                <Text className="text-center text-sm font-medium text-red-600">Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Add New Button */}
        <Pressable
          onPress={handleAddNew}
          className="mt-4 flex-row items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-4"
        >
          <Ionicons name="add-circle-outline" size={22} color="#2563EB" />
          <Text className="ml-2 text-base font-semibold text-primary">Add New Method</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
