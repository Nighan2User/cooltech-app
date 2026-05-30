import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneForm, phoneSchema } from "@/utils/validation";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";
import Input from "@/components/Input";
import Button from "@/components/Button";

const ROLES: { key: Role; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "user", label: "Renter", icon: "person" },
  { key: "vendor", label: "Vendor", icon: "storefront" },
  { key: "admin", label: "Admin", icon: "shield-checkmark" },
];

export default function Login() {
  const router = useRouter();
  const requestOtp = useAuthStore((s) => s.requestOtp);
  const [role, setRole] = useState<Role>("user");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "+1 202 555 0100" },
  });

  const onSubmit = (data: PhoneForm) => {
    requestOtp(data.phone);
    router.push({ pathname: "/(auth)/otp", params: { role } });
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-6 h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </Pressable>

          <Text className="text-2xl font-bold text-secondary">Welcome back</Text>
          <Text className="mt-1 text-base text-muted">
            Sign in with your mobile number to continue
          </Text>

          <Text className="mb-2 mt-7 text-sm font-medium text-secondary">I am a</Text>
          <View className="mb-6 flex-row justify-between">
            {ROLES.map((r) => {
              const active = role === r.key;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setRole(r.key)}
                  className={`mr-2 flex-1 items-center rounded-xl border py-3 ${
                    active ? "border-primary bg-primary/10" : "border-slate-200 bg-white"
                  }`}
                >
                  <Ionicons name={r.icon} size={22} color={active ? "#2563EB" : "#64748B"} />
                  <Text className={`mt-1 text-xs font-medium ${active ? "text-primary" : "text-muted"}`}>
                    {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Mobile Number"
                icon="call-outline"
                keyboardType="phone-pad"
                placeholder="+1 202 555 0100"
                value={value}
                onChangeText={onChange}
                error={errors.phone?.message}
              />
            )}
          />

          <Button label="Send OTP" icon="arrow-forward" onPress={handleSubmit(onSubmit)} />

          <View className="mt-6 rounded-xl bg-primary/5 p-3">
            <Text className="text-center text-xs text-muted">
              Demo mode: use OTP <Text className="font-bold text-primary">1234</Text> on the next screen
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
