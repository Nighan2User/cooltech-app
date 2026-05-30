import { Pressable, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileForm, profileSchema } from "@/utils/validation";
import { useAuthStore } from "@/store/authStore";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    },
  });

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="chevron-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-2 text-xl font-bold text-secondary">Edit Profile</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input label="Full Name" icon="person-outline" value={value} onChangeText={onChange} error={errors.name?.message} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input label="Mobile Number" icon="call-outline" keyboardType="phone-pad" value={value} onChangeText={onChange} error={errors.phone?.message} />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <Input label="Address" icon="location-outline" multiline value={value} onChangeText={onChange} error={errors.address?.message} />
          )}
        />

        <View className="mt-2">
          <Button label="Save Changes" icon="checkmark" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
