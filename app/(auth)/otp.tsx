import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpForm, otpSchema } from "@/utils/validation";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Otp() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role: Role }>();
  const { verifyOtp, pendingPhone, generatedOtp } = useAuthStore();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = (data: OtpForm) => {
    const ok = verifyOtp(data.otp, (role as Role) ?? "user");
    if (!ok) {
      setError("Invalid OTP. Try 1234 for the demo.");
      return;
    }
    const r = (role as Role) ?? "user";
    if (r === "vendor") router.replace("/(vendor)/dashboard");
    else if (r === "admin") router.replace("/(admin)/dashboard");
    else router.replace("/(user)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 px-6 pt-4">
        <Pressable onPress={() => router.back()} className="mb-6 h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>

        <Text className="text-2xl font-bold text-secondary">Verify OTP</Text>
        <Text className="mt-1 text-base text-muted">
          Enter the 4-digit code sent to {pendingPhone ?? "your number"}
        </Text>

        <View className="mt-8">
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <Input
                label="One-Time Password"
                icon="keypad-outline"
                keyboardType="number-pad"
                placeholder="1234"
                maxLength={4}
                value={value}
                onChangeText={(t) => {
                  setError("");
                  onChange(t);
                }}
                error={errors.otp?.message || error}
              />
            )}
          />
        </View>

        <Button label="Verify & Continue" icon="checkmark" onPress={handleSubmit(onSubmit)} />

        <View className="mt-6 flex-row items-center justify-center">
          <Text className="text-sm text-muted">Didn't get the code?{" "}</Text>
          <Pressable>
            <Text className="text-sm font-semibold text-primary">Resend</Text>
          </Pressable>
        </View>

        {generatedOtp && (
          <View className="mt-6 rounded-xl bg-primary/5 p-3">
            <Text className="text-center text-xs text-muted">
              Demo OTP: <Text className="font-bold text-primary">{generatedOtp}</Text>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
