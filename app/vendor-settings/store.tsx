import { useState } from "react";
import { Alert, Platform, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function StoreSettings() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("ProTool Rentals");
  const [storeEmail, setStoreEmail] = useState("contact@protool.com");
  const [storePhone, setStorePhone] = useState("+1 234 567 8900");
  const [storeAddress, setStoreAddress] = useState("123 Tool Street, Equipment City");
  const [autoApprove, setAutoApprove] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [openHours, setOpenHours] = useState("9:00 AM - 6:00 PM");

  const handleSave = () => {
    if (Platform.OS === "web") {
      alert("Settings saved successfully!");
    } else {
      Alert.alert("Success", "Settings saved successfully!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-3">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="flex-1 text-xl font-bold text-secondary">Store Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {/* Basic Information */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-4 text-base font-semibold text-secondary">Basic Information</Text>
          
          <Text className="mb-1 text-sm font-medium text-secondary">Store Name</Text>
          <TextInput
            value={storeName}
            onChangeText={setStoreName}
            className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="Enter store name"
          />

          <Text className="mb-1 text-sm font-medium text-secondary">Email</Text>
          <TextInput
            value={storeEmail}
            onChangeText={setStoreEmail}
            className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Text className="mb-1 text-sm font-medium text-secondary">Phone</Text>
          <TextInput
            value={storePhone}
            onChangeText={setStorePhone}
            className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text className="mb-1 text-sm font-medium text-secondary">Address</Text>
          <TextInput
            value={storeAddress}
            onChangeText={setStoreAddress}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="Enter address"
            multiline
          />
        </View>

        {/* Operating Hours */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-4 text-base font-semibold text-secondary">Operating Hours</Text>
          
          <Text className="mb-1 text-sm font-medium text-secondary">Business Hours</Text>
          <TextInput
            value={openHours}
            onChangeText={setOpenHours}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-secondary"
            placeholder="e.g., 9:00 AM - 6:00 PM"
          />
        </View>

        {/* Preferences */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm" style={{ elevation: 1 }}>
          <Text className="mb-4 text-base font-semibold text-secondary">Preferences</Text>
          
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-sm font-medium text-secondary">Auto-approve Bookings</Text>
              <Text className="text-xs text-muted">Automatically approve rental requests</Text>
            </View>
            <Switch value={autoApprove} onValueChange={setAutoApprove} />
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-sm font-medium text-secondary">Email Notifications</Text>
              <Text className="text-xs text-muted">Receive updates via email</Text>
            </View>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>
        </View>

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          className="rounded-2xl bg-primary py-4"
          style={{ elevation: 2 }}
        >
          <Text className="text-center text-base font-semibold text-white">Save Changes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
