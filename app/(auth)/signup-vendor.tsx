import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/authStore";
import Button from "@/components/Button";

export default function SignupVendor() {
  const router = useRouter();
  const requestOtp = useAuthStore((s) => s.requestOtp);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const isValid = formData.businessName.trim() && formData.email.trim() && formData.phone.trim() && formData.address.trim();

  const handleSignup = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      requestOtp(formData.phone);
      router.push({
        pathname: "/(auth)/otp",
        params: { role: "vendor", name: formData.businessName, email: formData.email },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-6 h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </Pressable>

          <Text className="text-2xl font-bold text-secondary">Create Vendor Account</Text>
          <Text className="mt-1 text-base text-muted">
            Start your rental business and earn with us
          </Text>

          {/* Business Name Input */}
          <View className="mt-8">
            <Text className="mb-2 text-sm font-semibold text-secondary">Business Name *</Text>
            <TextInput
              placeholder="e.g., Tech Rentals Inc."
              placeholderTextColor="#94A3B8"
              value={formData.businessName}
              onChangeText={(text) => setFormData({ ...formData, businessName: text })}
              className="rounded-2xl bg-white px-4 py-3 text-base text-secondary border border-slate-200"
            />
          </View>

          {/* Email Input */}
          <View className="mt-5">
            <Text className="mb-2 text-sm font-semibold text-secondary">Email Address *</Text>
            <TextInput
              placeholder="e.g., vendor@example.com"
              placeholderTextColor="#94A3B8"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              className="rounded-2xl bg-white px-4 py-3 text-base text-secondary border border-slate-200"
            />
          </View>

          {/* Phone Input */}
          <View className="mt-5">
            <Text className="mb-2 text-sm font-semibold text-secondary">Mobile Number *</Text>
            <TextInput
              placeholder="e.g., +1 202 555 0100"
              placeholderTextColor="#94A3B8"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              className="rounded-2xl bg-white px-4 py-3 text-base text-secondary border border-slate-200"
            />
          </View>

          {/* Business Address Input */}
          <View className="mt-5">
            <Text className="mb-2 text-sm font-semibold text-secondary">Business Address *</Text>
            <TextInput
              placeholder="e.g., 123 Tech Plaza, New York, NY"
              placeholderTextColor="#94A3B8"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              multiline
              numberOfLines={2}
              className="rounded-2xl bg-white px-4 py-3 text-base text-secondary border border-slate-200"
              style={{ textAlignVertical: "top" }}
            />
          </View>

          {/* Verification Note */}
          <View className="mt-6 flex-row items-start rounded-xl bg-blue-50 p-3">
            <Ionicons name="information-circle" size={18} color="#2563EB" />
            <Text className="ml-2 flex-1 text-xs text-blue-700">
              We'll verify your business details and send a code to your phone
            </Text>
          </View>

          <View className="flex-1" />

          <Button
            label={loading ? "Creating Account..." : "Continue"}
            icon="arrow-forward"
            loading={loading}
            onPress={handleSignup}
            disabled={!isValid}
          />

          <View className="flex-row items-center justify-center py-5">
            <Text className="text-sm text-muted">Already have an account? </Text>
            <Pressable onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-sm font-semibold text-primary">Sign in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
